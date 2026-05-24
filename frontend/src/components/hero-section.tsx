import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-secondary/50">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
        <div className="grid items-center gap-12 lg:grid-cols-2 ">
          {/* Content */}
          <div className="flex flex-col gap-6 ">
            <div className="inline-flex w-fit items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
              New Arrivals 2024
            </div>
            <h1 className="text-balance text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Next-Gen Tech,{" "}
              <span className="text-primary">Delivered Today</span>
            </h1>
            <p className="max-w-lg text-pretty text-lg text-muted-foreground">
              Discover premium electronics from world-leading brands. From cutting-edge laptops to flagship smartphones, experience technology at its finest.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button size="lg" className="gap-2 rounded-xl" asChild>
                <Link href="/products">
                  Shop Now
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="rounded-xl" asChild>
                <Link href="/deals">
                  View Deals
                </Link>
              </Button>
            </div>
            <div className="flex items-center gap-8 pt-4">
              <div>
                <p className="text-2xl font-bold">50K+</p>
                <p className="text-sm text-muted-foreground">Happy Customers</p>
              </div>
              <div className="h-8 w-px bg-border" />
              <div>
                <p className="text-2xl font-bold">500+</p>
                <p className="text-sm text-muted-foreground">Products</p>
              </div>
              <div className="h-8 w-px bg-border" />
              <div>
                <p className="text-2xl font-bold">24/7</p>
                <p className="text-sm text-muted-foreground">Support</p>
              </div>
            </div>
          </div>

          {/* Hero Image/Visual */}
          {/* <div className="relative">
            <div className="relative aspect-square overflow-hidden rounded-3xl bg-gradient-to-br from-primary/20 via-primary/10 to-transparent p-8 lg:aspect-[4/3]">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex h-40 w-40 items-center justify-center rounded-2xl bg-card shadow-lg sm:h-48 sm:w-48">
                    <div className="text-center">
                      <div className="mx-auto mb-2 flex h-16 w-16 items-center justify-center rounded-xl bg-primary/10">
                        <svg className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <p className="text-sm font-medium">MacBook Pro</p>
                      <p className="text-xs text-muted-foreground">From $1,299</p>
                    </div>
                  </div>
                  <div className="flex h-40 w-40 translate-y-8 items-center justify-center rounded-2xl bg-card shadow-lg sm:h-48 sm:w-48">
                    <div className="text-center">
                      <div className="mx-auto mb-2 flex h-16 w-16 items-center justify-center rounded-xl bg-primary/10">
                        <svg className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
                        </svg>
                      </div>
                      <p className="text-sm font-medium">iPhone 16 Pro</p>
                      <p className="text-xs text-muted-foreground">From $999</p>
                    </div>
                  </div>
                  <div className="flex h-40 w-40 -translate-y-8 items-center justify-center rounded-2xl bg-card shadow-lg sm:h-48 sm:w-48">
                    <div className="text-center">
                      <div className="mx-auto mb-2 flex h-16 w-16 items-center justify-center rounded-xl bg-primary/10">
                        <svg className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" />
                        </svg>
                      </div>
                      <p className="text-sm font-medium">AirPods Pro</p>
                      <p className="text-xs text-muted-foreground">From $249</p>
                    </div>
                  </div>
                  <div className="flex h-40 w-40 items-center justify-center rounded-2xl bg-card shadow-lg sm:h-48 sm:w-48">
                    <div className="text-center">
                      <div className="mx-auto mb-2 flex h-16 w-16 items-center justify-center rounded-xl bg-primary/10">
                        <svg className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 6.087c0-.355.186-.676.401-.959.221-.29.349-.634.349-1.003 0-1.036-1.007-1.875-2.25-1.875s-2.25.84-2.25 1.875c0 .369.128.713.349 1.003.215.283.401.604.401.959v0a.64.64 0 01-.657.643 48.39 48.39 0 01-4.163-.3c.186 1.613.293 3.25.315 4.907a.656.656 0 01-.658.663v0c-.355 0-.676-.186-.959-.401a1.647 1.647 0 00-1.003-.349c-1.036 0-1.875 1.007-1.875 2.25s.84 2.25 1.875 2.25c.369 0 .713-.128 1.003-.349.283-.215.604-.401.959-.401v0c.31 0 .555.26.532.57a48.039 48.039 0 01-.642 5.056c1.518.19 3.058.309 4.616.354a.64.64 0 00.657-.643v0c0-.355-.186-.676-.401-.959a1.647 1.647 0 01-.349-1.003c0-1.035 1.008-1.875 2.25-1.875 1.243 0 2.25.84 2.25 1.875 0 .369-.128.713-.349 1.003-.215.283-.4.604-.4.959v0c0 .333.277.599.61.58a48.1 48.1 0 005.427-.63 48.05 48.05 0 00.582-4.717.532.532 0 00-.533-.57v0c-.355 0-.676.186-.959.401-.29.221-.634.349-1.003.349-1.035 0-1.875-1.007-1.875-2.25s.84-2.25 1.875-2.25c.37 0 .713.128 1.003.349.283.215.604.401.959.401v0a.656.656 0 00.658-.663 48.422 48.422 0 00-.37-5.36c-1.886.342-3.81.574-5.766.689a.578.578 0 01-.61-.58v0z" />
                        </svg>
                      </div>
                      <p className="text-sm font-medium">PS5 Console</p>
                      <p className="text-xs text-muted-foreground">From $499</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </section>
  )
}
