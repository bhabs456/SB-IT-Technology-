import Link from "next/link";
import {
  Laptop,
  Smartphone,
  Headphones,
  Gamepad2,
  Watch,
  Tablet,
  Speaker,
  Cpu,
} from "lucide-react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const categories = [
  {
    name: "Laptops",
    description: "MacBooks, Gaming & Ultrabooks",
    icon: Laptop,
    href: "/products?category=laptops",
    color: "bg-blue-500/10 text-blue-600",
  },
  {
    name: "Smartphones",
    description: "iPhone, Samsung & Pixel",
    icon: Smartphone,
    href: "/products?category=smartphones",
    color: "bg-emerald-500/10 text-emerald-600",
  },
  {
    name: "Headphones",
    description: "AirPods, Sony & Bose",
    icon: Headphones,
    href: "/products?category=headphones",
    color: "bg-orange-500/10 text-orange-600",
  },
  {
    name: "Gaming",
    description: "Consoles, PCs & Accessories",
    icon: Gamepad2,
    href: "/products?category=gaming",
    color: "bg-rose-500/10 text-rose-600",
  },
  {
    name: "Wearables",
    description: "Watches & Fitness Trackers",
    icon: Watch,
    href: "/products?category=wearables",
    color: "bg-indigo-500/10 text-indigo-600",
  },
  {
    name: "Tablets",
    description: "iPads & Android Tablets",
    icon: Tablet,
    href: "/products?category=tablets",
    color: "bg-purple-500/10 text-purple-600",
  },
  {
    name: "Speakers",
    description: "Bluetooth & Home Audio",
    icon: Speaker,
    href: "/products?category=speakers",
    color: "bg-amber-500/10 text-amber-600",
  },
  {
    name: "CPUs",
    description: "Intel Core & AMD Ryzen",
    icon: Cpu,
    href: "/products?category=cpus",
    color: "bg-cyan-500/10 text-cyan-600",
  },
];

export function CategoriesSection() {
  return (
    <section className="py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Shop by Category
          </h2>
          <p className="mt-3 text-muted-foreground">
            Find exactly what you need across our curated categories
          </p>
        </div>

        {/* Added standard negative margin to Carousel via components if needed, 
            or handling standard gap spacing on CarouselContent */}
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
            {categories.map((category) => (
              <CarouselItem
                key={category.name}
                className="pl-4 basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5"
              >
                <Link
                  href={category.href}
                  className="group flex h-full flex-col items-center gap-4 rounded-2xl border bg-card p-6 text-center transition-all hover:border-primary/20 hover:shadow-lg"
                >
                  <div
                    className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl ${category.color} transition-transform group-hover:scale-110`}
                  >
                    <category.icon className="h-8 w-8" />
                  </div>
                  <div className="flex flex-col justify-between">
                    <h3 className="font-semibold">{category.name}</h3>
                    <p className="mt-1 text-xs text-muted-foreground line-clamp-2">
                      {category.description}
                    </p>
                  </div>
                </Link>
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* Hidden on small screens so they don't overlap your layout awkwardly */}
          <CarouselPrevious className="hidden md:inline-flex" />
          <CarouselNext className="hidden md:inline-flex" />

        </Carousel>
      </div>
    </section>
  );
}
