// components/footer.tsx
import Image from "next/image";
import Link from "next/link";
import { Facebook, Twitter, Instagram, Youtube, Linkedin, Globe } from "lucide-react";

// Sanity imports
import { client } from "@/sanity/client";
import { siteSettingsQUERY } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";

const footerLinks = {
  shop: [
    { name: "All Products", href: "/products" },
    { name: "Laptops", href: "/products?category=laptops" },
    { name: "Smartphones", href: "/products?category=smartphones" },
    { name: "Headphones", href: "/products?category=headphones" },
    { name: "Gaming", href: "/products?category=gaming" },
    { name: "Wearables", href: "/products?category=wearables" },
  ],
  support: [
    { name: "Contact Us", href: "/contact" },
    { name: "FAQs", href: "/faq" },
    { name: "Shipping Info", href: "/shipping" },
    { name: "Returns", href: "/returns" },
    { name: "Track Order", href: "/track" },
    { name: "Warranty", href: "/warranty" },
  ],
  company: [
    { name: "About Us", href: "/about" },
    { name: "Careers", href: "/careers" },
    { name: "Press", href: "/press" },
    { name: "Blog", href: "/blog" },
    { name: "Affiliates", href: "/affiliates" },
  ],
  legal: [
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
    { name: "Cookie Policy", href: "/cookies" },
  ],
};

// Maps platform string values from Sanity to Lucide Icons
const iconMap: Record<string, any> = {
  facebook: Facebook,
  twitter: Twitter,
  instagram: Instagram,
  youtube: Youtube,
  linkedin: Linkedin,
};

// Drops data cache lock to 0 seconds on local host environment so content updates flash instantly
const revalidateTime = process.env.NODE_ENV === "development" ? 0 : 3600;

export async function Footer() {
  // Fetch site variables synchronously directly on the server build layer
  const data = await client.fetch(siteSettingsQUERY, {}, { next: { revalidate: revalidateTime } });

  // Apply target constants with robust local fallbacks if fields are blank
  const siteName = data?.siteName || "SB IT Technology";
  const siteLogo = data?.siteLogo || null;
  const description = data?.description || "From the latest smartphones and high-performance laptops to essential IT hardware and accessories, we bring you top brands at the best prices. Experience reliable service, genuine products, and expert guidance right in your city.";
  const socials = data?.socials || [];
  const copyrightText = data?.copyrightText || "";

  return (
    <footer className="border-t bg-card">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid gap-8 lg:grid-cols-6">
          {/* Brand */}
          <div className="lg:col-span-2">
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
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground font-bold text-sm">
                  {siteName.charAt(0)}
                </div>
              )}
              <span className="text-xl font-bold tracking-tight pl-1">
                {siteName}
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-sm text-muted-foreground">
              {description}
            </p>

            {/* Dynamic Social Icons */}
            {socials.length > 0 && (
              <div className="mt-6 flex items-center gap-3">
                {socials.map((social: any, index: number) => {
                  const IconComponent = iconMap[social.platform.toLowerCase()] || Globe;
                  return (
                    <a
                      key={index}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-9 w-9 items-center justify-center rounded-lg bg-secondary text-muted-foreground transition-colors hover:bg-secondary/80 hover:text-foreground"
                      aria-label={social.platform}
                    >
                      <IconComponent className="h-4 w-4" />
                    </a>
                  );
                })}
              </div>
            )}
          </div>
          {/* Links Layout Engines */}
          <div>
            <h3 className="text-sm font-semibold">Shop</h3>
            <ul className="mt-4 space-y-3">
              {footerLinks.shop.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold">Support</h3>
            <ul className="mt-4 space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold">Company</h3>
            <ul className="mt-4 space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold">Legal</h3>
            <ul className="mt-4 space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        {/* Bottom Bar Container */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t pt-8 sm:flex-row">
          <p className="text-sm text-muted-foreground">
            {copyrightText || `© ${new Date().getFullYear()} ${siteName}. All Rights Reserved.`}
          </p>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-12 items-center justify-center rounded bg-secondary text-xs font-semibold text-muted-foreground">
                VISA
              </div>
              <div className="flex h-8 w-12 items-center justify-center rounded bg-secondary text-xs font-semibold text-muted-foreground">
                MC
              </div>
              <div className="flex h-8 w-12 items-center justify-center rounded bg-secondary text-xs font-semibold text-muted-foreground">
                AMEX
              </div>
              <div className="flex h-8 w-12 items-center justify-center rounded bg-secondary text-xs font-semibold text-muted-foreground">
                PP
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}