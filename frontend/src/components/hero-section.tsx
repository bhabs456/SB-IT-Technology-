import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { client } from "@/sanity/client";
import { heroProductsQuery } from "@/sanity/lib/queries";
import { HeroCarousel } from "./hero-carousel";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface heroProductsQuery {
  name: string;
  price: number;
  slug: string;
  imageUrl: string;
  imageAlt: string;
}

export async function HeroSection() {
  let products: heroProductsQuery[] = [];

  try {
    products = await client.fetch(
      heroProductsQuery,
      {},
      { next: { revalidate: 3600 } }, // 1-hour ISR cache
    );
  } catch (err) {
    console.error("HeroSection: Failed to fetch featured products:", err);
  }

  const safeProducts = products || [];

  // Strict conditional check: If no live products are targeted for the hero, return null
  if (safeProducts.length === 0) {
    return null;
  }

  // Pull the primary product from the dynamic list
  const activeProduct = safeProducts[0];

  return (
    <section className="relative overflow-hidden bg-secondary/50">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Content */}
          <div className="flex flex-col gap-6 ">
            <div className="inline-flex w-fit items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
              New Arrivals 2024
            </div>
            <h1 className="text-balance text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Next-Gen Tech,{" "}
              <span className="text-primary">Delivered Today</span>
            </h1>
            <p className="max-w-lg text-pretty text-lg text-muted-foreground">
              Discover premium electronics from world-leading brands. From
              cutting-edge laptops to flagship smartphones, experience
              technology at its finest.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button size="lg" className="gap-2 rounded-xl" asChild>
                <Link href="/products">
                  Shop Now
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="rounded-xl"
                asChild
              >
                <Link href="/deals">View Deals</Link>
              </Button>
            </div>
            <div className="flex items-center gap-8 pt-4">
              <div>
                <p className="text-2xl font-bold">50K+</p>
                <p className="text-sm text-muted-foreground">Happy Customers</p>
              </div>
              <div className="h-8 w-px bg-border" />
              <div>
                <p className="text-2xl font-bold">500+</p>
                <p className="text-sm text-muted-foreground">Products</p>
              </div>
              <div className="h-8 w-px bg-border" />
              <div>
                <p className="text-2xl font-bold">24/7</p>
                <p className="text-sm text-muted-foreground">Support</p>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative">
            {safeProducts.length > 0 && (
              <HeroCarousel safeProducts={safeProducts} />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
