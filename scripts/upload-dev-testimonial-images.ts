import { ObjectStorageService } from "../server/objectStorage";

async function uploadDevTestimonialImages() {
  const objectStorage = new ObjectStorageService();
  const bucketId = process.env.DEFAULT_OBJECT_STORAGE_BUCKET_ID;
  
  if (!bucketId) {
    throw new Error("DEFAULT_OBJECT_STORAGE_BUCKET_ID not set");
  }

  console.log("Uploading testimonial images from development to object storage...\n");

  const testimonials = [
    { name: "Priya Verma", local: "attached_assets/stock_images/professional_busines_21e83427.jpg" },
    { name: "Amit Kumar", local: "attached_assets/stock_images/professional_busines_03b735cf.jpg" },
    { name: "Sneha Kapoor", local: "attached_assets/stock_images/professional_busines_9c2a9400.jpg" },
    { name: "Vikram Singh", local: "attached_assets/stock_images/young_professional_s_6c8146cb.jpg" },
    { name: "Neha Agarwal", local: "attached_assets/stock_images/young_professional_s_d5c140f5.jpg" },
    { name: "Rahul Patel", local: "attached_assets/stock_images/professional_busines_2ee7751f.jpg" },
    { name: "Ananya Sharma", local: "attached_assets/stock_images/professional_busines_b44588be.jpg" },
    { name: "Rajiv Mishra", local: "attached_assets/stock_images/professional_busines_3c128897.jpg" }
  ];

  const results: Array<{ name: string; url: string }> = [];

  for (const testimonial of testimonials) {
    const filename = testimonial.local.split('/').pop();
    const storagePath = `/${bucketId}/public/testimonials/${filename}`;
    
    console.log(`Uploading: ${testimonial.name}`);
    console.log(`  From: ${testimonial.local}`);
    
    const url = await objectStorage.uploadFile(testimonial.local, storagePath);
    
    console.log(`  ✓ Success! URL: ${url}\n`);
    results.push({ name: testimonial.name, url });
  }

  console.log("\n=== SQL to Update Production ===\n");
  for (const result of results) {
    console.log(`UPDATE testimonials SET image_url = '${result.url}' WHERE name = '${result.name}';`);
  }
  
  console.log("\n✓ Upload complete! Run the SQL above on production.");
}

uploadDevTestimonialImages()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Upload failed:", error);
    process.exit(1);
  });
