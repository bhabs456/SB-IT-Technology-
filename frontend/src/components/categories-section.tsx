import Link from "next/link";
import * as LucideIcons from "lucide-react";
import { client } from "@/sanity/client";
import { categoriesQuery } from "@/sanity/lib/queries";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

// TypeScript definition matching your central query output shape
interface CategoryData {
  name: string;
  slug: string;
  description: string;
  icon: string;
  brandColor?: string;
}

export async function CategoriesSection() {
  let categories: CategoryData[] = [];
  try {
    categories = await client.fetch(
      categoriesQuery,
      {},
      { next: { revalidate: 3600 } }, // 1-hour ISR cache
    );
  } catch (err) {
    console.error("CategoriesSection: Failed to fetch categories:", err);
  }

  const safeCategories = categories || [];

  return (
    <section className="py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 ">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Shop by Category
          </h2>
          <p className="mt-3 text-muted-foreground">
            Find exactly what you need across our curated categories
          </p>
        </div>

        {safeCategories.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground text-sm">
            No categories available at the moment.
          </div>
        ) : (
          <Carousel
            opts={{
              align: "start",
              loop: false,
              slidesToScroll: 2,
              breakpoints: {
                "(min-width: 768px)": {
                  slidesToScroll: 4, // 💻 Tab: Moves 4 cards at a time
                },
                "(min-width: 1024px)": {
                  slidesToScroll: 5, // 💻 Desktop: Moves 5 cards at a time
                },
              },
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-4">
              {safeCategories.map((category) => {
                // Direct lookup since your DB strings match Lucide exports perfectly
                const IconComponent =
                  (LucideIcons as any)[category.icon] || LucideIcons.HelpCircle;
                const baseHexColor = category.brandColor || "#6b7280";

                const backgroundWithOpacity = `${baseHexColor}1a`;

                return (
                  <CarouselItem
                    key={category.slug}
                    className="pl-4 basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5"
                  >
                    <Link
                      href={`/products?category=${category.slug}`}
                      className="group flex h-full flex-col items-center gap-4 rounded-2xl border bg-card p-6 text-center transition-all hover:border-primary/20 hover:shadow-lg"
                    >
                      <div style={{ 
                        backgroundColor: backgroundWithOpacity, 
                        color: baseHexColor 
                      }}
                        className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl transition-transform group-hover:scale-120`}
                      >
                        <IconComponent className="h-8 w-8" />
                      </div>
                      <div className="flex flex-col justify-between">
                        <h3 className="font-semibold">{category.name}</h3>
                        <p className="mt-1 text-xs text-muted-foreground line-clamp-2">
                          {category.description}
                        </p>
                      </div>
                    </Link>
                  </CarouselItem>
                );
              })}
            </CarouselContent>

            {/* Hidden on small screens so they don't overlap your layout awkwardly */}
            <CarouselPrevious className="hidden md:inline-flex" />
            <CarouselNext className="hidden md:inline-flex" />
          </Carousel>
        )}
      </div>
    </section>
  );
}
