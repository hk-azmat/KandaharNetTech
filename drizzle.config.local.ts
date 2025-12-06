import { defineConfig } from 'drizzle-kit';
import type { Config } from 'drizzle-kit';

/**
 * Local PostgreSQL configuration for Docker development
 * Use this config when running locally with: npm run db:push:local
 */
const dbConfig: Config = defineConfig({
  schema: './src/db/schema.ts',
  out: './drizzle',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL || 'postgresql://kandahar_user:kandahar_password@localhost:5432/kandahar_electronics',
  },
});

export default dbConfig;
