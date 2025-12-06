import { db } from "@/db/db";
import { categories, products } from "@/db/schema";
import { categories as seedCategories, products as seedProducts } from "@/Data/static-data";

async function seed() {
  console.log("🌱 Seeding database...");

  // --- Insert Categories ---
  for (const cat of seedCategories) {
    await db.insert(categories).values({
      id: cat.id,
      name: cat.name,
      slug: cat.slug,
      description: cat.description,
      imageUrl: cat.imageUrl,
    }).onConflictDoNothing();
  }

  // --- Insert Products ---
  for (const p of seedProducts) {
    await db.insert(products).values({
      id: p.id,
      name: p.name,
      slug: p.slug,
      description: p.description,
      price: p.price,
      categoryId: p.categoryId,
      imageUrl: p.imageUrl,
      stock: p.stock,
      featured: p.featured,
      ageRange: p.ageRange,
    }).onConflictDoNothing();
  }

  console.log("✅ Seed Completed!");
}

seed()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
