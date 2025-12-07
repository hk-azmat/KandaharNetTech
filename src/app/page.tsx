import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import ProductCard from '@/components/ProductCard';
import WhatsAppButton from '@/components/WhatsAppButton';
import { ArrowRight, Sparkles, Shield, Truck, MessageCircle } from 'lucide-react';
import { getFeaturedProducts, categories } from '@/data/static-data';

export default function Home() {
  const featuredProducts = getFeaturedProducts(8);

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-blue-950 dark:via-purple-950 dark:to-pink-950">
        <div className="container mx-auto px-4 py-20 md:py-32">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <Badge className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                <Sparkles className="h-3 w-3 mr-1" />
                 Welcome to KandaharNetTech Network Store
              </Badge>
               <Badge className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                <Sparkles className="h-3 w-3 mr-1" />
                کندهار نټ ټیک  شبکې پلورنځي ته ښه راغلاست
              </Badge>
               <Badge className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                <Sparkles className="h-3 w-3 mr-1" />
               به فروشگاه شبکه کندهار نت تک خوش آمدید
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                Your Trusted Source for
                <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Networking Equipment
                </span>
              </h1>
                 <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                منبع قابل اعتماد شما برای
                <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  تجهیزات شبکه 
                </span>
              </h1>
                 <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                    ستاسې د باور سرچینې د    
                <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  شبکې وسایل
                </span>
              </h1>
              <p className="text-lg text-muted-foreground">
                Premium WiFi routers, access points, switches, and networking accessories. 
                Fast, reliable connectivity solutions for home and business. 
                Order directly via WhatsApp for quick service.
              </p>
               <p className="text-lg text-muted-foreground">
                 لوړ کیفیت لرونکي Wi-Fi راوټرونه، اېکسس پواینټونه، سویچونه او د شبکې نور وسایل.
                 د کور او کاروبار لپاره ګړندي او باوري د نښلېدنې حللارې.
                 د چټک خدمت لپاره په مستقیم ډول د واټس اپ له لارې فرمایش وکړئ.
              </p>
               <p className="text-lg text-muted-foreground">
               تجهیزات باکیفیت شبکه؛ روتر، اکسس‌پوینت و سوئیچ.
               راه‌حل‌های سریع و قابل اعتماد برای خانه و کسب‌وکار.

سفارش آسان از طریق واتس‌اپ.               
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/products">
                  <Button size="lg" className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                    Shop Now
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <WhatsAppButton
                  message="Hi, I would like to inquire about your networking products."
                  text="Order on WhatsApp"
                  size="lg"
                  className="w-full sm:w-auto"
                />
              </div>
            </div>
            {/* Right side (Image with animation) */}
      <div className="relative h-[400px] md:h-[500px] perspective-1000">
    <div className="absolute inset-0 hero-anim">
      <Image 
        src="/images/llp.png"
        alt="Networking equipment and routers"
        fill
        className="object-contain"
        priority

              />
            </div>
      </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-12 border-y bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-center space-x-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900">
                <Shield className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h3 className="font-semibold">Certified Products</h3>
                <p className="text-sm text-muted-foreground">All equipment meets industry standards</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100 dark:bg-green-900">
                <MessageCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <h3 className="font-semibold">WhatsApp Ordering</h3>
                <p className="text-sm text-muted-foreground">Order directly via WhatsApp chat</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-100 dark:bg-purple-900">
                <Truck className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <h3 className="font-semibold">Fast Delivery</h3>
                <p className="text-sm text-muted-foreground">Quick shipping to your location</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Shop by Category</h2>
            <p className="text-lg text-muted-foreground">
              Find the perfect networking solution for your needs
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {categories.map((category) => (
              <Link 
                key={category.id} 
                href={`/products?category=${category.slug}`}
                className="group"
              >
                <div className="relative aspect-square rounded-lg overflow-hidden bg-muted transition-transform hover:scale-105">
                  <Image
                    src={category.imageUrl || '/placeholder.png'}
                    alt={category.name}
                    fill
                    className="object-cover group-hover:brightness-110 transition-all"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                    <h3 className="text-white font-semibold text-sm md:text-base">
                      {category.name}
                    </h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-2">Featured Products</h2>
              <p className="text-lg text-muted-foreground">
                Our most popular and highly-rated networking equipment
              </p>
            </div>
            <Link href="/products?featured=true">
              <Button variant="outline">
                View All
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
          {featuredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No featured products available</p>
            </div>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="rounded-2xl bg-gradient-to-r from-green-600 to-green-700 p-8 md:p-12 text-white text-center">
            <MessageCircle className="h-16 w-16 mx-auto mb-4" />
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Order?
            </h2>
            <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
              Contact us directly on WhatsApp for instant ordering, product inquiries, 
              and personalized recommendations. Fast response guaranteed!
            </p>
            <WhatsAppButton
              message="Hi, I would like to place an order for networking equipment."
              text="Chat on WhatsApp"
              size="lg"
              variant="secondary"
              className="font-semibold"
            />
          </div>
        </div>
      </section>
    </div>
  );

}



