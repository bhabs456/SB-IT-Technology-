const brands = [
  { name: "Apple", logo: "A" },
  { name: "Samsung", logo: "S" },
  { name: "Sony", logo: "So" },
  { name: "Microsoft", logo: "M" },
  { name: "Dell", logo: "D" },
  { name: "Bose", logo: "B" },
  { name: "LG", logo: "LG" },
  { name: "ASUS", logo: "As" },
]

export function BrandsSection() {
  return (
    <section className="border-y bg-card py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="mb-8 text-center text-sm font-medium text-muted-foreground">
          Trusted by world-leading brands
        </p>
        <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12 lg:gap-16">
          {brands.map((brand) => (
            <div
              key={brand.name}
              className="flex h-12 w-20 items-center justify-center text-xl font-bold text-muted-foreground/60 transition-colors hover:text-foreground"
            >
              {brand.logo}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
