"use client"

import { useState } from "react"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import {
  Minus,
  Plus,
  Trash2,
  ShoppingBag,
  ArrowRight,
  Tag,
  Truck,
} from "lucide-react"

interface CartItem {
  id: string
  name: string
  description: string
  price: number
  originalPrice?: number
  quantity: number
  category: string
}

const initialCartItems: CartItem[] = [
  {
    id: "1",
    name: "MacBook Pro 16\" M3 Max",
    description: "Space Black, 36GB RAM, 1TB SSD",
    price: 3499,
    originalPrice: 3999,
    quantity: 1,
    category: "Laptops",
  },
  {
    id: "7",
    name: "AirPods Pro 2nd Gen",
    description: "Active Noise Cancellation, USB-C",
    price: 249,
    quantity: 2,
    category: "Headphones",
  },
  {
    id: "5",
    name: "Apple Watch Ultra 2",
    description: "49mm Titanium, Orange Alpine Loop",
    price: 799,
    quantity: 1,
    category: "Wearables",
  },
]

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>(initialCartItems)
  const [couponCode, setCouponCode] = useState("")
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null)

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return
    setCartItems(
      cartItems.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    )
  }

  const removeItem = (id: string) => {
    setCartItems(cartItems.filter((item) => item.id !== id))
  }

  const applyCoupon = () => {
    if (couponCode.toLowerCase() === "save10") {
      setAppliedCoupon("SAVE10")
      setCouponCode("")
    }
  }

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  )
  const discount = appliedCoupon ? subtotal * 0.1 : 0
  const shipping = subtotal > 99 ? 0 : 9.99
  const total = subtotal - discount + shipping

  if (cartItems.length === 0) {
    return (
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <main className="flex flex-1 items-center justify-center px-4 py-16">
          <div className="flex flex-col items-center text-center">
            <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-secondary">
              <ShoppingBag className="h-12 w-12 text-muted-foreground" />
            </div>
            <h1 className="text-2xl font-bold">Your cart is empty</h1>
            <p className="mt-2 text-muted-foreground">
              Looks like you haven&apos;t added anything to your cart yet.
            </p>
            <Button className="mt-6 gap-2 rounded-xl" asChild>
              <Link href="/products">
                Start Shopping
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight">Shopping Cart</h1>
          <p className="mt-2 text-muted-foreground">
            {cartItems.length} item{cartItems.length !== 1 ? "s" : ""} in your cart
          </p>

          <div className="mt-8 grid gap-8 lg:grid-cols-3">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="flex flex-col gap-4">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-4 rounded-2xl border bg-card p-4 sm:p-6"
                  >
                    {/* Product Image */}
                    <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-xl bg-secondary/50 sm:h-32 sm:w-32">
                      <div className="h-16 w-16 rounded-lg bg-primary/10 sm:h-20 sm:w-20" />
                    </div>

                    {/* Product Info */}
                    <div className="flex flex-1 flex-col">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="text-xs text-muted-foreground">{item.category}</p>
                          <Link
                            href={`/products/${item.id}`}
                            className="font-semibold hover:text-primary"
                          >
                            {item.name}
                          </Link>
                          <p className="mt-1 text-sm text-muted-foreground">
                            {item.description}
                          </p>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="shrink-0 text-muted-foreground hover:text-destructive"
                          onClick={() => removeItem(item.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>

                      <div className="mt-auto flex items-end justify-between pt-4">
                        {/* Quantity */}
                        <div className="flex items-center rounded-lg border">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 rounded-r-none"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="w-8 text-center text-sm font-medium">
                            {item.quantity}
                          </span>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 rounded-l-none"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>

                        {/* Price */}
                        <div className="text-right">
                          <p className="font-bold">
                            ${(item.price * item.quantity).toLocaleString()}
                          </p>
                          {item.originalPrice && (
                            <p className="text-sm text-muted-foreground line-through">
                              ${(item.originalPrice * item.quantity).toLocaleString()}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Continue Shopping */}
              <Button variant="ghost" className="mt-4 gap-2" asChild>
                <Link href="/products">
                  <ArrowRight className="h-4 w-4 rotate-180" />
                  Continue Shopping
                </Link>
              </Button>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 rounded-2xl border bg-card p-6">
                <h2 className="text-lg font-semibold">Order Summary</h2>

                {/* Coupon */}
                <div className="mt-6">
                  <Label className="text-sm font-medium">Promo Code</Label>
                  <div className="mt-2 flex gap-2">
                    <Input
                      placeholder="Enter code"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      className="rounded-xl"
                    />
                    <Button
                      variant="outline"
                      className="shrink-0 rounded-xl"
                      onClick={applyCoupon}
                    >
                      Apply
                    </Button>
                  </div>
                  {appliedCoupon && (
                    <div className="mt-2 flex items-center gap-2">
                      <Badge variant="secondary" className="gap-1">
                        <Tag className="h-3 w-3" />
                        {appliedCoupon}
                      </Badge>
                      <button
                        onClick={() => setAppliedCoupon(null)}
                        className="text-xs text-muted-foreground hover:text-foreground"
                      >
                        Remove
                      </button>
                    </div>
                  )}
                  <p className="mt-2 text-xs text-muted-foreground">
                    Try &quot;SAVE10&quot; for 10% off
                  </p>
                </div>

                <Separator className="my-6" />

                {/* Totals */}
                <div className="flex flex-col gap-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>${subtotal.toLocaleString()}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-emerald-600">
                      <span>Discount (10%)</span>
                      <span>-${discount.toLocaleString()}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Shipping</span>
                    <span>{shipping === 0 ? "Free" : `$${shipping}`}</span>
                  </div>
                  {shipping === 0 && (
                    <div className="flex items-center gap-2 rounded-lg bg-emerald-500/10 p-2 text-emerald-600">
                      <Truck className="h-4 w-4" />
                      <span className="text-xs">Free shipping on orders over $99</span>
                    </div>
                  )}
                </div>

                <Separator className="my-6" />

                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span>${total.toLocaleString()}</span>
                </div>

                <Button className="mt-6 w-full gap-2 rounded-xl" size="lg" asChild>
                  <Link href="/checkout">
                    Proceed to Checkout
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>

                {/* Trust Badges */}
                <div className="mt-6 flex items-center justify-center gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                    </svg>
                    Secure Checkout
                  </span>
                  <span>|</span>
                  <span>SSL Encrypted</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

function Label({ children, className }: { children: React.ReactNode; className?: string }) {
  return <label className={className}>{children}</label>
}
