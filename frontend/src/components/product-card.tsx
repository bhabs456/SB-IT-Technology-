"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, ShoppingCart, Star } from "lucide-react";

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  category: string;
  image?: string;
  badge?: string;
  inStock: boolean;
}

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const discount = product.originalPrice
    ? Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100,
      )
    : 0;

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-2xl border bg-card transition-all hover:shadow-lg">
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden bg-secondary/50">
        <div className="flex h-full items-center justify-center p-8">
          <div className="h-24 w-24 rounded-2xl bg-primary/10 sm:h-32 sm:w-32" />
        </div>

        {/* Badges */}
        {product.badge && (
          <Badge className="absolute left-3 top-3 bg-primary text-primary-foreground">
            {product.badge}
          </Badge>
        )}
        {discount > 0 && (
          <Badge variant="destructive" className="absolute right-3 top-3">
            -{discount}%
          </Badge>
        )}

        {/* Wishlist Button */}
        <button
          onClick={() => setIsWishlisted(!isWishlisted)}
          className="absolute cursor-pointer right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-card/80 backdrop-blur transition-all hover:bg-card"
          style={{ top: discount > 0 ? "48px" : "12px" }}
        >
          <Heart
            className={`h-4 w-4 transition-colors ${
              isWishlisted
                ? "fill-red-500 text-red-500"
                : "text-muted-foreground"
            }`}
          />
        </button>

        {/* Quick Add Button - Shows on Hover */}
        <div className="absolute inset-x-3 bottom-3 translate-y-full opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100">
          <Button className="w-full gap-2 cursor-pointer rounded-xl" size="sm">
            <ShoppingCart className="h-4 w-4" />
            Add to Cart
          </Button>
        </div>
      </div>

      {/* Content */}
      <Link href={`/products/${product.id}`} className="mt-1">
        <div className="flex flex-1 flex-col p-4 cursor-pointer">
          <p className="text-xs text-muted-foreground">{product.category}</p>

          <h3 className="line-clamp-2 font-medium transition-colors">
            {product.name}
          </h3>

          {/* Rating */}
          <div className="mt-2 flex items-center gap-1">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-3.5 w-3.5 ${
                    i < Math.floor(product.rating)
                      ? "fill-amber-400 text-amber-400"
                      : "fill-muted text-muted"
                  }`}
                />
              ))}
            </div>
            <span className="text-xs text-muted-foreground">
              ({product.reviewCount})
            </span>
          </div>

          {/* Price */}
          <div className="mt-auto flex items-baseline gap-2 pt-3">
            <span className="text-lg font-bold">
              ${product.price.toLocaleString()}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-muted-foreground line-through">
                ${product.originalPrice.toLocaleString()}
              </span>
            )}
          </div>

          {/* Stock Status */}
          {!product.inStock && (
            <p className="mt-2 text-xs text-destructive">Out of Stock</p>
          )}
        </div>
      </Link>
    </div>
  );
}
