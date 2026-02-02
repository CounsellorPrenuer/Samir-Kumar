import { createClient } from "@sanity/client";

const client = createClient({
    projectId: "0qfs08ee",
    dataset: "production",
    useCdn: false,
    apiVersion: "2023-05-03",
});

async function check() {
    console.log("🔍 Fetching Package Titles...");
    try {
        const data = await client.fetch('*[_type == "pricing"]{title}');
        console.log("📦 Packages Found:");
        data.forEach((pkg: any) => {
            console.log(`   - "${pkg.title}" -> Normalizes to: "${pkg.title.toLowerCase().replace(/\s+/g, '-')}"`);
        });
    } catch (error) {
        console.error("❌ Error:", error.message);
    }
}

check();
