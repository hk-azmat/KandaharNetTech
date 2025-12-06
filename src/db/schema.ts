import { pgTable, serial, varchar, integer, boolean, text } from "drizzle-orm/pg-core";

// --------------------
// Categories Table
// --------------------
export const categories = pgTable("categories", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  description: text("description"),
  imageUrl: text("image_url"),
});

// --------------------
// Products Table
// --------------------
export const products = pgTable("products", {
  id: serial("id").primaryKey(),

  name: varchar("name", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),

  description: text("description"),
  price: integer("price").notNull(),

  categoryId: integer("category_id").references(() => categories.id),

  imageUrl: text("image_url"),
  stock: integer("stock").notNull().default(0),
  featured: boolean("featured").notNull().default(false),

  ageRange: varchar("age_range", { length: 100 }),
});
