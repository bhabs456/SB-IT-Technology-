import Link from "next/link";
import Image from "next/image";
import { client } from "@/sanity/client";
import { brandPartnerQuery } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";

// TypeScript definition matching your central query output shape
interface BrandPartnerData {
  id: string; 
  name: string;
  logo: {
    _type: "image";
    asset: {
      _ref: string;
      _type: "reference";
    };
  };
  websiteUrl?: string;
}

export async function BrandsSection() {
  let brandPartners: BrandPartnerData[] = [];
  
  try {
    brandPartners = await client.fetch(
      brandPartnerQuery,
      {},
      { next: { revalidate: 3600 } }, // 1-hour ISR cache
    );
  } catch (err) {
    console.error("BrandsSection: Failed to fetch brand partners:", err);
  }
  
  const safeBrandPartners = brandPartners || [];

  // Early return if no active brand partners exist to avoid rendering empty tracking rails
  if (safeBrandPartners.length === 0) {
    return null;
  }

  return (
    <section className="border-y bg-card py-12 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="mb-8 text-center text-sm font-medium">
          Trusted by world-leading brands
        </p>
        
        <div className="relative w-full overflow-hidden marquee-mask">
          {/* Animated container with marquee animation, pausing on hover */}
          <div className="flex w-max animate-marquee">
            
            {/* TRACK A */}
            <div className="flex items-center gap-12 pr-16">
              {safeBrandPartners.map((brand, index) => {
                const logoUrl = urlFor(brand.logo).width(200).url();
                const content = (
                  <div className="relative h-12 w-28 opacity-100 sm:opacity-60 hover:opacity-100 transition-all duration-300">
                    <Image
                      src={logoUrl}
                      alt={`${brand.name} logo`}
                      fill
                      className="object-contain"
                    />
                  </div>
                );

                return brand.websiteUrl ? (
                  <Link key={`brand-a-${brand.id}-${index}`} href={brand.websiteUrl} target="_blank" rel="noopener noreferrer">
                    {content}
                  </Link>
                ) : (
                  <div key={`brand-a-${brand.id}-${index}`}>{content}</div>
                );
              })}
            </div>

            {/* TRACK B (Aria-hidden duplicated rail for seamless loop effects) */}
            <div className="flex items-center gap-12 pr-16" aria-hidden="true">
              {safeBrandPartners.map((brand, index) => {
                const logoUrl = urlFor(brand.logo).width(200).url();
                const content = (
                  <div className="relative h-12 w-28 opacity-60 hover:opacity-100 transition-all duration-300">
                    <Image
                      src={logoUrl}
                      alt={`${brand.name} logo`}
                      fill
                      className="object-contain"
                    />
                  </div>
                );

                return brand.websiteUrl ? (
                  <Link key={`brand-b-${brand.id}-${index}`} href={brand.websiteUrl} target="_blank" rel="noopener noreferrer">
                    {content}
                  </Link>
                ) : (
                  <div key={`brand-b-${brand.id}-${index}`}>{content}</div>
                );
              })}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}