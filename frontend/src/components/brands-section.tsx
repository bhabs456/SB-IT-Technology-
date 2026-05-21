const brands = [
  { name: "Apple", logo: "A", image: "/brand-logo/apple-logo.png" },
  { name: "Samsung", logo: "S", image: "/brand-logo/samsung.png" },
  { name: "Sony", logo: "So", image: "/brand-logo/sony.png" },
  { name: "Microsoft", logo: "M", image: "/brand-logo/microsoft.png" },
  { name: "Dell", logo: "D", image: "/brand-logo/dell.png" },
  { name: "Xiaomi", logo: "MI", image: "/brand-logo/xiaomi.png" },
  { name: "LG", logo: "LG", image: "/brand-logo/lg.png" },
  { name: "ASUS", logo: "As", image: "/brand-logo/asus.png" },
];

export function BrandsSection() {
  return (
    <section className="border-y bg-card py-12 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="mb-8 text-center text-sm font-medium">
          Trusted by world-leading brands
        </p>

        {/* LAYER 1: THE FRAME (Hides overflow and fades edges using custom marquee-mask utility) */}
        <div className="relative w-full overflow-hidden marquee-mask">
          {/* Animated container with marquee animation, pausing on hover */}
          <div className="flex w-max animate-marquee">
            {/* TRACK A */}
            <div className="flex items-center gap-16 pr-16">
              {brands.map((brand, index) => (
                <div
                  key={`${brand.name}-a-${index}`}
                  className="flex h-12 w-28 items-center justify-center"
                >
                  <img
                    src={brand.image}
                    alt={`${brand.name} logo`}
                    className="max-h-full max-w-full object-contain opacity-60  hover:opacity-100 transition-all duration-300"
                  />
                </div>
              ))}
            </div>

            {/* TRACK B */}
            <div className="flex items-center gap-16 pr-16" aria-hidden="true">
              {brands.map((brand, index) => (
                <div
                  key={`${brand.name}-b-${index}`}
                  className="flex h-12 w-28 items-center justify-center"
                >
                  <img
                    src={brand.image}
                    alt={`${brand.name} logo`}
                    className="max-h-full max-w-full object-contain opacity-60  hover:opacity-100 transition-all duration-300"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
