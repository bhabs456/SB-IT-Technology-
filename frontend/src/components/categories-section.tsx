import Link from "next/link"
import { Laptop, Smartphone, Headphones, Gamepad2, Watch } from "lucide-react"

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
]

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
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {categories.map((category) => (
            <Link
              key={category.name}
              href={category.href}
              className="group flex flex-col items-center gap-4 rounded-2xl border bg-card p-6 text-center transition-all hover:border-primary/20 hover:shadow-lg"
            >
              <div
                className={`flex h-16 w-16 items-center justify-center rounded-2xl ${category.color} transition-transform group-hover:scale-110`}
              >
                <category.icon className="h-8 w-8" />
              </div>
              <div>
                <h3 className="font-semibold">{category.name}</h3>
                <p className="mt-1 text-xs text-muted-foreground">
                  {category.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
