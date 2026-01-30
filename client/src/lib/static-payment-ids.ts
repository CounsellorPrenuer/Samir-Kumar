// This file maps Plan Names (from Sanity) to Razorpay Button IDs (Static)
// This ensures payment logic is secure and not editable in CMS

export const PLAN_PAYMENT_IDS: Record<string, string> = {
    "Discover": "pl_RwDuOx96VYrsyN",
    "Discovery Plus": "pl_RwDq8XpK76OhB3",
    "Achieve": "pl_RwDxvLPQP7j4rG",
    "Achieve Plus": "pl_RwDzfVkQYEdAIf",
    "Ascend": "pl_RwE1evNHrHWJDW",
    "Ascend Plus": "pl_RwE3WEILWB9WeJ"
};

export function getPaymentButtonId(planName: string): string | null {
    // Normalize string for safety (trim, etc is handled by strict key match mostly, but let's be safe)
    // We assume Sanity Editors will type "Discover" exactly. 
    // A safer way is slug, but title is fine for now.
    return PLAN_PAYMENT_IDS[planName] || null;
}
