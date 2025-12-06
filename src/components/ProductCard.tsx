'use client';

import Image from 'next/image';
import Link from 'next/link';
import { MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface ProductCardProps {
  product: {
    id: number;
    name: string;
    slug: string;
    price: number;
    imageUrl: string | null;
    ageRange: string | null;
    stock: number;
    featured: number | boolean;
  };
}

export default function ProductCard({ product }: ProductCardProps) {
  const handleWhatsAppOrder = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    const phoneNumber = '+93708927241'; // Replace with your WhatsApp number
    const message = `Hi, I'm interested in ordering:\n\n${product.name}\nPrice: $${product.price.toFixed(2)}\n\nPlease provide more details.`;
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    
    window.open(whatsappUrl, '_blank');
  };

  const isOutOfStock = product.stock <= 0;
  const isFeatured = product.featured === 1 || product.featured === true;

 return (
  <Link href={`/products/${product.slug}`}>
      <Card className="group h-full overflow-hidden transition-all hover:shadow-lg">
        <div className="relative aspect-square overflow-hidden bg-muted">
          <Image
            src={product.imageUrl || '/placeholder.png'}
            alt={product.alt || product.name}
            fill
            className="object-cover transition-transform group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />

          {isFeatured && (
            <Badge className="absolute top-2 left-2 bg-gradient-to-r from-yellow-500 to-orange-500">
              Featured
            </Badge>
          )}

          {isOutOfStock && (
            <Badge variant="destructive" className="absolute top-2 right-2">
              Out of Stock
            </Badge>
          )}
        </div>

        <CardContent className="p-4">
          <h3 className="font-semibold text-lg line-clamp-2 mb-2 min-h-[3.5rem]">
            {product.name}
          </h3>

          <p className="text-2xl font-bold text-primary">
            AFG{product.price.toFixed(2)}
          </p>

          {product.condition && (
            <p className="text-sm text-muted-foreground">
              <strong>Condition:</strong> {product.condition}
            </p>
          )}
        </CardContent>

        <CardFooter className="p-4 pt-0">
          <Button
            className="w-full bg-green-600 hover:bg-green-700"
            onClick={handleWhatsAppOrder}
            disabled={isOutOfStock}
          >
            <MessageCircle className="h-4 w-4 mr-2" />
            {isOutOfStock ? 'Out of Stock' : 'Order on WhatsApp'}
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );
}