"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { ProductCard, type Product } from "@/components/product-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Search, SlidersHorizontal, Star, X, Grid3X3, LayoutList } from "lucide-react";

const allProducts: Product[] = [
  { id: "1", name: "MacBook Pro 16\" M3 Max", description: "Apple M3 Max chip, 36GB RAM, 1TB SSD", price: 3499, originalPrice: 3999, rating: 4.9, reviewCount: 2847, category: "Laptops", badge: "Best Seller", inStock: true },
  { id: "2", name: "iPhone 16 Pro Max 256GB", description: "6.9\" Super Retina XDR, A18 Pro chip", price: 1199, rating: 4.8, reviewCount: 5621, category: "Smartphones", badge: "New", inStock: true },
  { id: "3", name: "Sony WH-1000XM5 Wireless", description: "Industry-leading noise cancellation", price: 349, originalPrice: 399, rating: 4.7, reviewCount: 8934, category: "Headphones", inStock: true },
  { id: "4", name: "PlayStation 5 Slim Console", description: "1TB SSD, 4K Gaming, DualSense Controller", price: 449, rating: 4.8, reviewCount: 12453, category: "Gaming", badge: "Popular", inStock: true },
  { id: "5", name: "Apple Watch Ultra 2", description: "49mm Titanium, GPS + Cellular", price: 799, rating: 4.9, reviewCount: 3287, category: "Wearables", inStock: true },
  { id: "6", name: "Samsung Galaxy S24 Ultra", description: "6.8\" Dynamic AMOLED, S Pen included", price: 1099, originalPrice: 1299, rating: 4.7, reviewCount: 4521, category: "Smartphones", inStock: true },
  { id: "7", name: "AirPods Pro 2nd Gen", description: "Active Noise Cancellation, USB-C", price: 249, rating: 4.8, reviewCount: 15234, category: "Headphones", badge: "Top Rated", inStock: true },
  { id: "8", name: "ASUS ROG Zephyrus G16", description: "Intel Core i9, RTX 4090, 32GB RAM", price: 2999, rating: 4.6, reviewCount: 892, category: "Gaming", inStock: true },
  { id: "9", name: "Dell XPS 15 OLED", description: "Intel Core i7, 16GB RAM, 512GB SSD", price: 1799, originalPrice: 1999, rating: 4.5, reviewCount: 1245, category: "Laptops", inStock: true },
  { id: "10", name: "Google Pixel 8 Pro", description: "6.7\" LTPO OLED, Tensor G3", price: 899, rating: 4.6, reviewCount: 3421, category: "Smartphones", inStock: true },
  { id: "11", name: "Bose QuietComfort Ultra", description: "Spatial audio, world-class ANC", price: 429, rating: 4.7, reviewCount: 2134, category: "Headphones", inStock: true },
  { id: "12", name: "Xbox Series X", description: "1TB SSD, 4K Gaming, Quick Resume", price: 499, rating: 4.7, reviewCount: 8765, category: "Gaming", inStock: true },
  { id: "13", name: "Samsung Galaxy Watch 6", description: "44mm, Wear OS, Health Tracking", price: 329, originalPrice: 379, rating: 4.5, reviewCount: 1876, category: "Wearables", inStock: true },
  { id: "14", name: "MacBook Air 15\" M3", description: "Apple M3 chip, 8GB RAM, 256GB SSD", price: 1299, rating: 4.8, reviewCount: 4532, category: "Laptops", badge: "New", inStock: true },
  { id: "15", name: "Nintendo Switch OLED", description: "7\" OLED Screen, 64GB Storage", price: 349, rating: 4.8, reviewCount: 9821, category: "Gaming", inStock: true },
  { id: "16", name: "Garmin Fenix 7X Pro", description: "Solar charging, multi-sport GPS", price: 899, rating: 4.9, reviewCount: 1234, category: "Wearables", inStock: false },
];

const categories = ["Laptops", "Smartphones", "Headphones", "Gaming", "Wearables"];
const ratings = [4, 3, 2, 1];

function FilterSidebar({
  selectedCategories,
  setSelectedCategories,
  priceRange,
  setPriceRange,
  selectedRatings,
  setSelectedRatings,
  onClearFilters,
}: {
  selectedCategories: string[];
  setSelectedCategories: (categories: string[]) => void;
  priceRange: number[];
  setPriceRange: (range: number[]) => void;
  selectedRatings: number[];
  setSelectedRatings: (ratings: number[]) => void;
  onClearFilters: () => void;
}) {
  const hasFilters = selectedCategories.length > 0 || selectedRatings.length > 0 || priceRange[0] > 0 || priceRange[1] < 5000;

  return (
    <div className="flex flex-col gap-6">
      {hasFilters && (
        <Button variant="ghost" onClick={onClearFilters} className="justify-start gap-2">
          <X className="h-4 w-4" />
          Clear all filters
        </Button>
      )}

      <Accordion type="multiple" defaultValue={["categories", "price", "ratings"]} className="w-full">
        <AccordionItem value="categories">
          <AccordionTrigger className="text-sm font-semibold">Categories</AccordionTrigger>
          <AccordionContent>
            <div className="flex flex-col gap-3">
              {categories.map((category) => (
                <div key={category} className="flex items-center gap-2">
                  <Checkbox
                    id={category}
                    checked={selectedCategories.includes(category)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setSelectedCategories([...selectedCategories, category]);
                      } else {
                        setSelectedCategories(selectedCategories.filter((c) => c !== category));
                      }
                    }}
                  />
                  <Label htmlFor={category} className="text-sm font-normal cursor-pointer">
                    {category}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="price">
          <AccordionTrigger className="text-sm font-semibold">Price Range</AccordionTrigger>
          <AccordionContent>
            <div className="flex flex-col gap-1">
              <Slider
                value={priceRange}
                onValueChange={setPriceRange}
                max={5000}
                step={50}
                className="w-full h-6"
              />
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>{priceRange[0]}</span>
                <span>{priceRange[1]}</span>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="ratings">
          <AccordionTrigger className="text-sm font-semibold">Customer Rating</AccordionTrigger>
          <AccordionContent>
            <div className="flex flex-col gap-3">
              {ratings.map((rating) => (
                <div key={rating} className="flex items-center gap-2">
                  <Checkbox
                    id={`rating-${rating}`}
                    checked={selectedRatings.includes(rating)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setSelectedRatings([...selectedRatings, rating]);
                      } else {
                        setSelectedRatings(selectedRatings.filter((r) => r !== rating));
                      }
                    }}
                  />
                  <Label htmlFor={`rating-${rating}`} className="flex cursor-pointer items-center gap-1 text-sm font-normal">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < rating ? "fill-amber-400 text-amber-400" : "fill-muted text-muted"
                        }`}
                      />
                    ))}
                    <span className="ml-1 text-muted-foreground">& up</span>
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}

export default function ProductsContent({ initialParams }: { initialParams: any }) {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category") || initialParams?.category;

  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("featured");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [selectedRatings, setSelectedRatings] = useState<number[]>([]);

  useEffect(() => {
    if (categoryParam) {
      const categorySlugMap: Record<string, string> = {
        "laptops": "Laptops",
        "smartphones": "Smartphones",
        "headphones": "Headphones",
        "gaming": "Gaming",
        "wearables": "Wearables",
      };
      const mapped = categorySlugMap[categoryParam.toLowerCase()] || 
                     (categoryParam.charAt(0).toUpperCase() + categoryParam.slice(1));
      setSelectedCategories([mapped]);
    } else {
      setSelectedCategories([]);
    }
  }, [categoryParam]);

  const clearFilters = () => {
    setSelectedCategories([]);
    setPriceRange([0, 5000]);
    setSelectedRatings([]);
    setSearch("");
  };

  const filteredProducts = allProducts.filter((product) => {
    if (search && !product.name.toLowerCase().includes(search.toLowerCase())) return false;
    if (selectedCategories.length > 0 && !selectedCategories.includes(product.category)) return false;
    if (product.price < priceRange[0] || product.price > priceRange[1]) return false;
    if (selectedRatings.length > 0 && !selectedRatings.some((r) => product.rating >= r)) return false;
    return true;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low": return a.price - b.price;
      case "price-high": return b.price - a.price;
      case "rating": return b.rating - a.rating;
      case "newest": return b.id.localeCompare(a.id);
      default: return 0;
    }
  });

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight">All Products</h1>
            <p className="mt-2 text-muted-foreground">
              Discover our collection of premium electronics
            </p>
          </div>

          <div className="flex gap-8">
            {/* Desktop Sidebar */}
            <aside className="hidden w-64 shrink-0 lg:block">
              <FilterSidebar
                selectedCategories={selectedCategories}
                setSelectedCategories={setSelectedCategories}
                priceRange={priceRange}
                setPriceRange={setPriceRange}
                selectedRatings={selectedRatings}
                setSelectedRatings={setSelectedRatings}
                onClearFilters={clearFilters}
              />
            </aside>

            {/* Main Content */}
            <div className="flex-1">
              {/* Toolbar */}
              <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex flex-1 items-center gap-3">
                  {/* Mobile Filter Button */}
                  <Sheet>
                    <SheetTrigger asChild>
                      <Button variant="outline" className="gap-2 lg:hidden">
                        <SlidersHorizontal className="h-4 w-4" />
                        Filters
                      </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="w-80">
                      <SheetHeader>
                        <SheetTitle>Filters</SheetTitle>
                      </SheetHeader>
                      <div className="mt-6">
                        <FilterSidebar
                          selectedCategories={selectedCategories}
                          setSelectedCategories={setSelectedCategories}
                          priceRange={priceRange}
                          setPriceRange={setPriceRange}
                          selectedRatings={selectedRatings}
                          setSelectedRatings={setSelectedRatings}
                          onClearFilters={clearFilters}
                        />
                      </div>
                    </SheetContent>
                  </Sheet>

                  {/* Search */}
                  <div className="relative flex-1 sm:max-w-xs">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Search products..."
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      className="h-10 rounded-xl pl-10"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  {/* Sort */}
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-40 rounded-xl">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="featured">Featured</SelectItem>
                      <SelectItem value="newest">Newest</SelectItem>
                      <SelectItem value="price-low">Price: Low to High</SelectItem>
                      <SelectItem value="price-high">Price: High to Low</SelectItem>
                      <SelectItem value="rating">Top Rated</SelectItem>
                    </SelectContent>
                  </Select>

                  {/* View Toggle */}
                  <div className="hidden items-center gap-1 rounded-xl border p-1 sm:flex">
                    <Button
                      variant={viewMode === "grid" ? "secondary" : "ghost"}
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => setViewMode("grid")}
                    >
                      <Grid3X3 className="h-4 w-4" />
                    </Button>
                    <Button
                      variant={viewMode === "list" ? "secondary" : "ghost"}
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => setViewMode("list")}
                    >
                      <LayoutList className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Results Count */}
              <p className="mb-4 text-sm text-muted-foreground">
                Showing {sortedProducts.length} of {allProducts.length} products
              </p>

              {/* Products Grid */}
              {sortedProducts.length > 0 ? (
                <div
                  className={
                    viewMode === "grid"
                      ? "grid gap-6 sm:grid-cols-2 xl:grid-cols-3"
                      : "flex flex-col gap-4"
                  }
                >
                  {sortedProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-secondary">
                    <Search className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-semibold">No products found</h3>
                  <p className="mt-2 text-muted-foreground">
                    Try adjusting your filters or search terms
                  </p>
                  <Button onClick={clearFilters} variant="outline" className="mt-4">
                    Clear all filters
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}