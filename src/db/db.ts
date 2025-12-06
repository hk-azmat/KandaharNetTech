import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "@/db/schema";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL 
    || "postgresql://kandahar_user:kandahar_password@localhost:5432/kandahar_electronics",
});

export const db = drizzle(pool, { schema });
