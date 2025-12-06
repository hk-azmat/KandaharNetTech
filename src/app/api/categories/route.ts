import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { categories } from '@/db/schema';
import { eq, like, asc, or } from 'drizzle-orm';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get('id');

    // Single category by ID
    if (id) {
      if (!id || isNaN(parseInt(id))) {
        return NextResponse.json(
          { error: 'Valid ID is required', code: 'INVALID_ID' },
          { status: 400 }
        );
      }

      const category = await db
        .select()
        .from(categories)
        .where(eq(categories.id, parseInt(id)))
        .limit(1);

      if (category.length === 0) {
        return NextResponse.json(
          { error: 'Category not found', code: 'NOT_FOUND' },
          { status: 404 }
        );
      }

      return NextResponse.json(category[0], { status: 200 });
    }

    // List categories with pagination and search
    const limit = Math.min(parseInt(searchParams.get('limit') ?? '10'), 100);
    const offset = parseInt(searchParams.get('offset') ?? '0');
    const search = searchParams.get('search');

    let query = db.select().from(categories);

    if (search) {
      query = query.where(
        or(
          like(categories.name, `%${search}%`),
          like(categories.slug, `%${search}%`),
          like(categories.description, `%${search}%`)
        )
      );
    }

    const results = await query
      .orderBy(asc(categories.name))
      .limit(limit)
      .offset(offset);

    return NextResponse.json(results, { status: 200 });
  } catch (error) {
    console.error('GET error:', error);
    return NextResponse.json(
      { error: 'Internal server error: ' + (error as Error).message },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, slug, description, imageUrl } = body;

    // Validate required fields
    if (!name || typeof name !== 'string' || name.trim() === '') {
      return NextResponse.json(
        { error: 'Name is required and must be a non-empty string', code: 'MISSING_NAME' },
        { status: 400 }
      );
    }

    if (!slug || typeof slug !== 'string' || slug.trim() === '') {
      return NextResponse.json(
        { error: 'Slug is required and must be a non-empty string', code: 'MISSING_SLUG' },
        { status: 400 }
      );
    }

    // Check if slug is unique
    const existingCategory = await db
      .select()
      .from(categories)
      .where(eq(categories.slug, slug.trim()))
      .limit(1);

    if (existingCategory.length > 0) {
      return NextResponse.json(
        { error: 'A category with this slug already exists', code: 'DUPLICATE_SLUG' },
        { status: 400 }
      );
    }

    // Create category
    const now = new Date().toISOString();
    const newCategory = await db
      .insert(categories)
      .values({
        name: name.trim(),
        slug: slug.trim(),
        description: description ? description.trim() : null,
        imageUrl: imageUrl ? imageUrl.trim() : null,
        createdAt: now,
        updatedAt: now,
      })
      .returning();

    return NextResponse.json(newCategory[0], { status: 201 });
  } catch (error) {
    console.error('POST error:', error);
    return NextResponse.json(
      { error: 'Internal server error: ' + (error as Error).message },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get('id');

    if (!id || isNaN(parseInt(id))) {
      return NextResponse.json(
        { error: 'Valid ID is required', code: 'INVALID_ID' },
        { status: 400 }
      );
    }

    // Check if category exists
    const existingCategory = await db
      .select()
      .from(categories)
      .where(eq(categories.id, parseInt(id)))
      .limit(1);

    if (existingCategory.length === 0) {
      return NextResponse.json(
        { error: 'Category not found', code: 'NOT_FOUND' },
        { status: 404 }
      );
    }

    const body = await request.json();
    const { name, slug, description, imageUrl } = body;

    // Validate fields if provided
    if (name !== undefined && (typeof name !== 'string' || name.trim() === '')) {
      return NextResponse.json(
        { error: 'Name must be a non-empty string', code: 'INVALID_NAME' },
        { status: 400 }
      );
    }

    if (slug !== undefined && (typeof slug !== 'string' || slug.trim() === '')) {
      return NextResponse.json(
        { error: 'Slug must be a non-empty string', code: 'INVALID_SLUG' },
        { status: 400 }
      );
    }

    // Check slug uniqueness if being updated
    if (slug && slug.trim() !== existingCategory[0].slug) {
      const duplicateSlug = await db
        .select()
        .from(categories)
        .where(eq(categories.slug, slug.trim()))
        .limit(1);

      if (duplicateSlug.length > 0) {
        return NextResponse.json(
          { error: 'A category with this slug already exists', code: 'DUPLICATE_SLUG' },
          { status: 400 }
        );
      }
    }

    // Build update object
    const updates: any = {
      updatedAt: new Date().toISOString(),
    };

    if (name !== undefined) updates.name = name.trim();
    if (slug !== undefined) updates.slug = slug.trim();
    if (description !== undefined) updates.description = description ? description.trim() : null;
    if (imageUrl !== undefined) updates.imageUrl = imageUrl ? imageUrl.trim() : null;

    const updatedCategory = await db
      .update(categories)
      .set(updates)
      .where(eq(categories.id, parseInt(id)))
      .returning();

    return NextResponse.json(updatedCategory[0], { status: 200 });
  } catch (error) {
    console.error('PUT error:', error);
    return NextResponse.json(
      { error: 'Internal server error: ' + (error as Error).message },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get('id');

    if (!id || isNaN(parseInt(id))) {
      return NextResponse.json(
        { error: 'Valid ID is required', code: 'INVALID_ID' },
        { status: 400 }
      );
    }

    // Check if category exists
    const existingCategory = await db
      .select()
      .from(categories)
      .where(eq(categories.id, parseInt(id)))
      .limit(1);

    if (existingCategory.length === 0) {
      return NextResponse.json(
        { error: 'Category not found', code: 'NOT_FOUND' },
        { status: 404 }
      );
    }

    const deleted = await db
      .delete(categories)
      .where(eq(categories.id, parseInt(id)))
      .returning();

    return NextResponse.json(
      {
        message: 'Category deleted successfully',
        category: deleted[0],
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('DELETE error:', error);
    return NextResponse.json(
      { error: 'Internal server error: ' + (error as Error).message },
      { status: 500 }
    );
  }
}