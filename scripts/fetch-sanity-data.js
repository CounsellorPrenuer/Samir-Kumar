import { createClient } from '@sanity/client';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';

// Load environment variables from .env file
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const projectId = process.env.SANITY_PROJECT_ID || '0qfs08ee'; // Fallback to provided ID
const dataset = process.env.SANITY_DATASET || 'production';
const apiVersion = '2023-05-03';

console.log(`Using Sanity Project ID: ${projectId}`);
console.log(`Using Sanity Dataset: ${dataset}`);

const client = createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn: true,
    // token: process.env.SANITY_API_TOKEN // Only needed for private datasets
});

const OUTPUT_FILE = path.join(__dirname, '../client/src/lib/prebuilt-content.json');

async function fetchData() {
    console.log('Fetching data from Sanity...');

    try {
        const query = `{
      "posts": *[_type == "post"] | order(publishedAt desc) {
        _id,
        title,
        slug,
        description,
        category,
        readTime,
        publishedAt,
        "imageUrl": mainImage.asset->url,
        body
      },
      "testimonials": *[_type == "testimonial" && isActive == true] {
        _id,
        name,
        role,
        quote,
        "imageUrl": image.asset->url,
        initial,
        gradient
      },
      "packages": *[_type == "package"] {
        _id,
        title,
        price,
        description,
        features,
        category,
        razorpayButtonId
      }
    }`;

        const data = await client.fetch(query);

        // Transform data if necessary to match frontend expectations
        // For now, we will save it raw and let the frontend adapt types

        // Ensure directory exists
        const dir = path.dirname(OUTPUT_FILE);
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }

        fs.writeFileSync(OUTPUT_FILE, JSON.stringify(data, null, 2));
        console.log(`Data successfully fetched and written to ${OUTPUT_FILE}`);

    } catch (error) {
        console.error('Error fetching data from Sanity:', error.message);
        process.exit(1);
    }
}

fetchData();
