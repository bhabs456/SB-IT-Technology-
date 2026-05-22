"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ProductCard, type Product } from "@/components/product-card"
import { Clock, Zap } from "lucide-react"

const flashSaleProducts: Product[] = [
  {
    id: "fs-1",
    name: "Bose QuietComfort 45",
    description: "Premium noise cancelling headphones",
    price: 229,
    originalPrice: 329,
    rating: 4.6,
    reviewCount: 6234,
    category: "Headphones",
    inStock: true,
  },
  {
    id: "fs-2",
    name: "Nintendo Switch OLED",
    description: "7\" OLED Screen, 64GB Storage",
    price: 299,
    originalPrice: 349,
    rating: 4.8,
    reviewCount: 9821,
    category: "Gaming",
    inStock: true,
  },
  {
    id: "fs-3",
    name: "iPad Air 11\" M2",
    description: "Liquid Retina Display, 256GB",
    price: 599,
    originalPrice: 749,
    rating: 4.9,
    reviewCount: 4532,
    category: "Tablets",
    inStock: true,
  },
  {
    id: "fs-4",
    name: "Google Pixel Watch 2",
    description: "Fitbit integration, 24hr battery",
    price: 299,
    originalPrice: 349,
    rating: 4.5,
    reviewCount: 2187,
    category: "Wearables",
    inStock: true,
  },
]

function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState({
    hours: 12,
    minutes: 45,
    seconds: 30,
  })

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        let { hours, minutes, seconds } = prev
        
        seconds -= 1
        if (seconds < 0) {
          seconds = 59
          minutes -= 1
        }
        if (minutes < 0) {
          minutes = 59
          hours -= 1
        }
        if (hours < 0) {
          hours = 23
          minutes = 59
          seconds = 59
        }
        
        return { hours, minutes, seconds }
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="flex items-center gap-2">
      <TimeBlock value={timeLeft.hours} label="Hours" />
      <span className="text-2xl font-bold text-primary">:</span>
      <TimeBlock value={timeLeft.minutes} label="Mins" />
      <span className="text-2xl font-bold text-primary">:</span>
      <TimeBlock value={timeLeft.seconds} label="Secs" />
    </div>
  )
}

function TimeBlock({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary text-xl font-bold text-primary-foreground sm:h-16 sm:w-16 sm:text-2xl">
        {value.toString().padStart(2, "0")}
      </div>
      <span className="mt-1 text-xs text-muted-foreground">{label}</span>
    </div>
  )
}

export function FlashSaleSection() {
  return (
    <section className="py-16 sm:py-24 hidden sm:block">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-3xl bg-linear-to-r from-primary/10 via-primary/5 to-transparent p-8 sm:p-12">
          <div className="mb-8 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary">
                <Zap className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-2xl font-bold sm:text-3xl">Flash Sale</h2>
                  <Badge variant="destructive" className="animate-pulse">
                    Live
                  </Badge>
                </div>
                <p className="text-muted-foreground">
                  Limited time offers - up to 30% off
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Clock className="h-5 w-5 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Ends in:</span>
              <CountdownTimer />
            </div>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {flashSaleProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="mt-8 flex justify-center">
            <Button size="lg" className="gap-2 rounded-xl" asChild>
              <Link href="/deals">
                View All Deals
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
