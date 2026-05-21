import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ProductCard, type Product } from "@/components/product-card"
import { ArrowRight } from "lucide-react"

const trendingProducts: Product[] = [
  {
    id: "1",
    name: "MacBook Pro 16\" M3 Max",
    description: "Apple M3 Max chip, 36GB RAM, 1TB SSD",
    price: 3499,
    originalPrice: 3999,
    rating: 4.9,
    reviewCount: 2847,
    category: "Laptops",
    badge: "Best Seller",
    inStock: true,
  },
  {
    id: "2",
    name: "iPhone 16 Pro Max 256GB",
    description: "6.9\" Super Retina XDR, A18 Pro chip",
    price: 1199,
    rating: 4.8,
    reviewCount: 5621,
    category: "Smartphones",
    badge: "New",
    inStock: true,
  },
  {
    id: "3",
    name: "Sony WH-1000XM5 Wireless",
    description: "Industry-leading noise cancellation",
    price: 349,
    originalPrice: 399,
    rating: 4.7,
    reviewCount: 8934,
    category: "Headphones",
    inStock: true,
  },
  {
    id: "4",
    name: "PlayStation 5 Slim Console",
    description: "1TB SSD, 4K Gaming, DualSense Controller",
    price: 449,
    rating: 4.8,
    reviewCount: 12453,
    category: "Gaming",
    badge: "Popular",
    inStock: true,
  },
  {
    id: "5",
    name: "Apple Watch Ultra 2",
    description: "49mm Titanium, GPS + Cellular",
    price: 799,
    rating: 4.9,
    reviewCount: 3287,
    category: "Wearables",
    inStock: true,
  },
  {
    id: "6",
    name: "Samsung Galaxy S24 Ultra",
    description: "6.8\" Dynamic AMOLED, S Pen included",
    price: 1099,
    originalPrice: 1299,
    rating: 4.7,
    reviewCount: 4521,
    category: "Smartphones",
    inStock: true,
  },
  {
    id: "7",
    name: "AirPods Pro 2nd Gen",
    description: "Active Noise Cancellation, USB-C",
    price: 249,
    rating: 4.8,
    reviewCount: 15234,
    category: "Headphones",
    badge: "Top Rated",
    inStock: true,
  },
  {
    id: "8",
    name: "ASUS ROG Zephyrus G16",
    description: "Intel Core i9, RTX 4090, 32GB RAM",
    price: 2999,
    rating: 4.6,
    reviewCount: 892,
    category: "Gaming",
    inStock: true,
  },
]

export function TrendingSection() {
  return (
    <section className="bg-secondary/30 py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Trending Products
            </h2>
            <p className="mt-2 text-muted-foreground">
              Discover what everyone is buying right now
            </p>
          </div>
          <Button variant="outline" className="gap-2 rounded-xl" asChild>
            <Link href="/products">
              View All
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {trendingProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  )
}
