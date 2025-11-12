import { ObjectStorageService } from "../server/objectStorage";

interface ImageMapping {
  localPath: string;
  storagePath: string;
  description: string;
  gender: "male" | "female";
}

async function uploadDiverseTestimonialImages() {
  const objectStorage = new ObjectStorageService();
  const bucketId = process.env.DEFAULT_OBJECT_STORAGE_BUCKET_ID;
  
  if (!bucketId) {
    throw new Error("DEFAULT_OBJECT_STORAGE_BUCKET_ID environment variable not set");
  }

  console.log("Uploading diverse testimonial images to object storage...\n");

  // Female professional photos
  const femaleImages: ImageMapping[] = [
    {
      localPath: "attached_assets/stock_images/student_testimonial__1ab48646.jpg",
      storagePath: `/${bucketId}/public/testimonials/female-1.jpg`,
      description: "Female Professional 1",
      gender: "female"
    },
    {
      localPath: "attached_assets/stock_images/student_testimonial__b6220bab.jpg",
      storagePath: `/${bucketId}/public/testimonials/female-2.jpg`,
      description: "Female Professional 2",
      gender: "female"
    },
    {
      localPath: "attached_assets/stock_images/student_testimonial__cf302700.jpg",
      storagePath: `/${bucketId}/public/testimonials/female-3.jpg`,
      description: "Female Professional 3",
      gender: "female"
    },
    {
      localPath: "attached_assets/stock_images/professional_busines_b44588be.jpg",
      storagePath: `/${bucketId}/public/testimonials/female-4.jpg`,
      description: "Female Professional 4",
      gender: "female"
    }
  ];

  // Male professional photos
  const maleImages: ImageMapping[] = [
    {
      localPath: "attached_assets/stock_images/professional_busines_54f17692.jpg",
      storagePath: `/${bucketId}/public/testimonials/male-1.jpg`,
      description: "Male Professional 1",
      gender: "male"
    },
    {
      localPath: "attached_assets/stock_images/professional_busines_03b735cf.jpg",
      storagePath: `/${bucketId}/public/testimonials/male-2.jpg`,
      description: "Male Professional 2",
      gender: "male"
    },
    {
      localPath: "attached_assets/stock_images/young_professional_c_daf83086.jpg",
      storagePath: `/${bucketId}/public/testimonials/male-3.jpg`,
      description: "Male Professional 3",
      gender: "male"
    },
    {
      localPath: "attached_assets/stock_images/professional_busines_2ee7751f.jpg",
      storagePath: `/${bucketId}/public/testimonials/male-4.jpg`,
      description: "Male Professional 4",
      gender: "male"
    }
  ];

  const allImages = [...femaleImages, ...maleImages];
  const results: { path: string; url: string; gender: string }[] = [];

  for (const image of allImages) {
    try {
      console.log(`Uploading: ${image.description} (${image.gender})`);
      console.log(`  From: ${image.localPath}`);
      console.log(`  To: ${image.storagePath}`);
      
      const url = await objectStorage.uploadFile(image.localPath, image.storagePath);
      
      console.log(`  ✓ Success! URL: ${url}\n`);
      results.push({ path: image.storagePath, url, gender: image.gender });
    } catch (error) {
      console.error(`  ✗ Failed to upload ${image.description}:`, error);
      throw error;
    }
  }

  console.log("\n=== Upload Summary ===");
  console.log("\nFemale Photos:");
  results.filter(r => r.gender === "female").forEach(({ url }) => {
    console.log(`  ${url}`);
  });
  
  console.log("\nMale Photos:");
  results.filter(r => r.gender === "male").forEach(({ url }) => {
    console.log(`  ${url}`);
  });
  
  console.log("\nReady to update seed-data.ts with gender-appropriate images!");
}

uploadDiverseTestimonialImages()
  .then(() => {
    console.log("\n✓ Upload complete!");
    process.exit(0);
  })
  .catch((error) => {
    console.error("\n✗ Upload failed:", error);
    process.exit(1);
  });
