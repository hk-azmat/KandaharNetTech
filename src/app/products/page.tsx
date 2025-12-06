'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import ProductCard from '@/components/ProductCard';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import { Loader2, SlidersHorizontal } from 'lucide-react';
import { products as allProducts, categories, getProductsByCategory, searchProducts, type Product } from '@/data/static-data';

function ProductsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'all');
  const [sortBy, setSortBy] = useState(searchParams.get('sort') || 'featured');
  const searchQuery = searchParams.get('search') || '';

  useEffect(() => {
    filterAndSortProducts();
  }, [selectedCategory, sortBy, searchQuery]);

  const filterAndSortProducts = () => {
    setLoading(true);
    
    let filteredProducts = [...allProducts];

    // Filter by search query
    if (searchQuery) {
      filteredProducts = searchProducts(searchQuery);
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      filteredProducts = getProductsByCategory(selectedCategory);
    }

    // Sort products
    switch (sortBy) {
      case 'price-asc':
        filteredProducts.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        filteredProducts.sort((a, b) => b.price - a.price);
        break;
      case 'name-asc':
        filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name-desc':
        filteredProducts.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'featured':
        filteredProducts.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
        break;
      default:
        // Default: featured first
        filteredProducts.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }

    setProducts(filteredProducts);
    setLoading(false);
  };

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
    updateURL({ category: value === 'all' ? null : value });
  };

  const handleSortChange = (value: string) => {
    setSortBy(value);
    updateURL({ sort: value });
  };

  const updateURL = (params: Record<string, string | null>) => {
    const newParams = new URLSearchParams(searchParams.toString());
    
    Object.entries(params).forEach(([key, value]) => {
      if (value === null) {
        newParams.delete(key);
      } else {
        newParams.set(key, value);
      }
    });

    router.push(`/products?${newParams.toString()}`, { scroll: false });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">
          {searchQuery ? `Search Results for "${searchQuery}"` : 'All Products'}
        </h1>
        <p className="text-muted-foreground">
          {loading ? 'Loading...' : `${products.length} products found`}
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-8 p-4 bg-muted/50 rounded-lg">
        <div className="flex items-center gap-2 flex-1">
          <SlidersHorizontal className="h-5 w-5 text-muted-foreground" />
          <span className="text-sm font-medium">Filters:</span>
        </div>
        
        <Select value={selectedCategory} onValueChange={handleCategoryChange}>
          <SelectTrigger className="w-full md:w-[200px] bg-background">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {categories.map((category) => (
              <SelectItem key={category.id} value={category.slug}>
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={sortBy} onValueChange={handleSortChange}>
          <SelectTrigger className="w-full md:w-[200px] bg-background">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="featured">Featured First</SelectItem>
            <SelectItem value="price-asc">Price: Low to High</SelectItem>
            <SelectItem value="price-desc">Price: High to Low</SelectItem>
            <SelectItem value="name-asc">Name: A to Z</SelectItem>
            <SelectItem value="name-desc">Name: Z to A</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Products Grid */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="space-y-4">
              <Skeleton className="aspect-square rounded-lg" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          ))}
        </div>
      ) : products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-lg text-muted-foreground mb-4">No products found</p>
          <Button onClick={() => {
            setSelectedCategory('all');
            updateURL({ category: null, search: null });
          }}>
            Clear Filters
          </Button>
        </div>
      )}
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center py-16">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </div>
    }>
      <ProductsContent />
    </Suspense>
  );
}