"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay"

interface HeroProductData {
  name: string;
  price: number;
  slug: string;
  imageUrl: string;
  imageAlt: string;
}

interface HeroCarouselProps {
  safeProducts: HeroProductData[];
}

export function HeroCarousel({ safeProducts }: HeroCarouselProps) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [textFade, setTextFade] = useState(false);

  // Track slide change events from Embla
  const onSelect = useCallback(() => {
    if (!api) return;

    // 1. Start the exit animation: slide left and fade out
    setTextFade(true);

    setTimeout(() => {
      // 2. Mid-point: Swap the dataset text indices while hidden
      setCurrent(api.selectedScrollSnap());
      setTextFade(false);
    }, 200); // Matches transition duration
  }, [api]);

  useEffect(() => {
    if (!api) return;

    api.on("select", onSelect);
    api.on("reInit", onSelect);

    return () => {
      api.off("select", onSelect);
      api.off("reInit", onSelect);
    };
  }, [api, onSelect]);

  const activeProduct = safeProducts[current];

  return (
    <div className="relative aspect-square overflow-hidden rounded-3xl bg-linear-to-br from-primary/20 via-primary/10 to-transparent p-8 lg:aspect-4/3 transition-shadow duration-300 hover:shadow-xl group">
      {/* 1. Dynamic Text Panel (Locked in place—does not scroll, text fades in-out dynamically) */}
      <div
        className={`absolute top-6 left-6 z-20 flex flex-col gap-1.5 transition-all duration-200 ${
          textFade
            ? "opacity-10 transform -translate-x-4 blur-[2px]"
            : "opacity-100 transform translate-x-0 blur-none"
        }`}
      >
        <span className="bg-background/90 backdrop-blur-md text-foreground text-xs font-bold px-3 py-1.5 rounded-xl border border-border/40 shadow-xs tracking-wide">
          {activeProduct?.name}
        </span>
        <span className="bg-primary text-primary-foreground text-sm font-semibold px-2.5 py-0.5 w-fit rounded-xl shadow-xs">
            ₹{activeProduct?.price ? activeProduct.price.toLocaleString("en-IN") : "0"}
        </span>
      </div>

      {/* 2. Scrolling Image Canvas Frame */}
      <div className="absolute inset-0 flex items-center justify-center z-10">
        <Carousel
          setApi={setApi}
          opts={{
            align: "start",
            loop: true,
            slidesToScroll: 1,
          }}
          plugins={[
            Autoplay({
              delay: 8000, // 5000ms = 5 seconds
              stopOnInteraction: true, // Set to true if you want the autoplay to stop completely when clicked
              stopOnMouseEnter:false, // Pauses the timer when the user hovers over the card
            })
          ]}
          className="w-full h-full">

          <CarouselContent className="ml-0 h-full">
            {safeProducts.map((product, idx) => (
              <CarouselItem
                key={product.slug || idx}
                className="pl-0 basis-full h-full"
              >
                <Link
                  href={`/products/${product.slug}`}
                  className="flex items-center justify-center p-12 sm:p-16 cursor-pointer"
                >
                  <img
                    src={product.imageUrl}
                    alt={product.imageAlt || product.name}
                    className="max-h-[80%] max-w-[85%] object-contain drop-shadow-2xl transition-transform duration-500 group-hover:scale-105"
                  />
                </Link>
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* Navigation Arrows */}
          <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 z-30 opacity-0 group-hover:opacity-100 transition-opacity" />
          <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 z-30 opacity-0 group-hover:opacity-100 transition-opacity" />
        </Carousel>
      </div>

      {/* 3. Dynamic Tracking Dots (Locked in place—updates filled index) */}
      <div className="absolute bottom-6 right-6 flex items-center gap-1.5 bg-background/50 backdrop-blur-md px-2.5 py-1.5 rounded-full border border-border/20 z-20">
        {safeProducts.map((_, dotIdx) => (
          <button
            key={dotIdx}
            onClick={() => api?.scrollTo(dotIdx)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              dotIdx === current
                ? "w-4 bg-primary"
                : "w-1.5 bg-muted-foreground/30 hover:bg-muted-foreground/50"
            }`}
            aria-label={`Go to slide ${dotIdx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
