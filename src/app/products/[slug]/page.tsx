'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import ProductCard from '@/components/ProductCard';
import { MessageCircle, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';
import { getProductBySlug, products as allProducts, type Product } from '@/data/static-data';

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;

  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    if (slug) loadProduct();
  }, [slug]);

  const loadProduct = () => {
    try {
      setLoading(true);
      const foundProduct = getProductBySlug(slug);

      if (!foundProduct) {
        toast.error('Product not found');
        router.push('/products');
        return;
      }

      setProduct(foundProduct);

      // Related products (same category)
      if (foundProduct.categoryId) {
        const related = allProducts
          .filter((p: Product) => p.categoryId === foundProduct.categoryId && p.id !== foundProduct.id)
          .slice(0, 4);

        setRelatedProducts(related);
      }
    } catch (error) {
      console.error('Error loading product:', error);
      toast.error('Failed to load product');
    } finally {
      setLoading(false);
    }
  };

  const handleWhatsAppOrder = () => {
    if (!product || product.stock <= 0) {
      toast.error('This product is out of stock');
      return;
    }

    const phoneNumber = '+93708927241'; // Add your real WhatsApp number
    const message = `Hi, I want to order:\n\n${product.name}\nPrice: ${product.price} $\n\nProduct Link: ${window.location.href}`;

    window.open(`https://wa.me/message/YO3U5YRUUMMPI1?text=${encodeURIComponent(message)}`, "_blank");
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-8">
          <Skeleton className="aspect-square rounded-lg" />
          <div className="space-y-4">
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-6 w-1/4" />
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-12 w-full" />
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <p className="text-lg text-muted-foreground mb-4">Product not found</p>
        <Link href="/products">
          <Button>Back to Products</Button>
        </Link>
      </div>
    );
  }

  const images = product.images?.length ? product.images : [product.imageUrl];
  const isOutOfStock = product.stock <= 0;

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back Button */}
      <Button variant="ghost" className="mb-6" onClick={() => router.back()}>
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back
      </Button>

      {/* Product Details */}
      <div className="grid md:grid-cols-2 gap-8 mb-16">
        {/* Images */}
        <div className="space-y-4">
          <div className="relative aspect-square rounded-lg overflow-hidden bg-muted">
            <Image
              src={images[selectedImage] || '/placeholder.png'}
              alt={product.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />

            {product.featured && (
              <Badge className="absolute top-4 left-4 bg-yellow-600 text-white">Featured</Badge>
            )}

            {isOutOfStock && (
              <Badge variant="destructive" className="absolute top-4 right-4">Out of Stock</Badge>
            )}
          </div>

          {/* Thumbnails */}
          {images.length > 1 && (
            <div className="grid grid-cols-4 gap-2">
              {images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                    selectedImage === index
                      ? 'border-primary'
                      : 'border-transparent hover:border-muted-foreground'
                  }`}
                >
                  <Image
                    src={image}
                    alt="thumbnail"
                    fill
                    className="object-cover"
                    sizes="25vw"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Info */}
        <div className="space-y-6">
          <h1 className="text-3xl md:text-4xl font-bold">{product.name}</h1>

          <div className="text-4xl font-bold text-primary">{product.price} AFG</div>
          <p><strong>Condition:</strong> {product.condition}</p>
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Stock Status:</p>
            {isOutOfStock ? (
              <Badge variant="destructive">Out of Stock</Badge>
            ) : product.stock < 10 ? (
              <Badge variant="secondary">Only {product.stock} left</Badge>
            ) : (
              <Badge variant="secondary">In Stock</Badge>
            )}
          </div>

          <div>
            <h3 className="font-semibold mb-2">Description</h3>
            <p className="text-muted-foreground leading-relaxed">
              {product.description || 'No description available.'}
            </p>
          </div>

          <Button
            size="lg"
            className="w-full bg-green-600 hover:bg-green-700"
            onClick={handleWhatsAppOrder}
            disabled={isOutOfStock}
          >
            <MessageCircle className="h-5 w-5 mr-2" />
            {isOutOfStock ? 'Out of Stock' : 'Order on WhatsApp'}
          </Button>
        </div>
      </div>

      {/* Related */}
      {relatedProducts.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold mb-6">You May Also Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}


