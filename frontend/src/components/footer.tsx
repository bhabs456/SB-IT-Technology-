"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Facebook, Twitter, Instagram, Youtube, Linkedin, Globe } from "lucide-react";

// Sanity imports
import { client } from "@/sanity/client";
import { siteSettings_QUERY } from "@/sanity/lib/queries";
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

const socialLinks = [
  { name: "Facebook", icon: Facebook, href: "#" },
  { name: "Twitter", icon: Twitter, href: "#" },
  { name: "Instagram", icon: Instagram, href: "#" },
  { name: "YouTube", icon: Youtube, href: "#" },
  { name: "LinkedIn", icon: Linkedin, href: "#" },
];

// Maps platform string values from Sanity to Lucide Icons
const iconMap: Record<string, any> = {
  facebook: Facebook,
  twitter: Twitter,
  instagram: Instagram,
  youtube: Youtube,
  linkedin: Linkedin,
};

export function Footer() {
  // State for Sanity configurations
  const [siteName, setSiteName] = useState("SB IT Technology");
  const [siteLogo, setSiteLogo] = useState<any>(null);
  const [description, setDescription] = useState(
    "Your trusted destination for premium electronics. Quality products, competitive prices, and exceptional service.",
  );
  const [socials, setSocials] = useState<any[]>([]);
  const [copyrightText, setCopyrightText] = useState("");
  useEffect(() => {
    client
      .fetch(siteSettings_QUERY)
      .then((data) => {
        if (data) {
          if (data.siteName) setSiteName(data.siteName);
          if (data.siteLogo) setSiteLogo(data.siteLogo);
          if (data.description) setDescription(data.description);
          if (data.socials) setSocials(data.socials);
          if (data.copyrightText) setCopyrightText(data.copyrightText);
        }
      })
      .catch((err) =>
        console.error("Footer: Failed to fetch site settings:", err),
      );
  }, []);
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
                <div className="flex h-9 w-9 items-center justify-center rounded-xl">
                </div>
              )}
              <span className="text-xl font-bold tracking-tight">
                {siteName}
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-sm text-muted-foreground">
              {description}
            </p>

            {/* Dynamic Social Icons */}
            {socials.length > 0 && (
              <div className="mt-6 flex items-center gap-3">
                {socials.map((social, index) => {
                  const IconComponent =
                    iconMap[social.platform.toLowerCase()] || Globe;
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
          {/* Links */}
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
        {/* Bottom Bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t pt-8 sm:flex-row">
          <p className="text-sm text-muted-foreground">
            {copyrightText ||
              `© ${new Date().getFullYear()} ${siteName}. All rights reserved.`}
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
