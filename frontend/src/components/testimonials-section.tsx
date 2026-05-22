import Link from "next/link";
import Image from "next/image";
import { client } from "@/sanity/client";
import { testimonialsQuery } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface TestimonialData {
  _id: string;
  author: string;
  role: string; // Defaults to "Verified Buyer" via our schema config
  rating: number; // Integer between 1 and 5
  content: string; // The core review text quote
  avatar?: {
    _type: "image";
    asset: {
      _ref: string;
      _type: "reference";
    };
  } | null; // Optional user avatar profile photo asset
  isVerifiedPurchase: boolean;
}


import { Star, Quote, Check } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

export async function TestimonialsSection() {
  let testimonials: TestimonialData[] = [];

  try {
    testimonials = await client.fetch<TestimonialData[]>(
      testimonialsQuery,
      {},
      { next: { revalidate: 3600 } } // 1-hour ISR revalidation cache
    );
  } catch (err) {
    console.error("TestimonialsSection: Failed to fetch client feedback streams:", err);
  }

  const safeTestimonials = testimonials || [];

  // Early exit if no active testimonials exist to preserve vertical page space
  if (safeTestimonials.length === 0) {
    return null;
  }

  return (
    <section className="py-16 sm:py-24 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header Block */}
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            What Our Customers Say
          </h2>
          <p className="mt-3 text-muted-foreground">
            Join thousands of satisfied customers worldwide
          </p>
        </div>

        {/* Shadcn UI Carousel Engine */}
        <Carousel
          opts={{
            align: "start",
            loop: false,
            slidesToScroll: 1,
            breakpoints: {
              "(min-width: 768px)": {
                slidesToScroll: 2,
              },
              "(min-width: 1024px)": {
                slidesToScroll: 3,
              },
            },
          }}
          className="w-full relative pr-0 xl:pr-1 pl-0 lg:pl-1"
        >
          <CarouselContent className="-ml-4">
            {safeTestimonials.map((review) => {
              // Extract first letters of the author's name dynamically for the avatar placeholder fallback
              const initials = review.author
                .split(" ")
                .map((n) => n[0])
                .join("")
                .substring(0, 2)
                .toUpperCase();

              return (
                <CarouselItem
                  key={review._id}
                  className="pl-4 basis-full sm:basis-1/2 lg:basis-1/3"
                >
                  <div className="relative flex h-full min-h-65 flex-col justify-between rounded-3xl border bg-card p-6 shadow-sm transition-all duration-200 hover:shadow-md">
                    
                    {/* Visual Quote Accent Mark */}
                    <Quote className="absolute right-6 top-6 h-8 w-8 text-primary/5 pointer-events-none" />

                    <div>
                      {/* Interactive Star Matrix Row */}
                      <div className="mb-4 flex items-center gap-1">
                        {[...Array(5)].map((_, index) => (
                          <Star
                            key={index}
                            className={`h-4 w-4 ${
                              index < review.rating
                                ? "fill-amber-400 text-amber-400"
                                : "fill-muted text-muted"
                            }`}
                          />
                        ))}
                      </div>

                      {/* Review Block Body Quote */}
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {`"${review.content}"`}
                      </p>
                    </div>

                    {/* Author Profile Footer Block */}
                    <div className="mt-6 flex items-center justify-between border-t pt-4">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10 border">
                          {review.avatar?.asset?._ref ? (
                            <div className="relative h-full w-full">
                              <Image
                                src={urlFor(review.avatar).width(80).height(80).url()}
                                alt={`${review.author} avatar headshot`}
                                fill
                                className="object-cover"
                              />
                            </div>
                          ) : (
                            <AvatarFallback className="bg-primary/10 text-primary text-xs font-semibold">
                              {initials}
                            </AvatarFallback>
                          )}
                        </Avatar>
                        
                        <div>
                          <p className="text-sm font-semibold tracking-tight text-foreground">
                            {review.author}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {review.role}
                          </p>
                        </div>
                      </div>

                      {/* Optional Trust Badging Checkmark block */}
                      {review.isVerifiedPurchase && (
                        <Badge variant="secondary" className="h-5 gap-1 text-[10px] px-2 font-medium bg-emerald-500/10 text-emerald-600 border-none hover:bg-emerald-500/10">
                          <Check className="h-3 w-3 stroke-3" />
                          Verified
                        </Badge>
                      )}
                    </div>

                  </div>
                </CarouselItem>
              );
            })}
          </CarouselContent>

          {/* Navigation Controls Context Arrows */}
          <CarouselPrevious className="hidden md:inline-flex" />
          <CarouselNext className="hidden md:inline-flex" />

        </Carousel>

      </div>
    </section>
  );
}