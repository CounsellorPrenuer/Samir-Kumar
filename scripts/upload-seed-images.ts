import { ObjectStorageService } from "../server/objectStorage";
import path from "path";

interface ImageMapping {
  localPath: string;
  storagePath: string;
  description: string;
}

async function uploadSeedImages() {
  const objectStorage = new ObjectStorageService();
  const bucketId = process.env.DEFAULT_OBJECT_STORAGE_BUCKET_ID;
  
  if (!bucketId) {
    throw new Error("DEFAULT_OBJECT_STORAGE_BUCKET_ID environment variable not set");
  }

  console.log("Starting image upload to object storage...\n");

  // Testimonial images - using diverse professional and student images
  const testimonialImages: ImageMapping[] = [
    {
      localPath: "attached_assets/stock_images/student_testimonial__1ab48646.jpg",
      storagePath: `/${bucketId}/public/testimonials/profile-1.jpg`,
      description: "Testimonial Profile 1"
    },
    {
      localPath: "attached_assets/stock_images/professional_busines_54f17692.jpg",
      storagePath: `/${bucketId}/public/testimonials/profile-2.jpg`,
      description: "Testimonial Profile 2"
    },
    {
      localPath: "attached_assets/stock_images/young_professional_c_daf83086.jpg",
      storagePath: `/${bucketId}/public/testimonials/profile-3.jpg`,
      description: "Testimonial Profile 3"
    }
  ];

  // Blog images - using career-related stock images
  const blogImages: ImageMapping[] = [
    {
      localPath: "attached_assets/stock_images/professional_career__5b346d1f.jpg",
      storagePath: `/${bucketId}/public/blogs/professionals-career.jpg`,
      description: "Professional Career Blog Image"
    },
    {
      localPath: "attached_assets/stock_images/students_career_plan_6f6bae86.jpg",
      storagePath: `/${bucketId}/public/blogs/students-career.jpg`,
      description: "Students Career Blog Image"
    },
    {
      localPath: "attached_assets/stock_images/graduation_ceremony__9623174b.jpg",
      storagePath: `/${bucketId}/public/blogs/graduates-career.jpg`,
      description: "Graduates Career Blog Image"
    }
  ];

  const allImages = [...testimonialImages, ...blogImages];
  const results: { path: string; url: string }[] = [];

  for (const image of allImages) {
    try {
      console.log(`Uploading: ${image.description}`);
      console.log(`  From: ${image.localPath}`);
      console.log(`  To: ${image.storagePath}`);
      
      const url = await objectStorage.uploadFile(image.localPath, image.storagePath);
      
      console.log(`  ✓ Success! URL: ${url}\n`);
      results.push({ path: image.storagePath, url });
    } catch (error) {
      console.error(`  ✗ Failed to upload ${image.description}:`, error);
      throw error;
    }
  }

  console.log("\n=== Upload Summary ===");
  console.log("Successfully uploaded all images:");
  results.forEach(({ path, url }) => {
    console.log(`  ${path} → ${url}`);
  });
  
  console.log("\nThese URLs are now ready to use in seed-data.ts");
}

uploadSeedImages()
  .then(() => {
    console.log("\n✓ Upload complete!");
    process.exit(0);
  })
  .catch((error) => {
    console.error("\n✗ Upload failed:", error);
    process.exit(1);
  });
