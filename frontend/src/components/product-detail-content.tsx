"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ProductCard, type Product } from "@/components/product-card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Star,
  Heart,
  ShoppingCart,
  Truck,
  Shield,
  RotateCcw,
  Minus,
  Plus,
  Check,
  ChevronRight,
} from "lucide-react";

// Sample product data
const products: Record<string, {
  id: string
  name: string
  description: string
  longDescription: string
  price: number
  originalPrice?: number
  rating: number
  reviewCount: number
  category: string
  badge?: string
  inStock: boolean
  specs: { label: string; value: string }[]
  features: string[]
  images: string[]
}> = {
  "1": {
    id: "1",
    name: "MacBook Pro 16\" M3 Max",
    description: "Apple M3 Max chip, 36GB RAM, 1TB SSD",
    longDescription: "The most powerful MacBook Pro ever. The M3 Max chip delivers exceptional performance for the most demanding professional workflows. With up to 36GB of unified memory, the 16-inch Liquid Retina XDR display, and all-day battery life, this is the ultimate pro notebook.",
    price: 3499,
    originalPrice: 3999,
    rating: 4.9,
    reviewCount: 2847,
    category: "Laptops",
    badge: "Best Seller",
    inStock: true,
    specs: [
      { label: "Chip", value: "Apple M3 Max" },
      { label: "Memory", value: "36GB Unified Memory" },
      { label: "Storage", value: "1TB SSD" },
      { label: "Display", value: "16.2\" Liquid Retina XDR" },
      { label: "Resolution", value: "3456 x 2234 pixels" },
      { label: "Battery", value: "Up to 22 hours" },
      { label: "Weight", value: "2.14 kg (4.7 pounds)" },
      { label: "Ports", value: "3x Thunderbolt 4, HDMI, SD slot, MagSafe 3" },
    ],
    features: [
      "M3 Max chip with 14-core CPU and 30-core GPU",
      "Liquid Retina XDR display with ProMotion",
      "1080p FaceTime HD camera",
      "Six-speaker sound system with Spatial Audio",
      "Magic Keyboard with Touch ID",
      "Force Touch trackpad",
      "802.11ax Wi-Fi 6E + Bluetooth 5.3",
    ],
    images: ["/products/macbook-1.jpg", "/products/macbook-2.jpg", "/products/macbook-3.jpg"],
  },
}

const reviews = [
  {
    id: 1,
    author: "David M.",
    rating: 5,
    date: "2 weeks ago",
    title: "Absolutely incredible machine",
    content: "This is hands down the best laptop I have ever used. The M3 Max chip handles everything I throw at it - video editing, 3D rendering, multiple VMs. Battery life is phenomenal too.",
    verified: true,
  },
  {
    id: 2,
    author: "Sarah K.",
    rating: 5,
    date: "1 month ago",
    title: "Worth every penny",
    content: "As a software developer, this machine has transformed my workflow. Compiles are lightning fast, Docker runs smooth, and I can easily have 50+ Chrome tabs open without any slowdown.",
    verified: true,
  },
  {
    id: 3,
    author: "Michael R.",
    rating: 4,
    date: "1 month ago",
    title: "Great but pricey",
    content: "The performance is outstanding and the display is gorgeous. My only complaint is the price, but you definitely get what you pay for. The speakers are also surprisingly good.",
    verified: true,
  },
]

const relatedProducts: Product[] = [
  { id: "14", name: "MacBook Air 15\" M3", description: "Apple M3 chip, 8GB RAM, 256GB SSD", price: 1299, rating: 4.8, reviewCount: 4532, category: "Laptops", badge: "New", inStock: true },
  { id: "7", name: "AirPods Pro 2nd Gen", description: "Active Noise Cancellation, USB-C", price: 249, rating: 4.8, reviewCount: 15234, category: "Headphones", badge: "Top Rated", inStock: true },
  { id: "5", name: "Apple Watch Ultra 2", description: "49mm Titanium, GPS + Cellular", price: 799, rating: 4.9, reviewCount: 3287, category: "Wearables", inStock: true },
  { id: "2", name: "iPhone 16 Pro Max 256GB", description: "6.9\" Super Retina XDR, A18 Pro chip", price: 1199, rating: 4.8, reviewCount: 5621, category: "Smartphones", badge: "New", inStock: true },
]

export default function ProductDetailContent({ productId }: { productId: string }) {
  const product = products[productId] || products["1"]
  
  const [quantity, setQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState(0)
  const [isWishlisted, setIsWishlisted] = useState(false)

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Breadcrumb */}
      <nav className="mb-8 flex items-center gap-2 text-sm text-muted-foreground">
        <Link href="/" className="hover:text-foreground">Home</Link>
        <ChevronRight className="h-4 w-4" />
        <Link href="/products" className="hover:text-foreground">Products</Link>
        <ChevronRight className="h-4 w-4" />
        <Link href={`/products?category=${product.category.toLowerCase()}`} className="hover:text-foreground">
          {product.category}
        </Link>
        <ChevronRight className="h-4 w-4" />
        <span className="text-foreground">{product.name}</span>
      </nav>

      <div className="grid gap-12 lg:grid-cols-2">
        {/* Product Images */}
        <div className="flex flex-col gap-4">
          <div className="relative aspect-square overflow-hidden rounded-3xl bg-secondary/50">
            <div className="flex h-full items-center justify-center">
              <div className="h-74 w-74 rounded-3xl">
                <Image src={product.images[0]} alt={product.name} width={500} height={500} className="object-cover rounded-xl"/>
              </div>
            </div>
            {product.badge && (
              <Badge className="absolute left-4 top-4">{product.badge}</Badge>
            )}
            {discount > 0 && (
              <Badge variant="destructive" className="absolute right-4 top-4">
                -{discount}%
              </Badge>
            )}
          </div>
          <div className="flex gap-3">
            {[0, 1, 2].map((i) => (
              <button
                key={i}
                onClick={() => setSelectedImage(i)}
                className={`aspect-square w-20 overflow-hidden rounded-xl bg-secondary/50 transition-all ${
                  selectedImage === i ? "ring-2 ring-primary ring-offset-2" : ""
                }`}
              >
                <div className="flex h-full items-center justify-center">
                  <div className="h-12 w-12 rounded-lg bg-primary/10" />
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="flex flex-col">
          <p className="text-sm text-muted-foreground">{product.category}</p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
            {product.name}
          </h1>

          {/* Rating */}
          <div className="mt-4 flex items-center gap-3">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-5 w-5 ${
                    i < Math.floor(product.rating)
                      ? "fill-amber-400 text-amber-400"
                      : "fill-muted text-muted"
                  }`}
                />
              ))}
            </div>
            <span className="font-medium">{product.rating}</span>
            <span className="text-muted-foreground">({product.reviewCount.toLocaleString()} reviews)</span>
          </div>

          {/* Price */}
          <div className="mt-6 flex items-baseline gap-3">
            <span className="text-4xl font-bold">${product.price.toLocaleString()}</span>
            {product.originalPrice && (
              <span className="text-xl text-muted-foreground line-through">
                ${product.originalPrice.toLocaleString()}
              </span>
            )}
            {discount > 0 && (
              <Badge variant="destructive">Save ${(product.originalPrice! - product.price).toLocaleString()}</Badge>
            )}
          </div>

          {/* Description */}
          <p className="mt-6 text-muted-foreground">{product.longDescription}</p>

          {/* Quantity and Add to Cart */}
          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <div className="flex items-center rounded-xl border">
              <Button
                variant="ghost"
                size="icon"
                className="rounded-r-none"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="w-12 text-center font-medium">{quantity}</span>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-l-none"
                onClick={() => setQuantity(quantity + 1)}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <Button size="lg" className="flex-1 gap-2 rounded-xl">
              <ShoppingCart className="h-5 w-5" />
              Add to Cart
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="gap-2 rounded-xl"
              onClick={() => setIsWishlisted(!isWishlisted)}
            >
              <Heart
                className={`h-5 w-5 ${isWishlisted ? "fill-red-500 text-red-500" : ""}`}
              />
              {isWishlisted ? "Wishlisted" : "Wishlist"}
            </Button>
          </div>

          <Button size="lg" variant="secondary" className="mt-3 rounded-xl">
            Buy Now
          </Button>

          {/* Delivery Info */}
          <div className="mt-8 grid gap-4 rounded-2xl border bg-secondary/30 p-6 sm:grid-cols-3">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                <Truck className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-medium">Free Shipping</p>
                <p className="text-sm text-muted-foreground">Orders over $99</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                <Shield className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-medium">1 Year Warranty</p>
                <p className="text-sm text-muted-foreground">Official guarantee</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                <RotateCcw className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-medium">30-Day Returns</p>
                <p className="text-sm text-muted-foreground">Hassle-free</p>
              </div>
            </div>
          </div>

          {/* Stock Status */}
          <div className="mt-6 flex items-center gap-2">
            {product.inStock ? (
              <>
                <Check className="h-5 w-5 text-emerald-500" />
                <span className="text-emerald-600">In Stock</span>
                <span className="text-muted-foreground">- Ships within 24 hours</span>
              </>
            ) : (
              <span className="text-destructive">Out of Stock</span>
            )}
          </div>
        </div>
      </div>

      {/* Product Details Tabs */}
      <div className="mt-16">
        <Tabs defaultValue="specs" className="w-full">
          <TabsList className="w-full justify-start rounded-xl bg-secondary/50 p-1">
            <TabsTrigger value="specs" className="rounded-lg">Specifications</TabsTrigger>
            <TabsTrigger value="features" className="rounded-lg">Features</TabsTrigger>
            <TabsTrigger value="reviews" className="rounded-lg">
              Reviews ({product.reviewCount.toLocaleString()})
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="specs" className="mt-6">
            <div className="rounded-2xl border bg-card">
              <div className="divide-y">
                {product.specs.map((spec, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between px-6 py-4"
                  >
                    <span className="text-muted-foreground">{spec.label}</span>
                    <span className="font-medium">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="features" className="mt-6">
            <div className="rounded-2xl border bg-card p-6">
              <ul className="grid gap-3 sm:grid-cols-2">
                {product.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Check className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </TabsContent>

          <TabsContent value="reviews" className="mt-6">
            <div className="flex flex-col gap-6">
              {reviews.map((review) => (
                <div key={review.id} className="rounded-2xl border bg-card p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarFallback className="bg-primary/10 text-primary">
                          {review.author.split(" ").map((n) => n[0]).join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{review.author}</span>
                          {review.verified && (
                            <Badge variant="secondary" className="text-xs">Verified Purchase</Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${
                                  i < review.rating
                                    ? "fill-amber-400 text-amber-400"
                                    : "fill-muted text-muted"
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-sm text-muted-foreground">{review.date}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <h4 className="mt-4 font-semibold">{review.title}</h4>
                  <p className="mt-2 text-muted-foreground">{review.content}</p>
                </div>
              ))}
              <Button variant="outline" className="mx-auto rounded-xl">
                Load More Reviews
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Related Products */}
      <section className="mt-16">
        <h2 className="mb-8 text-2xl font-bold">You May Also Like</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {relatedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}