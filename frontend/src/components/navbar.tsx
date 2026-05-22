"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
import {
  Search,
  ShoppingCart,
  Heart,
  User,
  Menu,
  Laptop,
  Smartphone,
  Headphones,
  Gamepad2,
  Watch,
  ChevronDown,
} from "lucide-react"

// Sanity imports
import { client } from "@/sanity/client"
import { siteSettings_QUERY } from "@/sanity/lib/queries"
import { urlFor } from "@/sanity/lib/image"

const categories = [
  { name: "Laptops", icon: Laptop, href: "/products?category=laptops" },
  { name: "Smartphones", icon: Smartphone, href: "/products?category=smartphones" },
  { name: "Headphones", icon: Headphones, href: "/products?category=headphones" },
  { name: "Gaming", icon: Gamepad2, href: "/products?category=gaming" },
  { name: "Wearables", icon: Watch, href: "/products?category=wearables" },
]

export function Navbar() {
  const [cartCount] = useState(0)
  const [wishlistCount] = useState(0)
  
  // State for dynamic Sanity data
  const [siteName, setSiteName] = useState("SB IT Technology")
  const [siteLogo, setSiteLogo] = useState<any>(null)

  useEffect(() => {
    console.log("Navbar: Fetching site settings from Sanity...")
    client.fetch(siteSettings_QUERY)
      .then((data) => {
        console.log("Navbar: Fetched site settings:", data)
        if (data) {
          if (data.siteName) setSiteName(data.siteName)
          if (data.siteLogo) {
            setSiteLogo(data.siteLogo)
            console.log("Navbar: Logo URL resolved:", urlFor(data.siteLogo).width(100).height(100).url())
          }
        }
      })
      .catch((err) => console.error("Navbar: Failed to fetch site settings:", err))
  }, [])

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-card/95 backdrop-blur supports-backdrop-filter:bg-card/80">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-1">
          {siteLogo ? (
            <div className="relative h-9 w-9 overflow-hidden rounded-xl">
              <Image
                src={urlFor(siteLogo).width(100).height(100).url()}
                alt={siteName}
                fill
                className="object-cover"
              />
            </div>
          ) : (
            <div className="flex h-9 w-9 items-center justify-center rounded-xl">
              <span className="text-lg font-bold text-primary-foreground">
                {siteName.charAt(0)}
              </span>
            </div>
          )}
          <span className="hidden text-xl font-bold tracking-tight sm:inline-block">
            {siteName}
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-1 lg:flex">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="gap-1">
                Categories
                <ChevronDown className="h-4 w-4 opacity-50" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-48">
              {categories.map((category) => (
                <DropdownMenuItem key={category.name} asChild>
                  <Link href={category.href} className="flex items-center gap-2">
                    <category.icon className="h-4 w-4" />
                    {category.name}
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <Button variant="ghost" asChild>
            <Link href="/products">All Products</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="/deals">Deals</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="/about">About</Link>
          </Button>
        </nav>

        {/* Search Bar */}
        <div className="hidden max-w-md flex-1 px-8 md:block">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search products..."
              className="h-10 w-full rounded-xl bg-secondary pl-10 pr-4"
            />
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-1">
          {/* Mobile Search */}
          <Button variant="ghost" size="icon" className="md:hidden">
            <Search className="h-5 w-5" />
            <span className="sr-only">Search</span>
          </Button>

          {/* Wishlist */}
          <Button variant="ghost" size="icon" className="relative" asChild>
            <Link href="/wishlist">
              <Heart className="h-5 w-5" />
              {wishlistCount > 0 && (
                <Badge
                  variant="destructive"
                  className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full p-0 text-xs"
                >
                  {wishlistCount}
                </Badge>
              )}
              <span className="sr-only">Wishlist</span>
            </Link>
          </Button>

          {/* Cart */}
          <Button variant="ghost" size="icon" className="relative" asChild>
            <Link href="/cart">
              <ShoppingCart className="h-5 w-5" />
              {cartCount > 0 && (
                <Badge className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full p-0 text-xs">
                  {cartCount}
                </Badge>
              )}
              <span className="sr-only">Cart</span>
            </Link>
          </Button>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
                <span className="sr-only">Account</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem asChild>
                <Link href="/login">Sign In</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/signup">Create Account</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/orders">My Orders</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/admin">Admin Dashboard</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80">
              <nav className="flex flex-col gap-4 pt-8">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search products..."
                    className="h-10 w-full rounded-xl bg-secondary pl-10 pr-4"
                  />
                </div>
                <div className="flex flex-col gap-1 pt-4">
                  <p className="px-2 text-sm font-medium text-muted-foreground">
                    Categories
                  </p>
                  {categories.map((category) => (
                    <Link
                      key={category.name}
                      href={category.href}
                      className="flex items-center gap-3 rounded-lg px-2 py-2 text-sm hover:bg-secondary"
                    >
                      <category.icon className="h-4 w-4" />
                      {category.name}
                    </Link>
                  ))}
                </div>
                <div className="flex flex-col gap-1 border-t pt-4">
                  <Link
                    href="/products"
                    className="rounded-lg px-2 py-2 text-sm hover:bg-secondary"
                  >
                    All Products
                  </Link>
                  <Link
                    href="/deals"
                    className="rounded-lg px-2 py-2 text-sm hover:bg-secondary"
                  >
                    Deals
                  </Link>
                  <Link
                    href="/about"
                    className="rounded-lg px-2 py-2 text-sm hover:bg-secondary"
                  >
                    About
                  </Link>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
