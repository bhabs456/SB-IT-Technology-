"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Grid3X3, ShoppingCart, Heart, User } from "lucide-react"
import { Badge } from "@/components/ui/badge"

const navItems = [
  { name: "Home", icon: Home, href: "/" },
  { name: "Categories", icon: Grid3X3, href: "/products" },
  { name: "Cart", icon: ShoppingCart, href: "/cart", badge: 3 },
  { name: "Wishlist", icon: Heart, href: "/wishlist", badge: 5 },
  { name: "Account", icon: User, href: "/login" },
]

export function MobileNav() {
  const pathname = usePathname()

  // Don't show mobile nav on admin pages
  if (pathname.startsWith("/admin")) return null

  return (
    <nav className="fixed bottom-4 left-4 right-4 z-50 md:hidden">
      <div className="flex items-center justify-around rounded-2xl border bg-card/95 px-2 py-3 shadow-lg backdrop-blur supports-[backdrop-filter]:bg-card/80">
        {navItems.map((item) => {
          const isActive = pathname === item.href || 
            (item.href === "/products" && pathname.startsWith("/products"))

          return (
            <Link
              key={item.name}
              href={item.href}
              className={`relative flex flex-col items-center gap-1 px-3 py-1 ${
                isActive ? "text-primary" : "text-muted-foreground"
              }`}
            >
              <div className="relative">
                <item.icon className={`h-5 w-5 ${isActive ? "stroke-[2.5px]" : ""}`} />
                {item.badge && item.badge > 0 && (
                  <Badge 
                    className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full p-0 text-[10px]"
                  >
                    {item.badge}
                  </Badge>
                )}
              </div>
              <span className="text-[10px] font-medium">{item.name}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
