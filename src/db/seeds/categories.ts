
import { categories } from '@/db/schema';

async function main() {
    const sampleCategories = [
        {
            name: 'WiFi ',
            slug: 'wifi-routers',
            description: 'High-performance wireless routers for home and office',
            imageUrl: "/public/image/ap.img.jpg",
            createdAt: new Date('2024-01-10').toISOString(),
            updatedAt: new Date('2024-01-10').toISOString(),
        },
        {
            name: 'Access Points',
            slug: 'access-points',
            description: 'Enterprise and home wireless access points',
            imageUrl: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=800&q=80',
            createdAt: new Date('2024-01-11').toISOString(),
            updatedAt: new Date('2024-01-11').toISOString(),
        },
        {
            name: 'Network Switches',
            slug: 'network-switches',
            description: 'Managed and unmanaged network switches',
            imageUrl: 'https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=800&q=80',
            createdAt: new Date('2024-01-12').toISOString(),
            updatedAt: new Date('2024-01-12').toISOString(),
        },
        {
            name: 'Modems',
            slug: 'modems',
            description: 'Cable and DSL modems for internet connectivity',
            imageUrl: 'https://images.unsplash.com/photo-1606904825846-647eb07f5be2?w=800&q=80',
            createdAt: new Date('2024-01-13').toISOString(),
            updatedAt: new Date('2024-01-13').toISOString(),
        },
        {
            name: 'Range Extenders',
            slug: 'range-extenders',
            description: 'WiFi signal boosters and repeaters',
            imageUrl: 'https://images.unsplash.com/photo-1593510987459-7f47e04d3a33?w=800&q=80',
            createdAt: new Date('2024-01-14').toISOString(),
            updatedAt: new Date('2024-01-14').toISOString(),
        },
        {
            name: 'Network Cables',
            slug: 'network-cables',
            description: 'Ethernet cables, patch cables, and accessories',
            imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
            createdAt: new Date('2024-01-15').toISOString(),
            updatedAt: new Date('2024-01-15').toISOString(),
        },
        {
            name: 'Network Adapters',
            slug: 'network-adapters',
            description: 'USB WiFi adapters and ethernet adapters',
            imageUrl: 'https://images.unsplash.com/photo-1625948515291-69613efd103f?w=800&q=80',
            createdAt: new Date('2024-01-16').toISOString(),
            updatedAt: new Date('2024-01-16').toISOString(),
        },
        {
            name: 'Powerline Adapters',
            slug: 'powerline-adapters',
            description: 'Ethernet over power line networking',
            imageUrl: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=800&q=80',
            createdAt: new Date('2024-01-17').toISOString(),
            updatedAt: new Date('2024-01-17').toISOString(),
        },
    ];


    
    console.log('✅ Categories seeder completed successfully');
}

main().catch((error) => {
    console.error('❌ Seeder failed:', error);
});