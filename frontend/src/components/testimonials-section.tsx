import { Star, Quote } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

const testimonials = [
  {
    id: 1,
    name: "Sarah Chen",
    role: "Software Engineer",
    content: "The best electronics shopping experience I've had online. Fast shipping, authentic products, and excellent customer service. Highly recommend!",
    rating: 5,
    avatar: "SC",
  },
  {
    id: 2,
    name: "Michael Rodriguez",
    role: "Creative Director",
    content: "I bought my MacBook Pro here and the whole process was seamless. Great prices compared to other stores, and the product arrived perfectly packaged.",
    rating: 5,
    avatar: "MR",
  },
  {
    id: 3,
    name: "Emily Thompson",
    role: "Photographer",
    content: "TechVault has become my go-to for all tech purchases. Their collection is impressive and the deals are unbeatable. Five stars all around!",
    rating: 5,
    avatar: "ET",
  },
]

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
        <div className="grid gap-8 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="relative flex flex-col rounded-2xl border bg-card p-6"
            >
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
          ))}
        </div>
      </div>
    </section>
  )
}
