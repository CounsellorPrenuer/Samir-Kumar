import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

export const client = createClient({
    projectId: "8b1oyfam",
    dataset: "production",
    useCdn: true, // Use CDN for faster response, fresh content on re-publish might take a sec
    apiVersion: "2023-05-03",
});

const builder = imageUrlBuilder(client);

export function urlFor(source: any) {
    if (!source) return "";
    return builder.image(source).url();
}
