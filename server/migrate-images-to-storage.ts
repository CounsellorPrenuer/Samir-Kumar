import { objectStorageClient } from "./objectStorage";
import * as fs from "fs";
import * as path from "path";

const BUCKET_NAME = process.env.PUBLIC_OBJECT_SEARCH_PATHS?.split(",")[0]?.split("/")[1] || "";
const BUCKET_PUBLIC_DIR = "public";

async function uploadFile(localPath: string, storagePath: string): Promise<string> {
  if (!BUCKET_NAME) {
    throw new Error("No bucket name found in PUBLIC_OBJECT_SEARCH_PATHS");
  }

  const bucket = objectStorageClient.bucket(BUCKET_NAME);
  const file = bucket.file(`${BUCKET_PUBLIC_DIR}/${storagePath}`);

  await bucket.upload(localPath, {
    destination: `${BUCKET_PUBLIC_DIR}/${storagePath}`,
    metadata: {
      cacheControl: 'public, max-age=31536000',
    },
  });

  return `/public-objects/${BUCKET_PUBLIC_DIR}/${storagePath}`;
}

async function migrateImages() {
  const assetsDir = path.join(process.cwd(), "attached_assets");
  
  if (!fs.existsSync(assetsDir)) {
    console.log("No attached_assets directory found. Skipping image migration.");
    return;
  }

  console.log("Starting image migration to object storage...");
  console.log(`Bucket: ${BUCKET_NAME}`);

  // Upload blog images
  const blogImages = [
    { local: "attached_assets/stock_images/career_counseling_se_385e11cf.jpg", storage: "blogs/students-career.jpg" },
    { local: "attached_assets/stock_images/graduation_ceremony__ee76af65.jpg", storage: "blogs/graduates-career.jpg" },
    { local: "attached_assets/stock_images/business_professiona_bd849125.jpg", storage: "blogs/professionals-career.jpg" },
  ];

  // Upload testimonial images (profile photos)
  const testimonialImages = [
    { local: "attached_assets/stock_images/man_full_body_fillin_7357c4e7.jpg", storage: "testimonials/profile-1.jpg" },
    { local: "attached_assets/stock_images/man_full_body_fillin_c89bdc8a.jpg", storage: "testimonials/profile-2.jpg" },
    { local: "attached_assets/stock_images/man_full_body_fillin_14e30bb5.jpg", storage: "testimonials/profile-3.jpg" },
  ];

  const allImages = [...blogImages, ...testimonialImages];

  for (const img of allImages) {
    try {
      if (fs.existsSync(img.local)) {
        const url = await uploadFile(img.local, img.storage);
        console.log(`✓ Uploaded: ${img.local} -> ${url}`);
      } else {
        console.log(`✗ File not found: ${img.local}`);
      }
    } catch (error) {
      console.error(`✗ Failed to upload ${img.local}:`, error);
    }
  }

  console.log("\n✓ Image migration complete!");
  console.log("\nNext steps:");
  console.log("1. Update your seed data to use the new storage URLs");
  console.log("2. Run the 'Reset Seed Data' button in the admin dashboard");
  console.log("3. Publish your app - images will now work on the published site!");
}

export { migrateImages };

// Run migration
migrateImages().catch(console.error);
