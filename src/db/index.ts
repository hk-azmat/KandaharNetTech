import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from '@/db/schema';

/**
 * Local PostgreSQL database connection for Docker development
 * This file is used when running the app locally with PostgreSQL
 */
const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://kandahar_user:kandahar_password@localhost:5432/kandahar_electronics',
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

export const db = drizzle(pool, { schema });

export type Database = typeof db;
