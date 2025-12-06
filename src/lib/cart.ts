export function getSessionId(): string {
  if (typeof window === 'undefined') return '';
  
  let sessionId = localStorage.getItem('cart_session_id');
  
  if (!sessionId) {
    sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    localStorage.setItem('cart_session_id', sessionId);
  }
  
  return sessionId;
}

export async function getCartCount(): Promise<number> {
  try {
    const sessionId = getSessionId();
    if (!sessionId) return 0;
    
    const response = await fetch(`/api/cart?sessionId=${sessionId}`);
    if (!response.ok) return 0;
    
    const items = await response.json();
    return items.reduce((total: number, item: any) => total + item.quantity, 0);
  } catch (error) {
    console.error('Error fetching cart count:', error);
    return 0;
  }
}

export async function addToCart(productId: number, quantity: number = 1): Promise<boolean> {
  try {
    const sessionId = getSessionId();
    const response = await fetch('/api/cart', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sessionId, productId, quantity })
    });
    
    return response.ok;
  } catch (error) {
    console.error('Error adding to cart:', error);
    return false;
  }
}
