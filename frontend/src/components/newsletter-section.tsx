"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Mail, ArrowRight, Check } from "lucide-react"

export function NewsletterSection() {
  const [email, setEmail] = useState("")
  const [isSubscribed, setIsSubscribed] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setIsSubscribed(true)
      setEmail("")
    }
  }

  return (
    <section className="bg-primary py-16 text-primary-foreground sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-foreground/10">
            <Mail className="h-7 w-7" />
          </div>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Stay in the Loop
          </h2>
          <p className="mt-4 text-lg text-primary-foreground/80">
            Subscribe to get exclusive deals, new product launches, and tech news delivered straight to your inbox.
          </p>
          {isSubscribed ? (
            <div className="mt-8 flex items-center justify-center gap-2 rounded-xl bg-primary-foreground/10 p-4">
              <Check className="h-5 w-5" />
              <span>Thanks for subscribing! Check your inbox for a welcome email.</span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-3 items-center sm:flex-row sm:justify-center">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-12 rounded-xl border-primary-foreground/20 bg-primary-foreground/10 px-4 text-primary-foreground placeholder:text-primary-foreground/60 focus-visible:ring-primary-foreground/50 sm:w-80"
              />
              <Button
                type="submit"
                size="lg"
                variant="secondary"
                className="gap-2 rounded-xl bg-primary-foreground text-primary hover:bg-primary-foreground/90"
              >
                Subscribe
                <ArrowRight className="h-4 w-4" />
              </Button>
            </form>
          )}
          <p className="mt-4 text-sm text-primary-foreground/60">
            No spam, unsubscribe anytime. Read our{" "}
            <a href="/privacy" className="underline hover:no-underline">
              Privacy Policy
            </a>
          </p>
        </div>
      </div>
    </section>
  )
}
