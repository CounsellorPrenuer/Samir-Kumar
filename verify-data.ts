
import { createClient } from "@sanity/client";

const client = createClient({
    projectId: "0qfs08ee",
    dataset: "production",
    useCdn: false,
    apiVersion: "2023-05-03",
});

async function verify() {
    try {
        const leaders = await client.fetch(`*[_type == "leadershipProfile"]`);
        console.log(`LEADERSHIP_COUNT: ${leaders.length}`);

        const gallery = await client.fetch(`*[_type == "galleryImage"]`);
        console.log(`GALLERY_COUNT: ${gallery.length}`);
    } catch (err) {
        console.error("FETCH_ERROR", err);
    }
}

verify();
