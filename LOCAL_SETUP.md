# 🐳 Local Development Setup with PostgreSQL & Docker

This guide will help you run **Kandahar Electronics** on your local machine using PostgreSQL with Docker instead of the cloud-based Turso database.

---

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- ✅ **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- ✅ **npm** or **bun** - Comes with Node.js
- ✅ **Docker Desktop** - [Download](https://www.docker.com/products/docker-desktop/)
- ✅ **Git** (optional) - For cloning the repository

---

## 🚀 Step-by-Step Setup

### 1️⃣ Download the Project

If you're working in the cloud environment, you'll need to download all project files to your local computer.

**Create a new folder on your computer:**
```bash
mkdir kandahar-electronics-local
cd kandahar-electronics-local
```

**Copy all project files** from the cloud environment to this folder.

---

### 2️⃣ Install Dependencies

Open a terminal in the project folder and run:

```bash
# Using npm
npm install

# OR using bun (faster)
bun install
```

**Install PostgreSQL driver:**
```bash
# Using npm
npm install pg

# OR using bun
bun add pg
```

---

### 3️⃣ Configure Environment Variables

**Create `.env.local` file** in the project root:

```bash
# Copy the example file
cp .env.local.example .env.local
```

**Edit `.env.local`** with your preferred text editor:

```env
# Local PostgreSQL Database Configuration
DATABASE_URL=postgresql://kandahar_user:kandahar_password@localhost:5432/kandahar_electronics

# Next.js Configuration
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

> **Note:** You can change the username, password, and database name if needed, but make sure they match in both `.env.local` and `docker-compose.yml`.

---

### 4️⃣ Start Docker PostgreSQL

**Open Docker Desktop** and ensure it's running.

**Start PostgreSQL container:**

```bash
docker-compose up -d
```

**Verify it's running:**

```bash
docker ps
```

You should see `kandahar-electronics-db` container running.

**Check logs (optional):**

```bash
docker-compose logs -f postgres
```

Press `Ctrl+C` to exit logs.

---

### 5️⃣ Update Database Connection

You have two options:

#### **Option A: Use Separate File (Recommended)**

1. **Update `package.json`** to add local database scripts:

```json
{
  "scripts": {
    "dev": "next dev --turbopack",
    "dev:local": "NODE_ENV=development next dev --turbopack",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "db:push": "drizzle-kit push",
    "db:push:local": "drizzle-kit push --config=drizzle.config.local.ts",
    "db:studio": "drizzle-kit studio",
    "db:studio:local": "drizzle-kit studio --config=drizzle.config.local.ts"
  }
}
```

2. **Replace database import in API routes:**

When developing locally, update your API route files to use the local database:

```typescript
// Change this:
import { db } from '@/db';

// To this (for local development):
import { db } from '@/db/index.local';
```

#### **Option B: Replace Main Files**

Alternatively, you can replace the main files:

1. **Backup original files:**
```bash
mv src/db/index.ts src/db/index.turso.ts
mv drizzle.config.ts drizzle.config.turso.ts
```

2. **Use local configs as main:**
```bash
cp src/db/index.local.ts src/db/index.ts
cp drizzle.config.local.ts drizzle.config.ts
```

---

### 6️⃣ Push Database Schema

**Push the schema to PostgreSQL:**

```bash
# If using Option A (separate file)
npm run db:push:local

# If using Option B (replaced main files)
npm run db:push
```

You should see output confirming the schema was pushed successfully.

---

### 7️⃣ Seed the Database

**Run the seeder script:**

```bash
# Using bun (recommended)
bun src/db/seeds/seed.ts

# OR using tsx
npx tsx src/db/seeds/seed.ts

# OR using ts-node
npx ts-node src/db/seeds/seed.ts
```

> **Note:** You may need to install `tsx` or `ts-node` if you don't have bun:
> ```bash
> npm install -g tsx
> ```

This will populate your database with:
- ✅ 4 product categories
- ✅ 40 networking products
- ✅ Sample product images and data

---

### 8️⃣ Start the Development Server

```bash
npm run dev

# OR using bun
bun dev
```

**Open your browser** and navigate to:
```
http://localhost:3000
```

You should see the Kandahar Electronics homepage with all products! 🎉

---

## 🛠️ Useful Commands

### Docker Commands

```bash
# Start PostgreSQL
docker-compose up -d

# Stop PostgreSQL
docker-compose down

# Stop and remove all data
docker-compose down -v

# View logs
docker-compose logs -f postgres

# Restart PostgreSQL
docker-compose restart
```

### Database Commands

```bash
# Push schema changes
npm run db:push:local

# Open Drizzle Studio (Database GUI)
npm run db:studio:local

# Access PostgreSQL CLI
docker exec -it kandahar-electronics-db psql -U kandahar_user -d kandahar_electronics
```

### Development Commands

```bash
# Start dev server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint
```

---

## 🔍 Troubleshooting

### Problem: Docker container won't start

**Solution:**
```bash
# Check if port 5432 is already in use
lsof -i :5432  # Mac/Linux
netstat -ano | findstr :5432  # Windows

# Stop the conflicting service or change the port in docker-compose.yml
```

### Problem: Can't connect to database

**Solution:**
```bash
# 1. Verify container is running
docker ps

# 2. Check container logs
docker-compose logs postgres

# 3. Verify environment variables in .env.local
cat .env.local

# 4. Test connection
docker exec -it kandahar-electronics-db psql -U kandahar_user -d kandahar_electronics -c "SELECT 1;"
```

### Problem: Seeder fails or duplicates data

**Solution:**
```bash
# Reset the database completely
docker-compose down -v
docker-compose up -d

# Wait 10 seconds for PostgreSQL to start
sleep 10

# Push schema again
npm run db:push:local

# Run seeder again
bun src/db/seeds/seed.ts
```

### Problem: Old Turso data still showing

**Solution:**
- Make sure you're using `.env.local` (not `.env`)
- Verify you updated the database import in API routes
- Clear browser cache and restart dev server

---

## 📊 Database Management

### Drizzle Studio (Recommended)

**Open visual database editor:**

```bash
npm run db:studio:local
```

Navigate to `https://local.drizzle.studio` to view and edit data visually.

### PostgreSQL CLI

**Access database directly:**

```bash
docker exec -it kandahar-electronics-db psql -U kandahar_user -d kandahar_electronics
```

**Useful SQL commands:**
```sql
-- List all tables
\dt

-- View products
SELECT id, name, price FROM products LIMIT 10;

-- View categories
SELECT * FROM categories;

-- Exit
\q
```

---

## 🔄 Switching Between Turso (Cloud) and PostgreSQL (Local)

### Use Cloud Turso (Original Setup)

1. Keep `.env` file with Turso credentials
2. Use original `src/db/index.ts` and `drizzle.config.ts`
3. Deploy to Vercel or production

### Use Local PostgreSQL

1. Use `.env.local` file
2. Use `src/db/index.local.ts` and `drizzle.config.local.ts`
3. Run Docker container locally
4. Great for development and testing

---

## 📦 Production Deployment

**Important:** This PostgreSQL setup is for **local development only**.

For production:
- ✅ Keep using Turso (cloud database)
- ✅ Use original `.env` file with Turso credentials
- ✅ Use original `src/db/index.ts` and `drizzle.config.ts`
- ✅ Deploy to Vercel as usual

---

## 🆘 Need Help?

If you encounter issues:

1. **Check Docker Desktop** is running
2. **Verify all environment variables** in `.env.local`
3. **Check database logs:** `docker-compose logs postgres`
4. **Restart everything:**
   ```bash
   docker-compose down
   docker-compose up -d
   npm run db:push:local
   bun src/db/seeds/seed.ts
   npm run dev
   ```

---

## 📝 Summary Checklist

- [ ] Docker Desktop installed and running
- [ ] Dependencies installed (`npm install` + `npm install pg`)
- [ ] `.env.local` file created with PostgreSQL URL
- [ ] Docker container started (`docker-compose up -d`)
- [ ] Database schema pushed (`npm run db:push:local`)
- [ ] Data seeded (`bun src/db/seeds/seed.ts`)
- [ ] Dev server running (`npm run dev`)
- [ ] Website opens at `http://localhost:3000`

---

🎉 **You're all set!** Enjoy developing Kandahar Electronics locally with PostgreSQL!
