import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

export const client = createClient({
    projectId: "0qfs08ee",
    dataset: "production",
    useCdn: false, // Disabled CDN to ensure fresh content
    apiVersion: "2023-05-03",
});

const builder = imageUrlBuilder(client);

export function urlFor(source: any) {
    if (!source) return "";
    return builder.image(source).url();
}
