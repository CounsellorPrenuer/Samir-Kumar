import { storage } from "../storage";

const categoryMap: Record<string, string> = {
  "students": "8-9-students",
  "graduates": "college-graduates",
  "professionals": "working-professionals"
};

export async function migratePackageCategories() {
  console.log("Checking for legacy package categories...");
  
  try {
    const packages = await storage.getPackages();
    let migratedCount = 0;
    
    for (const pkg of packages) {
      const oldCategory = pkg.category;
      const newCategory = categoryMap[oldCategory] || oldCategory;
      
      if (oldCategory !== newCategory) {
        console.log(`Migrating package "${pkg.name}" from "${oldCategory}" to "${newCategory}"`);
        await storage.updatePackage(pkg.id, { category: newCategory as any });
        migratedCount++;
      }
    }
    
    if (migratedCount > 0) {
      console.log(`Migration completed: ${migratedCount} packages updated`);
    } else {
      console.log("No packages need migration - all categories are up to date");
    }
    
    return { success: true, migratedCount };
  } catch (error) {
    console.error("Migration failed:", error);
    return { success: false, error };
  }
}

// Run migration if this file is executed directly
if (require.main === module) {
  migratePackageCategories().then(() => process.exit(0));
}
