import Link from 'next/link';
import { ShoppingCart, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t bg-muted/50 mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

          {/* Logo */}
          <div>
            <Link href="/" className="flex items-center space-x-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 overflow-hidden">
              <img
                src="/images/ke.img.png"
                  alt="KandaharNetTech  Logo"
                  className="w-full h-full object-cover rounded-lg"
              />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              SkyNetix
            </span>
          </Link>

            <p className="text-sm text-muted-foreground">
              Your trusted source for quality Router, WiFi, Access-Point and Switches.
            </p>
            
            <p className="text-sm text-muted-foreground">
              باوري او لوړ کیفیت د شبکې وسایل
            </p>
             <p className="text-sm text-muted-foreground">
             منبع قابل اعتماد شما  تجهیزات باکیفیت  شبکه.
            </p>
          </div>

          {/* Shop */}
          <div>
            <h3 className="font-semibold mb-4">Shop</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/products" className="text-muted-foreground hover:text-foreground transition-colors">
                  All Products
                </Link>
              </li>
              <li>
                <Link href="/products?category=wifi-routers" className="text-muted-foreground hover:text-foreground transition-colors">
                  WiFi-Routers
                </Link>
              </li>
              <li>
                <Link href="/products?category=access-points" className="text-muted-foreground hover:text-foreground transition-colors">
                  Access Points
                </Link>
              </li>
              <li>
                <Link href="/products?category=network-switches" className="text-muted-foreground hover:text-foreground transition-colors">
                  Network Switches
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="font-semibold mb-4">Customer Service</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  Shipping Information
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  Returns & Exchanges
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start space-x-2">
                <MapPin className="h-4 w-4 mt-0.5 text-muted-foreground flex-shrink-0" />
                <span className="text-muted-foreground">Shahr-e-Naw, Inayat Market, Kabul-Afghanistan</span>
                <span className="text-muted-foreground">شهر نو،عنایت مارکیت ، کابل – افغانستان</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                <span className="text-muted-foreground">+93 708927241</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                <span className="text-muted-foreground">info.kandaharelectronic@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Kandahar Network Store. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );

}

