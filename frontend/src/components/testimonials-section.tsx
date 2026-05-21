import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import { Star, Quote } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const testimonials = [
  {
    id: 1,
    name: "Sarah Chen",
    role: "Software Engineer",
    content:
      "The best electronics shopping experience I've had online. Fast shipping, authentic products, and excellent customer service. Highly recommend!",
    rating: 5,
    avatar: "SC",
  },
  {
    id: 2,
    name: "Michael Rodriguez",
    role: "Creative Director",
    content:
      "I bought my MacBook Pro here and the whole process was seamless. Great prices compared to other stores, and the product arrived perfectly packaged.",
    rating: 4,
    avatar: "MR",
  },
  {
    id: 3,
    name: "Emily Thompson",
    role: "Photographer",
    content:
      "TechVault has become my go-to for all tech purchases. Their collection is impressive and the deals are unbeatable. Five stars all around!",
    rating: 5,
    avatar: "ET",
  },
  {
    id: 4,
    name: "Emily Thompson",
    role: "Photographer",
    content:
      "TechVault has become my go-to for all tech purchases. Their collection is impressive and the deals are unbeatable. Five stars all around!",
    rating: 5,
    avatar: "ET",
  },
  {
    id: 5,
    name: "Emily Thompson",
    role: "Photographer",
    content:
      "TechVault has become my go-to for all tech purchases. Their collection is impressive and the deals are unbeatable. Five stars all around!",
    rating: 5,
    avatar: "ET",
  },
  {
    id: 6,
    name: "Emily Thompson",
    role: "Photographer",
    content:
      "TechVault has become my go-to for all tech purchases. Their collection is impressive and the deals are unbeatable. Five stars all around!",
    rating: 5,
    avatar: "ET",
  },
];

export function TestimonialsSection() {
  return (
    <section className="py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            What Our Customers Say
          </h2>
          <p className="mt-3 text-muted-foreground">
            Join thousands of satisfied customers worldwide
          </p>
        </div>
        <Carousel
          opts={{
            align: "start",
            loop: false,
            slidesToScroll: 1,
            breakpoints: {
              "(min-width: 768px)": {
                slidesToScroll: 2, // 💻 Tab: Moves 3 cards at a time
              },
              "(min-width: 1024px)": {
                slidesToScroll: 3, // 💻 Desktop: Moves 3 cards at a time
              },
            },
          }}
          className="w-full"
        >
          {/* 1. Replaced the CSS Grid div with CarouselContent */}
          <CarouselContent className="-ml-4">
            {testimonials.map((testimonial) => (
              <CarouselItem
                // 2. Fixed the key to use testimonial details
                key={testimonial.id}
                // 3. Adjusted responsive basis weights for clean spacing
                className="pl-4 basis-full sm:basis-1/2 md:basis-1/2 lg:basis-1/3"
              >
                <div className="relative flex h-full flex-col rounded-2xl border bg-card p-6">
                  <Quote className="absolute right-6 top-6 h-8 w-8 text-primary/10" />

                  <div className="mb-4 flex items-center gap-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-4 w-4 fill-amber-400 text-amber-400"
                      />
                    ))}
                  </div>

                  <p className="flex-1 text-muted-foreground">
                    {`"${testimonial.content}"`}
                  </p>

                  <div className="mt-6 flex items-center gap-3 border-t pt-6">
                    <Avatar>
                      <AvatarFallback className="bg-primary/10 text-primary">
                        {testimonial.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                </div>
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
