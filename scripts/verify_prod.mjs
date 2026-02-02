
const API_URL = "https://samir-kumar-backend.garyphadale.workers.dev";

async function runTests() {
    console.log("🔍 Starting Production Verification...\n");

    // TEST 1: Valid Order & Key Check
    console.log("TEST 1: Creating Valid Order (Plan: discover)...");
    try {
        const res = await fetch(`${API_URL}/create-order`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ planId: "discover" })
        });

        if (res.ok) {
            const data = await res.json();
            console.log("✅ Order Created:", data.order_id);
            console.log("   Amount:", data.amount, "(Expected: 550000 paise)");
            console.log("   Key ID:", data.key_id);

            if (data.key_id.startsWith("rzp_test")) {
                console.log("⚠️  MODE: TEST MODE (Safe for testing)");
            } else if (data.key_id.startsWith("rzp_live")) {
                console.log("🚨 MODE: LIVE MODE (Real money involved)");
            } else {
                console.log("❓ MODE: Unknown Key Format");
            }

            if (data.amount === 550000) {
                console.log("✅ Price Integrity: Valid (5500 INR)");
            } else {
                console.log("❌ Price Integrity: INVALID (Expected 550000, got " + data.amount + ")");
            }

        } else {
            console.log("❌ Failed:", await res.text());
        }
    } catch (e) { console.error("❌ Network Error:", e.message); }

    console.log("\n--------------------------------\n");

    // TEST 2: Price Tampering (Injection)
    console.log("TEST 2: Attempting Price Tampering (Sending amount: 1)...");
    try {
        const res = await fetch(`${API_URL}/create-order`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ planId: "discover", amount: 1 }) // Malicious payload
        });
        const data = await res.json();
        if (data.amount === 550000) {
            console.log("✅ Security: Server IGNORED client amount.");
        } else if (data.amount === 1) {
            console.log("🚨 SECURITY CRITICAL: Server ACCEPTED client amount!");
        }
    } catch (e) { console.error("❌ Error:", e.message); }

    console.log("\n--------------------------------\n");

    // TEST 3: Invalid Plan
    console.log("TEST 3: Invalid Plan ID (hacker-plan)...");
    try {
        const res = await fetch(`${API_URL}/create-order`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ planId: "hacker-plan" })
        });
        if (res.status === 400) {
            console.log("✅ Validation: Rejected invalid plan (400 Bad Request).");
        } else {
            console.log("❌ Validation: Unexpected validation response:", res.status);
        }
    } catch (e) { console.error("❌ Error:", e.message); }
}

runTests();
