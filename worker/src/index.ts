import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { z } from 'zod'

type Bindings = {
    DB: D1Database
    RAZORPAY_KEY_ID: string
    RAZORPAY_KEY_SECRET: string
    RAZORPAY_WEBHOOK_SECRET: string
}

const app = new Hono<{ Bindings: Bindings }>()

// Strict CORS
app.use('*', cors({
    origin: ['https://careerskope.com', 'https://claryntia.com', 'http://localhost:5173'],
    allowMethods: ['POST', 'GET', 'OPTIONS'],
    allowHeaders: ['Content-Type', 'Authorization'],
    maxAge: 600,
}))

// --- Pricing Configuration (Source of Truth) ---
const PRICING_CONFIG: Record<string, number> = {
    // Students 8-9
    "discover": 5500,
    "discovery-plus": 15000,

    // Students 10-12
    "achieve": 5999,
    "achieve-plus": 10599,

    // Graduates / Professionals (Placeholders until confirmed)
    "ascend": 1000,
    "ascend-plus": 2500,
    "pro-ascend": 1000,
    "pro-ascend-plus": 2500,

    // Customize Plans
    "resume-review": 1999,
    "mock-interview": 2499
};

// --- Helpers ---
const generateRazorpayAuth = (keyId: string, keySecret: string) => {
    return 'Basic ' + btoa(keyId + ':' + keySecret);
}

// --- Health Check ---
app.get('/health', async (c) => {
    try {
        const { results } = await c.env.DB.prepare('SELECT 1').all()
        return c.json({ status: 'ok', db: 'connected', pricing_loaded: true })
    } catch (e) {
        return c.json({ status: 'ok', db: 'disconnected', error: String(e) })
    }
})

// --- Lead Capture (Existing) ---
const leadSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email address"),
    phone: z.string().optional(),
    message: z.string().optional(),
    category: z.string().optional()
})

app.post('/submit-lead', async (c) => {
    try {
        const body = await c.req.json()
        const result = leadSchema.safeParse(body)

        if (!result.success) {
            return c.json({ success: false, errors: result.error.formErrors.fieldErrors }, 400)
        }

        const { name, email, phone, message } = result.data
        const createdAt = Math.floor(Date.now() / 1000)

        try {
            await c.env.DB.prepare(
                `INSERT INTO leads (name, email, phone, message, created_at) VALUES (?, ?, ?, ?, ?)`
            ).bind(name, email, phone || null, message || null, createdAt).run()

            return c.json({ success: true, message: "Lead captured successfully" }, 200)
        } catch (dbError) {
            console.error("DB Error:", dbError)
            return c.json({ success: false, message: "Server error saving lead" }, 500)
        }
    } catch (e) {
        return c.json({ success: false, message: "Invalid request" }, 400)
    }
})

// --- Payment: Create Order ---
const createOrderSchema = z.object({
    planId: z.string(),
    couponCode: z.string().optional(),
    customAmount: z.number().optional()
})

app.post('/create-order', async (c) => {
    // 1. Secrets Check
    if (!c.env.RAZORPAY_KEY_ID || !c.env.RAZORPAY_KEY_SECRET) {
        return c.json({ success: false, message: "Payment configuration missing on server" }, 500)
    }

    try {
        const body = await c.req.json()
        const result = createOrderSchema.safeParse(body)

        if (!result.success) {
            return c.json({ success: false, message: "Invalid input" }, 400)
        }

        const { planId, couponCode, customAmount } = result.data

        // 2. Validate Plan & Calculate Price
        // If customAmount is provided, use it (Dynamic Pricing for Customize Plans)
        // Otherwise, look up in PRICING_CONFIG (Static Pricing for standard packages)
        let basePrice = customAmount;

        if (basePrice === undefined) {
            basePrice = PRICING_CONFIG[planId]
        }

        if (basePrice === undefined) {
            console.warn(`Plan ID ${planId} not found in config and no custom amount provided.`)
            // Fallback for safety or error? 
            // Letting it fail if neither exists.
            if (!basePrice) return c.json({ success: false, message: "Invalid Plan ID or Missing Price" }, 400)
        }

        // TODO: Coupon Logic would go here (validate coupon, apply discount)
        // For now, simple implementation
        let finalAmount = basePrice;

        // Convert to paise
        const amountInPaise = finalAmount * 100;

        // 3. Create Razorpay Order
        const razorpayResponse = await fetch('https://api.razorpay.com/v1/orders', {
            method: 'POST',
            headers: {
                'Authorization': generateRazorpayAuth(c.env.RAZORPAY_KEY_ID, c.env.RAZORPAY_KEY_SECRET),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                amount: amountInPaise,
                currency: "INR",
                receipt: `receipt_${Date.now()}`,
                notes: {
                    plan_id: planId,
                    coupon_code: couponCode || ""
                }
            })
        })

        if (!razorpayResponse.ok) {
            const errorText = await razorpayResponse.text()
            console.error("Razorpay Error:", errorText)
            return c.json({ success: false, message: "Failed to create payment order" }, 502)
        }

        const orderData = await razorpayResponse.json() as any

        // 4. Store Transaction in D1
        const createdAt = Math.floor(Date.now() / 1000)
        await c.env.DB.prepare(
            `INSERT INTO transactions (order_id, plan_id, amount, currency, status, coupon_code, created_at, updated_at) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
        ).bind(
            orderData.id,
            planId,
            amountInPaise, // Storing amount in paise
            "INR",
            "created",
            couponCode || null,
            createdAt,
            createdAt
        ).run()

        // 5. Return to Client
        return c.json({
            success: true,
            order_id: orderData.id,
            amount: orderData.amount,
            currency: orderData.currency,
            key_id: c.env.RAZORPAY_KEY_ID // Frontend needs this to open checkout
        })

    } catch (e: any) {
        console.error("Create Order Error:", e)
        return c.json({ success: false, message: `Internal Server Error: ${e.message || e}` }, 500)
    }
})

// --- Razorpay Webhook ---
app.post('/razorpay-webhook', async (c) => {
    const secret = c.env.RAZORPAY_WEBHOOK_SECRET
    if (!secret) {
        return c.json({ status: "skipped", message: "No webhook secret configured" }, 200)
    }

    const signature = c.req.header('x-razorpay-signature')
    if (!signature) {
        return c.json({ success: false, message: "No signature" }, 401)
    }

    const bodyText = await c.req.text()

    // Verify Signature
    // In Cloudflare Workers, we use SubtleCrypto
    const encoder = new TextEncoder()
    const keyData = encoder.encode(secret)
    const msgData = encoder.encode(bodyText)

    const key = await crypto.subtle.importKey(
        'raw',
        keyData,
        { name: 'HMAC', hash: 'SHA-256' },
        false,
        ['verify']
    )

    const isValid = await crypto.subtle.verify(
        'HMAC',
        key,
        hexToBuffer(signature),
        msgData
    )

    if (!isValid) {
        return c.json({ success: false, message: "Invalid signature" }, 401)
    }

    // Process Event
    const event = JSON.parse(bodyText)

    if (event.event === 'payment.captured') {
        const payment = event.payload.payment.entity
        const orderId = payment.order_id
        const paymentId = payment.id

        // Update Transaction
        const updatedAt = Math.floor(Date.now() / 1000)

        await c.env.DB.prepare(
            `UPDATE transactions 
       SET status = 'paid', razorpay_payment_id = ?, razorpay_signature = ?, updated_at = ? 
       WHERE order_id = ?`
        ).bind(paymentId, signature, updatedAt, orderId).run()

        // Monitor Coupon (Future implementation: Lock coupon here)
    }

    return c.json({ success: true })
})

// Helper to convert hex string to ArrayBuffer for crypto
function hexToBuffer(hex: string) {
    const view = new Uint8Array(hex.length / 2)
    for (let i = 0; i < hex.length; i += 2) {
        view[i / 2] = parseInt(hex.substring(i, i + 2), 16)
    }
    return view.buffer
}

export default app
