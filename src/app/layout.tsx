import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter, Crimson_Text } from "next/font/google";
import { Suspense } from "react";
import "./globals.css";
import { Providers } from "../components/Providers";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { MobileStickyNav } from "../components/MobileStickyNav";
import { StructuredDataServer } from "../components/StructuredDataServer";
import { ErrorBoundary } from "../components/ErrorBoundary";
import { ToastContainer } from "../components/Toast";
import { CustomerServiceWidgetWrapper } from "../components/CustomerServiceWidgetWrapper";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { AnalyticsProvider } from "../components/AnalyticsProvider";
import { ClarityProvider } from "../components/ClarityProvider";
import { ScrollToTop } from "../components/ScrollToTop";

// 优化字体加载：使用 display=swap 和 preload 策略
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap", // 优化字体加载性能
  preload: true, // 预加载关键字体
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  preload: false, // 非关键字体，延迟加载
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  preload: false, // 非关键字体，延迟加载
});

const crimsonText = Crimson_Text({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
  preload: true, // 标题字体，预加载
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://www.miyingrides.com"),
  title: {
    default: "Amusement Rides Manufacturer | Theme Park Equipment Supplier",
    template: "%s | Miying",
  },
  description:
    "Leading amusement rides manufacturer supplying FECs and theme parks globally. Factory-tested safety, custom solutions, worldwide delivery. ISO certified with 500+ installations.",
  keywords: [
    // High Priority Commercial Keywords
    "amusement rides manufacturer",
    "theme park equipment supplier",
    "FEC rides for sale",
    "carnival rides factory",
    "amusement park equipment manufacturer",
    "buy theme park rides",
    "commercial amusement rides",
    
    // Core Keywords
    "amusement rides",
    "theme park rides",
    "family rides",
    "thrill rides",
    "amusement equipment",
    "amusement park equipment",
    "carnival rides",
    
    // Manufacturer & Supplier
    "amusement ride factory",
    "ride manufacturer China",
    "amusement equipment supplier",
    "theme park rides manufacturer",
    "carnival equipment supplier",
    
    // Long-tail Keywords (Medium Priority)
    "used amusement rides for sale",
    "custom theme park rides manufacturer",
    "amusement ride installation services",
    "theme park equipment financing",
    "ISO certified amusement rides",
    "amusement ride refurbishment services",
    
    // Geographic Keywords
    "amusement rides manufacturer China",
    "theme park equipment exporter Asia",
    "international amusement rides supplier",
    
    // Product Types
    "carousel rides",
    "ferris wheel",
    "bumper cars",
    "water rides",
    "roller coaster",
    "spinning rides",
    "kiddie rides",
    "adult rides",
    "indoor rides",
    "outdoor rides",
    
    // Services
    "factory visit",
    "ride refurbishment",
    "ride consulting",
    "ride assembly service",
    "amusement ride sourcing",
    "ride installation service",
    "ride maintenance",
    "attraction rentals",
    "ride appraisal",
    
    // Quality & Safety
    "factory tested rides",
    "EN 13814 compliant",
    "ASTM F24 certified",
    "safety tested rides",
    "certified amusement rides",
    "quality amusement equipment",
    
    // Business Terms
    "used amusement rides",
    "new amusement rides",
    "custom attractions",
    "amusement ride catalog",
    "ride specifications",
    "ride quotes",
    "amusement ride prices",
    
    // Global & Delivery
    "global ride delivery",
    "worldwide shipping",
    "international ride supplier",
    "export amusement rides",
    
    // Long-tail Keywords
    "buy amusement rides online",
    "where to buy theme park rides",
    "amusement ride manufacturer directory",
    "best amusement ride supplier",
    "affordable theme park equipment",
    "professional ride consulting",
    "verified factory visit booking",
  ],
  authors: [{ name: "Miying Amusement Equipment" }],
  creator: "Miying Amusement Equipment",
  publisher: "Miying Amusement Equipment",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "Miying Rides",
    title: "Miying Rides | Amusement Rides Portfolio & Factory Visits",
    description:
      "Miying delivers amusement rides worldwide with factory-tested safety, consulting, refurbishment, and verified factory visits.",
    images: [
      {
        url: "/logo.jpg",
        width: 1200,
        height: 630,
        alt: "Miying Amusement Equipment",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Miying Rides | Amusement Rides Portfolio & Factory Visits",
    description:
      "Miying delivers amusement rides worldwide with factory-tested safety, consulting, refurbishment, and verified factory visits.",
    images: ["/logo.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "vviaZwKjyQ-TUZK-khVTefSUq_ecF8H0o0Wwwj1_u7g",
    // yandex: "your-yandex-verification-code",
    // bing: "your-bing-verification-code",
  },
  // Performance optimization: Preconnect to external domains
  other: {
    "google-site-verification": "vviaZwKjyQ-TUZK-khVTefSUq_ecF8H0o0Wwwj1_u7g",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/logo.jpg", type: "image/jpeg", sizes: "32x32" },
    ],
    apple: [
      { url: "/logo.jpg", sizes: "180x180", type: "image/jpeg" },
    ],
    shortcut: "/favicon.ico",
  },
  alternates: {
    canonical: "/",
    languages: {
      "en-US": "/",
      "zh-CN": "/?lang=zh",
      "ar-SA": "/?lang=ar",
      "ru-RU": "/?lang=ru",
      "ja-JP": "/?lang=ja",
      "ko-KR": "/?lang=ko",
      "th-TH": "/?lang=th",
      "vi-VN": "/?lang=vi",
      "id-ID": "/?lang=id",
      "hi-IN": "/?lang=hi",
      "es-ES": "/?lang=es",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Default to English, will be updated by DirectionProvider on client
  return (
    <html lang="en" dir="ltr" className="dark" suppressHydrationWarning>
      <head>
        {/* Performance optimization: Preconnect only to critical external domains */}
        {/* Note: Fonts are loaded via next/font/google which handles optimization automatically */}
        {/* Only preconnect to domains that are actually used on initial page load */}
        <link rel="dns-prefetch" href="https://wa.me" />
        {/* Removed unnecessary preconnect/dns-prefetch to reduce HTTP requests */}
        {/* TikTok and YouTube are loaded lazily, no need for early DNS prefetch */}
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} ${crimsonText.variable} antialiased bg-[var(--background)] text-[var(--foreground)]`}
        suppressHydrationWarning
      >
        <ErrorBoundary>
          <Providers>
            <ClarityProvider>
              <AnalyticsProvider>
                <StructuredDataServer type="home" />
              {/* Skip to main content link for accessibility */}
              <a
                href="#main-content"
                className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-[var(--action-primary)] focus:text-[var(--action-primary-text)] focus:rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--action-primary)] focus:ring-offset-2"
              >
                Skip to main content
              </a>
              <Suspense fallback={<div className="h-16 bg-[var(--background)]" />}>
                <Header />
              </Suspense>
              <main id="main-content" className="pb-28 md:pb-0">{children}</main>
              <Footer />
              <MobileStickyNav />
              <CustomerServiceWidgetWrapper />
              <ScrollToTop />
              <ToastContainer />
              </AnalyticsProvider>
            </ClarityProvider>
          </Providers>
          <Analytics />
          <SpeedInsights />
        </ErrorBoundary>
      </body>
    </html>
  );
}
