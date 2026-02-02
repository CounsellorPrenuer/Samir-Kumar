import { createClient } from "@sanity/client";

const client = createClient({
    projectId: "0qfs08ee",
    dataset: "production",
    useCdn: false,
    apiVersion: "2023-05-03",
});

async function verify() {
    console.log("🔍 Verifying Sanity Connection...");
    try {
        const data = await client.fetch('*[_type == "leadershipProfile"]{name}');
        console.log("✅ Connection Successful!");
        console.log("📄 Data Found:", data.length > 0 ? "YES" : "NO (Empty)");
        if (data.length > 0) {
            console.log("👤 First Profile:", data[0].name);
        }
    } catch (error) {
        console.error("❌ Connection FAILED:", error.message);
    }
}

verify();
