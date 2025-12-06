import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { products } from '@/db/schema';
import { eq, like, and, desc, asc } from 'drizzle-orm';

// -------------------------
// Helper Functions
// -------------------------
const parseNumber = (value: string | null, fallback = null) =>
  value && !isNaN(Number(value)) ? Number(value) : fallback;

const parseImages = (images: any) =>
  images ? JSON.stringify(images) : null;

const parseImagesResponse = (images: any) => {
  try { return images ? JSON.parse(images) : null }
  catch { return null }
};

// -------------------------
// GET: List or Single Product
// -------------------------
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    // =============== Single Product =================
    const id = parseNumber(searchParams.get('id'));
    if (id !== null) {
      const product = await db.select()
        .from(products)
        .where(eq(products.id, id))
        .limit(1);

      if (!product.length) {
        return NextResponse.json({
          error: 'Product not found',
          code: 'PRODUCT_NOT_FOUND'
        }, { status: 404 });
      }

      return NextResponse.json(
        { ...product[0], images: parseImagesResponse(product[0].images) },
        { status: 200 }
      );
    }

    // =============== List Products =================
    const limit = Math.min(parseNumber(searchParams.get('limit'), 10), 100);
    const offset = parseNumber(searchParams.get('offset'), 0);
    const search = searchParams.get('search');
    const categoryId = parseNumber(searchParams.get('categoryId'));
    const featured = searchParams.get('featured');
    const sortField = searchParams.get('sort') ?? 'createdAt';
    const sortOrder = searchParams.get('order') ?? 'desc';

    const conditions = [];

    if (search) conditions.push(like(products.name, `%${search}%`));
    if (categoryId !== null) conditions.push(eq(products.categoryId, categoryId));
    if (featured !== null)
      conditions.push(eq(products.featured, featured === 'true' ? 1 : 0));

    let query = db.select().from(products);

    if (conditions.length > 0)
      query = query.where(and(...conditions));

    const sortColumn =
      sortField === 'price' ? products.price :
      sortField === 'name' ? products.name :
      sortField === 'stock' ? products.stock :
      products.createdAt;

    query = sortOrder === 'asc'
      ? query.orderBy(asc(sortColumn))
      : query.orderBy(desc(sortColumn));

    const results = await query.limit(limit).offset(offset);

    return NextResponse.json(
      results.map(p => ({ ...p, images: parseImagesResponse(p.images) })),
      { status: 200 }
    );

  } catch (error: any) {
    console.error('GET error:', error);
    return NextResponse.json({ error: 'Internal server error: ' + error.message }, { status: 500 });
  }
}

// -------------------------
// POST: Create Product
// -------------------------
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, slug, description, price, categoryId, imageUrl, images, stock, featured, ageRange } = body;

    if (!name) return NextResponse.json({ error: 'Name is required', code: 'MISSING_NAME' }, { status: 400 });
    if (!slug) return NextResponse.json({ error: 'Slug is required', code: 'MISSING_SLUG' }, { status: 400 });
    if (price === undefined)
      return NextResponse.json({ error: 'Price is required', code: 'MISSING_PRICE' }, { status: 400 });

    if (typeof price !== 'number' || price < 0)
      return NextResponse.json({ error: 'Invalid price', code: 'INVALID_PRICE' }, { status: 400 });

    const exists = await db.select()
      .from(products)
      .where(eq(products.slug, slug.trim()))
      .limit(1);

    if (exists.length)
      return NextResponse.json({ error: 'Slug must be unique', code: 'DUPLICATE_SLUG' }, { status: 400 });

    const newProduct = await db.insert(products)
      .values({
        name: name.trim(),
        slug: slug.trim(),
        description: description?.trim() ?? null,
        price,
        categoryId: categoryId ? Number(categoryId) : null,
        imageUrl: imageUrl?.trim() ?? null,
        images: parseImages(images),
        stock: stock !== undefined ? Number(stock) : 0,
        featured: featured ? 1 : 0,
        ageRange: ageRange?.trim() ?? null,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      })
      .returning();

    return NextResponse.json(
      { ...newProduct[0], images: parseImagesResponse(newProduct[0].images) },
      { status: 201 }
    );

  } catch (error: any) {
    console.error('POST error:', error);
    return NextResponse.json({ error: 'Internal server error: ' + error.message }, { status: 500 });
  }
}

// -------------------------
// PUT: Update Product
// -------------------------
export async function PUT(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = parseNumber(searchParams.get('id'));

    if (id === null)
      return NextResponse.json({ error: 'Valid ID required', code: 'INVALID_ID' }, { status: 400 });

    const exists = await db.select()
      .from(products)
      .where(eq(products.id, id))
      .limit(1);

    if (!exists.length)
      return NextResponse.json({ error: 'Product not found', code: 'PRODUCT_NOT_FOUND' }, { status: 404 });

    const body = await request.json();
    const { name, slug, description, price, categoryId, imageUrl, images, stock, featured, ageRange } = body;

    if (price !== undefined && (typeof price !== 'number' || price < 0))
      return NextResponse.json({ error: 'Invalid price', code: 'INVALID_PRICE' }, { status: 400 });

    if (slug && slug !== exists[0].slug) {
      const duplicate = await db.select()
        .from(products)
        .where(eq(products.slug, slug.trim()))
        .limit(1);

      if (duplicate.length)
        return NextResponse.json({ error: 'Slug must be unique', code: 'DUPLICATE_SLUG' }, { status: 400 });
    }

    const updateData: any = {
      updatedAt: new Date().toISOString()
    };

    if (name !== undefined) updateData.name = name.trim();
    if (slug !== undefined) updateData.slug = slug.trim();
    if (description !== undefined) updateData.description = description?.trim() ?? null;
    if (price !== undefined) updateData.price = price;
    if (categoryId !== undefined) updateData.categoryId = categoryId ? Number(categoryId) : null;
    if (imageUrl !== undefined) updateData.imageUrl = imageUrl?.trim() ?? null;
    if (images !== undefined) updateData.images = parseImages(images);
    if (stock !== undefined) updateData.stock = Number(stock);
    if (featured !== undefined) updateData.featured = featured ? 1 : 0;
    if (ageRange !== undefined) updateData.ageRange = ageRange?.trim() ?? null;

    const updated = await db.update(products)
      .set(updateData)
      .where(eq(products.id, id))
      .returning();

    return NextResponse.json(
      { ...updated[0], images: parseImagesResponse(updated[0].images) },
      { status: 200 }
    );

  } catch (error: any) {
    console.error('PUT error:', error);
    return NextResponse.json({ error: 'Internal server error: ' + error.message }, { status: 500 });
  }
}

// -------------------------
// DELETE: Delete Product
// -------------------------
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = parseNumber(searchParams.get('id'));

    if (id === null)
      return NextResponse.json({ error: 'Valid ID required', code: 'INVALID_ID' }, { status: 400 });

    const exists = await db.select()
      .from(products)
      .where(eq(products.id, id))
      .limit(1);

    if (!exists.length)
      return NextResponse.json({ error: 'Product not found', code: 'PRODUCT_NOT_FOUND' }, { status: 404 });

    const deleted = await db.delete(products)
      .where(eq(products.id, id))
      .returning();

    return NextResponse.json({
      message: 'Product deleted successfully',
      product: {
        ...deleted[0],
        images: parseImagesResponse(deleted[0].images)
      }
    }, { status: 200 });

  } catch (error: any) {
    console.error('DELETE error:', error);
    return NextResponse.json({ error: 'Internal server error: ' + error.message }, { status: 500 });
  }
}
