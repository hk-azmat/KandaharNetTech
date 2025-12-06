export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { sessionId, productId, quantity = 1 } = body;

    // Validate required fields
    if (!sessionId) {
      return NextResponse.json(
        { error: 'sessionId is required', code: 'MISSING_SESSION_ID' },
        { status: 400 }
      );
    }

    if (!productId) {
      return NextResponse.json(
        { error: 'productId is required', code: 'MISSING_PRODUCT_ID' },
        { status: 400 }
      );
    }

    if (!Number.isInteger(quantity) || quantity <= 0) {
      return NextResponse.json(
        { error: 'quantity must be a positive integer', code: 'INVALID_QUANTITY' },
        { status: 400 }
      );
    }

    // Check if item already exists
    const existingItem = await db
      .select()
      .from(cartItems)
      .where(
        and(
          eq(cartItems.sessionId, sessionId),
          eq(cartItems.productId, productId)
        )
      )
      .limit(1);

    // If exists → update quantity
    if (existingItem.length > 0) {
      const updated = await db
        .update(cartItems)
        .set({ quantity: existingItem[0].quantity + quantity })
        .where(eq(cartItems.id, existingItem[0].id))
        .returning();

      return NextResponse.json(updated[0], { status: 200 });
    }

    // Otherwise create new cart item
    const inserted = await db
      .insert(cartItems)
      .values({
        sessionId,
        productId,
        quantity,
        createdAt: new Date(),
      })
      .returning();

    return NextResponse.json(inserted[0], { status: 201 });

  } catch (error: any) {
    console.error('POST error:', error);
    return NextResponse.json(
      { error: 'Internal server error: ' + error.message },
      { status: 500 }
    );
  }
}
