"use client"

import { useState } from "react"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  CreditCard,
  Truck,
  Package,
  Shield,
  ChevronRight,
  Check,
} from "lucide-react"

const orderItems = [
  {
    id: "1",
    name: "MacBook Pro 16\" M3 Max",
    price: 3499,
    quantity: 1,
  },
  {
    id: "7",
    name: "AirPods Pro 2nd Gen",
    price: 249,
    quantity: 2,
  },
  {
    id: "5",
    name: "Apple Watch Ultra 2",
    price: 799,
    quantity: 1,
  },
]

export default function CheckoutPage() {
  const [step, setStep] = useState(1)
  const [shippingMethod, setShippingMethod] = useState("standard")
  const [paymentMethod, setPaymentMethod] = useState("card")

  const subtotal = orderItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  )
  const shipping = shippingMethod === "express" ? 19.99 : 0
  const tax = subtotal * 0.08
  const total = subtotal + shipping + tax

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 bg-secondary/30">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="mb-8 flex items-center gap-2 text-sm text-muted-foreground">
            <Link href="/cart" className="hover:text-foreground">Cart</Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-foreground">Checkout</span>
          </nav>

          {/* Progress Steps */}
          <div className="mb-8 flex items-center justify-center gap-4">
            {[
              { num: 1, label: "Shipping" },
              { num: 2, label: "Payment" },
              { num: 3, label: "Review" },
            ].map((s, i) => (
              <div key={s.num} className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div
                    className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium ${
                      step >= s.num
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary text-muted-foreground"
                    }`}
                  >
                    {step > s.num ? <Check className="h-4 w-4" /> : s.num}
                  </div>
                  <span className={step >= s.num ? "font-medium" : "text-muted-foreground"}>
                    {s.label}
                  </span>
                </div>
                {i < 2 && <div className="h-px w-12 bg-border sm:w-24" />}
              </div>
            ))}
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            {/* Main Form */}
            <div className="lg:col-span-2">
              {step === 1 && (
                <div className="rounded-2xl border bg-card p-6">
                  <h2 className="text-xl font-semibold">Shipping Information</h2>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Enter your shipping details
                  </p>

                  <div className="mt-6 grid gap-4 sm:grid-cols-2">
                    <div>
                      <Label htmlFor="firstName">First Name</Label>
                      <Input id="firstName" className="mt-1.5 rounded-xl" placeholder="John" />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input id="lastName" className="mt-1.5 rounded-xl" placeholder="Doe" />
                    </div>
                    <div className="sm:col-span-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input id="email" type="email" className="mt-1.5 rounded-xl" placeholder="john@example.com" />
                    </div>
                    <div className="sm:col-span-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input id="phone" type="tel" className="mt-1.5 rounded-xl" placeholder="+1 (555) 000-0000" />
                    </div>
                    <div className="sm:col-span-2">
                      <Label htmlFor="address">Street Address</Label>
                      <Input id="address" className="mt-1.5 rounded-xl" placeholder="123 Main Street" />
                    </div>
                    <div>
                      <Label htmlFor="city">City</Label>
                      <Input id="city" className="mt-1.5 rounded-xl" placeholder="San Francisco" />
                    </div>
                    <div>
                      <Label htmlFor="state">State</Label>
                      <Select>
                        <SelectTrigger className="mt-1.5 rounded-xl">
                          <SelectValue placeholder="Select state" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ca">California</SelectItem>
                          <SelectItem value="ny">New York</SelectItem>
                          <SelectItem value="tx">Texas</SelectItem>
                          <SelectItem value="fl">Florida</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="zip">ZIP Code</Label>
                      <Input id="zip" className="mt-1.5 rounded-xl" placeholder="94102" />
                    </div>
                    <div>
                      <Label htmlFor="country">Country</Label>
                      <Select defaultValue="us">
                        <SelectTrigger className="mt-1.5 rounded-xl">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="us">United States</SelectItem>
                          <SelectItem value="ca">Canada</SelectItem>
                          <SelectItem value="uk">United Kingdom</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <Separator className="my-6" />

                  <h3 className="font-semibold">Shipping Method</h3>
                  <RadioGroup
                    value={shippingMethod}
                    onValueChange={setShippingMethod}
                    className="mt-4 grid gap-3"
                  >
                    <label
                      htmlFor="standard"
                      className={`flex cursor-pointer items-center justify-between rounded-xl border p-4 ${
                        shippingMethod === "standard" ? "border-primary bg-primary/5" : ""
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <RadioGroupItem value="standard" id="standard" />
                        <div className="flex items-center gap-3">
                          <Truck className="h-5 w-5 text-muted-foreground" />
                          <div>
                            <p className="font-medium">Standard Shipping</p>
                            <p className="text-sm text-muted-foreground">5-7 business days</p>
                          </div>
                        </div>
                      </div>
                      <span className="font-medium text-emerald-600">Free</span>
                    </label>
                    <label
                      htmlFor="express"
                      className={`flex cursor-pointer items-center justify-between rounded-xl border p-4 ${
                        shippingMethod === "express" ? "border-primary bg-primary/5" : ""
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <RadioGroupItem value="express" id="express" />
                        <div className="flex items-center gap-3">
                          <Package className="h-5 w-5 text-muted-foreground" />
                          <div>
                            <p className="font-medium">Express Shipping</p>
                            <p className="text-sm text-muted-foreground">1-2 business days</p>
                          </div>
                        </div>
                      </div>
                      <span className="font-medium">$19.99</span>
                    </label>
                  </RadioGroup>

                  <Button className="mt-6 w-full rounded-xl" size="lg" onClick={() => setStep(2)}>
                    Continue to Payment
                  </Button>
                </div>
              )}

              {step === 2 && (
                <div className="rounded-2xl border bg-card p-6">
                  <h2 className="text-xl font-semibold">Payment Method</h2>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Select your preferred payment method
                  </p>

                  <RadioGroup
                    value={paymentMethod}
                    onValueChange={setPaymentMethod}
                    className="mt-6 grid gap-3"
                  >
                    <label
                      htmlFor="card"
                      className={`flex cursor-pointer items-center gap-3 rounded-xl border p-4 ${
                        paymentMethod === "card" ? "border-primary bg-primary/5" : ""
                      }`}
                    >
                      <RadioGroupItem value="card" id="card" />
                      <CreditCard className="h-5 w-5 text-muted-foreground" />
                      <span className="font-medium">Credit / Debit Card</span>
                    </label>
                    <label
                      htmlFor="paypal"
                      className={`flex cursor-pointer items-center gap-3 rounded-xl border p-4 ${
                        paymentMethod === "paypal" ? "border-primary bg-primary/5" : ""
                      }`}
                    >
                      <RadioGroupItem value="paypal" id="paypal" />
                      <div className="flex h-5 w-5 items-center justify-center rounded bg-blue-600 text-xs font-bold text-white">
                        P
                      </div>
                      <span className="font-medium">PayPal</span>
                    </label>
                    <label
                      htmlFor="apple"
                      className={`flex cursor-pointer items-center gap-3 rounded-xl border p-4 ${
                        paymentMethod === "apple" ? "border-primary bg-primary/5" : ""
                      }`}
                    >
                      <RadioGroupItem value="apple" id="apple" />
                      <div className="flex h-5 w-5 items-center justify-center rounded bg-foreground text-xs font-bold text-background">
                        A
                      </div>
                      <span className="font-medium">Apple Pay</span>
                    </label>
                  </RadioGroup>

                  {paymentMethod === "card" && (
                    <div className="mt-6 grid gap-4">
                      <div>
                        <Label htmlFor="cardNumber">Card Number</Label>
                        <Input
                          id="cardNumber"
                          className="mt-1.5 rounded-xl"
                          placeholder="1234 5678 9012 3456"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="expiry">Expiry Date</Label>
                          <Input
                            id="expiry"
                            className="mt-1.5 rounded-xl"
                            placeholder="MM/YY"
                          />
                        </div>
                        <div>
                          <Label htmlFor="cvc">CVC</Label>
                          <Input
                            id="cvc"
                            className="mt-1.5 rounded-xl"
                            placeholder="123"
                          />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="cardName">Name on Card</Label>
                        <Input
                          id="cardName"
                          className="mt-1.5 rounded-xl"
                          placeholder="John Doe"
                        />
                      </div>
                    </div>
                  )}

                  <div className="mt-6 flex items-start gap-2">
                    <Checkbox id="saveCard" />
                    <label htmlFor="saveCard" className="text-sm">
                      Save payment information for future purchases
                    </label>
                  </div>

                  <div className="mt-6 flex gap-3">
                    <Button variant="outline" className="rounded-xl" onClick={() => setStep(1)}>
                      Back
                    </Button>
                    <Button className="flex-1 rounded-xl" size="lg" onClick={() => setStep(3)}>
                      Review Order
                    </Button>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="flex flex-col gap-6">
                  <div className="rounded-2xl border bg-card p-6">
                    <h2 className="text-xl font-semibold">Review Your Order</h2>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Please review your order details before placing
                    </p>

                    {/* Shipping Address */}
                    <div className="mt-6 rounded-xl bg-secondary/50 p-4">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium">Shipping Address</h3>
                        <Button variant="ghost" size="sm" onClick={() => setStep(1)}>
                          Edit
                        </Button>
                      </div>
                      <p className="mt-2 text-sm text-muted-foreground">
                        John Doe<br />
                        123 Main Street<br />
                        San Francisco, CA 94102<br />
                        United States
                      </p>
                    </div>

                    {/* Payment Method */}
                    <div className="mt-4 rounded-xl bg-secondary/50 p-4">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium">Payment Method</h3>
                        <Button variant="ghost" size="sm" onClick={() => setStep(2)}>
                          Edit
                        </Button>
                      </div>
                      <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
                        <CreditCard className="h-4 w-4" />
                        <span>Visa ending in 4242</span>
                      </div>
                    </div>

                    {/* Order Items */}
                    <div className="mt-6">
                      <h3 className="font-medium">Order Items</h3>
                      <div className="mt-4 divide-y">
                        {orderItems.map((item) => (
                          <div key={item.id} className="flex items-center justify-between py-3">
                            <div className="flex items-center gap-3">
                              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-secondary">
                                <div className="h-8 w-8 rounded bg-primary/10" />
                              </div>
                              <div>
                                <p className="font-medium">{item.name}</p>
                                <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                              </div>
                            </div>
                            <span className="font-medium">
                              ${(item.price * item.quantity).toLocaleString()}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-2">
                    <Checkbox id="terms" />
                    <label htmlFor="terms" className="text-sm">
                      I agree to the{" "}
                      <Link href="/terms" className="text-primary hover:underline">
                        Terms of Service
                      </Link>{" "}
                      and{" "}
                      <Link href="/privacy" className="text-primary hover:underline">
                        Privacy Policy
                      </Link>
                    </label>
                  </div>

                  <div className="flex gap-3">
                    <Button variant="outline" className="rounded-xl" onClick={() => setStep(2)}>
                      Back
                    </Button>
                    <Button className="flex-1 rounded-xl" size="lg">
                      Place Order - ${total.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </Button>
                  </div>
                </div>
              )}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 rounded-2xl border bg-card p-6">
                <h2 className="text-lg font-semibold">Order Summary</h2>

                <div className="mt-6 flex flex-col gap-3">
                  {orderItems.map((item) => (
                    <div key={item.id} className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">
                        {item.name} x{item.quantity}
                      </span>
                      <span>${(item.price * item.quantity).toLocaleString()}</span>
                    </div>
                  ))}
                </div>

                <Separator className="my-6" />

                <div className="flex flex-col gap-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>${subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Shipping</span>
                    <span>{shipping === 0 ? "Free" : `$${shipping}`}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Tax</span>
                    <span>${tax.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                  </div>
                </div>

                <Separator className="my-6" />

                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span>${total.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                </div>

                {/* Trust Indicators */}
                <div className="mt-6 flex flex-col gap-3">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Shield className="h-4 w-4" />
                    <span>Secure 256-bit SSL encryption</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Truck className="h-4 w-4" />
                    <span>Free returns within 30 days</span>
                  </div>
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
