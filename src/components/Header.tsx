'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Search, Menu, X, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useRouter } from 'next/navigation';

export default function Header() {
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      setMobileMenuOpen(false);
    }
  };

  const handleWhatsAppContact = () => {
     const phoneNumber = '+93708927241'; // Replace with your WhatsApp number
    const message = 'Hi, I would like to inquire about your networking products.';
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const categories = [
    { name: 'WiFi-Routers', slug: 'wifi-routers' },
    { name: 'Access Points', slug: 'access-points' },
    { name: 'Network Switches', slug: 'network-switches' },
    { name: 'Router Board', slug: 'router-board' },
    { name: 'Range Extenders', slug: 'range-extenders' },
    { name: 'Gateway Network', slug: 'gateway-network' },
    { name: 'Network Adapters', slug: 'network-adapters' },
    { name: 'Point to Point', slug: 'point-to-point' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        {/* Top Bar */}
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 overflow-hidden">
              <img
                src="/images/ke.img.png"
                  alt="KandaharNetTech  Logo"
                  className="w-full h-full object-cover rounded-lg"
              />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              KandaharNetTech
            </span>
          </Link>

          {/* Desktop Search */}
          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Input
                type="text"
                placeholder="Search for networking products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pr-10"
              />
              <Button type="submit" size="icon" variant="ghost" className="absolute right-0 top-0 h-full">
                <Search className="h-4 w-4" />
              </Button>
            </div>
          </form>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <Button onClick={handleWhatsAppContact} className="bg-green-600 hover:bg-green-700">
              <MessageCircle className="h-5 w-5 mr-2" />
              Contact Us
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        {/* Desktop Categories */}
        <nav className="hidden md:flex items-center space-x-1 py-2 border-t">
          <Link href="/products">
            <Button variant="ghost" size="sm">All Products</Button>
          </Link>

          {categories.map((category) => (
            <Link key={category.slug} href={`/products?category=${category.slug}`}>
              <Button variant="ghost" size="sm">{category.name}</Button>
            </Link>
          ))}
        </nav>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 space-y-4 border-t">
            {/* Mobile Search */}
            <form onSubmit={handleSearch}>
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pr-10"
                />
                <Button type="submit" size="icon" variant="ghost" className="absolute right-0 top-0 h-full">
                  <Search className="h-4 w-4" />
                </Button>
              </div>
            </form>

            {/* Mobile WhatsApp Contact */}
            <Button onClick={handleWhatsAppContact} className="w-full bg-green-600 hover:bg-green-700">
              <MessageCircle className="h-5 w-5 mr-2" />
              Contact Us on WhatsApp
            </Button>

            {/* Mobile Categories */}
            <nav className="space-y-1">
              <Link href="/products" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="ghost" className="w-full justify-start">All Products</Button>
              </Link>

              {categories.map((category) => (
                <Link
                  key={category.slug}
                  href={`/products?category=${category.slug}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Button variant="ghost" className="w-full justify-start">{category.name}</Button>
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );

}





