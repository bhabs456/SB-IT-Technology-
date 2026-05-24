import type { Metadata, Viewport } from 'next'
import { Inter, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { MobileNav } from '@/components/mobile-nav'
import { ThemeProvider } from '@/components/theme-provider' // <-- Make sure this path points to your provider file
import './globals.css'

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter"
});

const geistMono = Geist_Mono({ 
  subsets: ["latin"],
  variable: "--font-geist-mono"
});

export const metadata: Metadata = {
  title: 'SB IT Technology',
  description: 'Discover the latest in premium electronics - laptops, smartphones, headphones, gaming gear and more. Free shipping on orders over $99.',
  keywords: ['electronics', 'laptops', 'smartphones', 'gaming', 'headphones', 'tech'],
}

export const viewport: Viewport = {
  themeColor: '#3b82f6',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    // 1. Added suppressHydrationWarning to prevent client vs server flashes on boot
    <html 
      lang="en" 
      className={`${inter.variable} ${geistMono.variable} bg-background`}
      suppressHydrationWarning
    >
      <body className="font-sans antialiased pb-20 md:pb-0">
        {/* 2. Wrap children inside the ThemeProvider configured for class attributes */}
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <MobileNav />
          {process.env.NODE_ENV === 'production' && <Analytics />}
        </ThemeProvider>
      </body>
    </html>
  )
}