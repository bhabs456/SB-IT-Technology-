// components/navbar.tsx
import Link from "next/link";
import Image from "next/image";
import * as LucideIcons from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// Sanity imports
import { client } from "@/sanity/client";
import { siteSettingsQUERY, categoriesQuery } from "@/sanity/lib/queries"; // Adjusted query path if needed
import { urlFor } from "@/sanity/lib/image";

// Define TypeScript shapes matching your database fields
interface CategoryData {
  name: string;
  slug: string;
  icon: string;
}

// Drops local cache block to 0 seconds on localhost so you see data updates instantly
const revalidateTime = process.env.NODE_ENV === "development" ? 0 : 3600;

async function getNavbarData() {
  try {
    // Fetch site configurations and category data in parallel on the server
    const [settings, categories] = await Promise.all([
      client.fetch(siteSettingsQUERY, {}, { next: { revalidate: revalidateTime } }),
      client.fetch<CategoryData[]>(categoriesQuery, {}, { next: { revalidate: revalidateTime } }),
    ]);
    return { settings, categories };
  } catch (error) {
    console.error("Navbar data pipeline failure:", error);
    return { settings: null, categories: [] };
  }
}

export async function Navbar() {
  const { settings, categories } = await getNavbarData();

  const siteName = settings?.siteName || "SB IT Technology";
  const siteLogo = settings?.siteLogo || null;

  // Static badge configurations (Ready for direct server binding hooks later)
  const cartCount = 0;
  const wishlistCount = 0;

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Logo and Brand Title Layout */}
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
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground font-bold">
              {siteName.charAt(0)}
            </div>
          )}
          <span className="hidden text-xl font-bold tracking-tight sm:inline-block pl-1">
            {siteName}
          </span>
        </Link>

        {/* Desktop Navigation Router (Using safe CSS triggers to remove client states) */}
        <nav className="hidden items-center gap-1 lg:flex">
          <div className="group relative inline-block">
            <Button variant="ghost" className="gap-1 group-hover:bg-accent group-hover:text-accent-foreground cursor-pointer">
              Categories
              <LucideIcons.ChevronDown className="h-4 w-4 opacity-50 transition-transform duration-200 group-hover:rotate-180" />
            </Button>
            
            {/* Popover list opened strictly by CSS parent group hover boundaries */}
            {/* The invisible pt-2 creates a continuous bridge so the menu doesn't close as the cursor moves down */}
            <div className="absolute left-0 top-full z-50 hidden w-52 pt-2 group-hover:block pointer-events-auto">
              <div className="rounded-md border bg-popover p-1 text-popover-foreground shadow-md">
                {categories.map((category) => {
                  // Resolve stored string token values ("Laptop") to actual Lucide component wrappers dynamically
                  const IconComponent = (LucideIcons as any)[category.icon] || LucideIcons.HelpCircle;
                  return (
                    <Link
                      key={category.slug}
                      href={`/products?category=${category.slug}`}
                      className="flex w-full items-center gap-2 rounded-sm px-2 py-1.5 text-sm transition-colors hover:bg-accent hover:text-accent-foreground cursor-pointer"
                    >
                      <IconComponent className="h-4 w-4 text-muted-foreground" />
                      <span>{category.name}</span>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>

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

        {/* Desktop Search Engine Bar */}
        <div className="hidden max-w-md flex-1 px-8 md:block">
          <form action="/products" method="GET" className="relative">
            <LucideIcons.Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="search"
              name="search"
              placeholder="Search products..."
              className="flex h-10 w-full rounded-xl border border-input bg-secondary px-3 py-2 pl-10 pr-4 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            />
          </form>
        </div>

        {/* Right Action Menu Operations panel */}
        <div className="flex items-center gap-1">
          {/* Responsive Mobile Search Endpoint Link */}
          <Button variant="ghost" size="icon" className="md:hidden" asChild>
            <Link href="/search">
              <LucideIcons.Search className="h-5 w-5" />
              <span className="sr-only">Search</span>
            </Link>
          </Button>

          {/* Wishlist Link Container */}
          <Button variant="ghost" size="icon" className="relative" asChild>
            <Link href="/wishlist">
              <LucideIcons.Heart className="h-5 w-5" />
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

          {/* Shopping Cart Link Container */}
          <Button variant="ghost" size="icon" className="relative" asChild>
            <Link href="/cart">
              <LucideIcons.ShoppingCart className="h-5 w-5" />
              {cartCount > 0 && (
                <Badge className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full p-0 text-xs">
                  {cartCount}
                </Badge>
              )}
              <span className="sr-only">Cart</span>
            </Link>
          </Button>

          {/* User Account Context Menu Drawer (Using standard CSS trigger) */}
          <div className="group relative inline-block">
            <Button variant="ghost" size="icon" className="group-hover:bg-accent group-hover:text-accent-foreground">
              <LucideIcons.User className="h-5 w-5" />
              <span className="sr-only">Account</span>
            </Button>
            <div className="absolute right-0 top-full z-50 hidden w-48 pt-2 group-hover:block">
              <div className="rounded-md border bg-popover p-1 text-popover-foreground shadow-md">
                <Link href="/login" className="flex w-full items-center rounded-sm px-2 py-1.5 text-sm transition-colors hover:bg-accent hover:text-accent-foreground">Sign In</Link>
                <Link href="/signup" className="flex w-full items-center rounded-sm px-2 py-1.5 text-sm transition-colors hover:bg-accent hover:text-accent-foreground">Create Account</Link>
                <div className="-mx-1 my-1 h-px bg-muted" />
                <Link href="/orders" className="flex w-full items-center rounded-sm px-2 py-1.5 text-sm transition-colors hover:bg-accent hover:text-accent-foreground">My Orders</Link>
                <Link href="/admin" className="flex w-full items-center rounded-sm px-2 py-1.5 text-sm transition-colors hover:bg-accent hover:text-accent-foreground">Admin Dashboard</Link>
              </div>
            </div>
          </div>

          {/* Mobile Navigation Sidebar Drawer Menu Link Trigger */}
          <Button variant="ghost" size="icon" className="lg:hidden" asChild>
            <Link href="/menu">
              <LucideIcons.Menu className="h-5 w-5" />
              <span className="sr-only">Menu</span>
            </Link>
          </Button>
        </div>

      </div>
    </header>
  );
}