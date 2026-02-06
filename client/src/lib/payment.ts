import { toast } from "@/hooks/use-toast";

const RAZORPAY_SCRIPT = "https://checkout.razorpay.com/v1/checkout.js";

declare global {
    interface Window {
        Razorpay: any;
    }
}

const loadRazorpayScript = (): Promise<boolean> => {
    return new Promise((resolve) => {
        if (window.Razorpay) {
            resolve(true);
            return;
        }
        const script = document.createElement("script");
        script.src = RAZORPAY_SCRIPT;
        script.onload = () => resolve(true);
        script.onerror = () => resolve(false);
        document.body.appendChild(script);
    });
};

export const handlePayment = async (planId: string, couponCode?: string, customAmount?: number) => {
    const isLoaded = await loadRazorpayScript();
    if (!isLoaded) {
        toast({
            variant: "destructive",
            title: "Error",
            description: "Failed to load payment gateway. Please check connection.",
        });
        return;
    }

    try {
        const baseUrl = import.meta.env.VITE_API_BASE_URL || "https://samir-kumar-backend.garyphadale.workers.dev";

        // 1. Create Order via Backend
        // Debug Log
        console.log("Creating Order:", { planId, customAmount });

        const response = await fetch(`${baseUrl}/create-order`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ planId, couponCode, customAmount: customAmount ?? 0 }),
        });

        const data = await response.json();

        if (!response.ok || !data.success) {
            throw new Error(data.message || "Failed to create order");
        }

        // 2. Open Razorpay Checkout
        const options = {
            key: data.key_id,
            amount: data.amount,
            currency: data.currency,
            name: "Samir Kumar Career Guidance",
            description: `Plan: ${planId}`,
            order_id: data.order_id,
            handler: function (response: any) {
                // Success Handler
                toast({
                    title: "Payment Successful",
                    description: `Payment ID: ${response.razorpay_payment_id}`,
                });
                // Here we could call a verification API if needed in Phase C
            },
            prefill: {
                // We could pass user details here if we had them from a context or form
            },
            theme: {
                color: "#2563EB", // Blue-600 to match theme
            },
        };

        const rzp1 = new window.Razorpay(options);
        rzp1.on("payment.failed", function (response: any) {
            toast({
                variant: "destructive",
                title: "Payment Failed",
                description: response.error.description,
            });
            // We could throw here, but the modal is already closed.
            // The promise has already resolved (we just opened the modal).
            // Ideally handlePayment resolves when the modal opens.
        });

        rzp1.open();
        return true; // Signal that payment flow started successfully

    } catch (error: any) {
        console.error("Payment Error:", error);
        toast({
            variant: "destructive",
            title: "Error",
            description: error.message || "Something went wrong initiating payment.",
        });
        return false;
    }
};
