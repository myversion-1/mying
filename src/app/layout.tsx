import type { Metadata } from "next";
import { Inter, Crimson_Text } from "next/font/google";
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
import { WebVitals, WebVitalsDebugPanel } from "../components/WebVitals";
import { generateEnhancedHreflangAlternates, generateGeoMetaTags } from "../utils/geo-seo";

// Performance optimization: Load only critical fonts to reduce initial page load
// Reduced from 4 fonts to 2 critical fonts, saving ~80KB on initial load
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap", // Use font-display: swap to prevent invisible text
  preload: true, // Preload critical font for better FCP
  weight: ["400", "500", "600", "700"], // Load only required weights
});

const crimsonText = Crimson_Text({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["600", "700"], // Reduced from 3 to 2 weights (used for headings only)
  display: "swap",
  preload: true, // Preload for headings
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
    google: "dieTmEfwD8bO9SXnqT16EPNCxmmdg4pqCIWAA8MhxWI",
    // yandex: "your-yandex-verification-code",
    // bing: "your-bing-verification-code",
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
    // Enhanced hreflang with geographic targeting for Asian markets
    // Includes both language-only (e.g., "zh") and language-region (e.g., "zh-CN") combinations
    ...generateEnhancedHreflangAlternates("/", true),
  },
  // Geographic targeting meta tags for better SEO in Asian markets
  other: {
    "google-site-verification": "dieTmEfwD8bO9SXnqT16EPNCxmmdg4pqCIWAA8MhxWI",
    // Global default geographic targeting (English version targets global market)
    "geo.region": "US",
    "geo.placename": "Global",
    "target-country": "Global",
    "target-region": "Global",
    "content-language": "en",
    // Note: Language-specific geographic targeting is added per-page via generateGeoMetaTags()
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Default to English, will be updated by DirectionProvider on client
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <head>
        {/* Critical CSS - Inline to prevent render blocking and reduce critical path latency */}
        {/* Optimized for minimal critical path - only above-fold styles */}
        <style dangerouslySetInnerHTML={{
          __html: `
            :root{--background:#fafbfc;--foreground:#1a1a1a;--surface:#fafbfc;--surface-elevated:#f5f6f8;--text-primary:#1a2332;--text-secondary:#2d3e52;--accent-primary:#00eaff;--action-primary:#00eaff;--action-primary-text:#0a1628;--border:rgba(0,0,0,0.06)}
            .dark{--background:#0F172A;--foreground:rgba(255,255,255,0.98);--surface:#0F172A;--surface-elevated:#1E293B;--text-primary:rgba(255,255,255,0.98);--text-secondary:rgba(255,255,255,0.85);--accent-primary:#06B6D4;--action-primary:#06B6D4;--action-primary-text:#0F172A;--border:rgba(255,255,255,0.1)}
            *{margin:0;padding:0;box-sizing:border-box}
            html{scroll-behavior:smooth;scroll-padding-top:80px}
            body{font-family:var(--font-inter),system-ui,-apple-system,sans-serif;background-color:var(--background);color:var(--foreground);line-height:1.6;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}
            h1,h2,h3,h4,h5,h6{font-family:var(--font-inter),var(--font-serif),system-ui,-apple-system,sans-serif;font-weight:600}
            header{position:sticky;top:0;z-index:40;border-bottom:1px solid var(--border);background:rgba(250,251,252,0.8);backdrop-filter:blur(12px)}
            .dark header{background:rgba(10,22,40,0.8)}
            button,a{min-height:44px;min-width:44px;touch-action:manipulation}
            img{display:block;max-width:100%;height:auto;content-visibility:auto}
            main#main-content{min-height:100vh;content-visibility:auto}
            section{content-visibility:auto;contain-intrinsic-size:auto 500px}
            /* Performance: contain layout for expensive components */
            .grid,.flex{contain:layout style}
            /* Performance: reduce repaints for fixed elements */
            .sticky,.fixed{will-change:transform}
            /* Performance: optimize images */
            img{content-visibility:auto}
            @media (prefers-reduced-motion:reduce){html{scroll-behavior:auto}}
          `
        }} />

        {/* Theme initialization script - must run before render to prevent hydration mismatch */}
        <script dangerouslySetInnerHTML={{
          __html: `
            (function() {
              try {
                var theme = localStorage.getItem('theme') || 'dark';
                if (theme === 'dark') {
                  document.documentElement.classList.add('dark');
                } else {
                  document.documentElement.classList.remove('dark');
                }
              } catch (e) {
                // If localStorage is not available, default to dark mode
                document.documentElement.classList.add('dark');
              }
            })();
          `
        }} />

        {/* Performance optimization: Resource hints for critical external domains */}
        <link rel="dns-prefetch" href="https://wa.me" />
        <link rel="preconnect" href="https://www.googletagmanager.com" crossOrigin="anonymous" />

        {/* Performance: Defer non-critical CSS - load after interactive */}
        <script dangerouslySetInnerHTML={{
          __html: `
            // Defer non-critical resources to improve FCP
            window.addEventListener('load', function() {
              // Load non-critical stylesheets after page is interactive
              const nonCriticalStyles = document.querySelectorAll('link[data-defer="true"]');
              nonCriticalStyles.forEach(link => {
                link.rel = 'stylesheet';
                link.removeAttribute('data-defer');
              });
            });
          `
        }} />
      </head>
      <body
        className={`${inter.variable} ${crimsonText.variable} antialiased bg-[var(--background)] text-[var(--foreground)]`}
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
              <Suspense fallback={
                <div 
                  className="h-16 w-full bg-[var(--background)] border-b border-[var(--border)] sticky top-0 z-40"
                  style={{ minHeight: '64px' }}
                  aria-label="Loading header"
                />
              }>
                <Header />
              </Suspense>
              <main 
                id="main-content" 
                className="pb-28 md:pb-0"
              >
                {children}
              </main>
              <Footer />
              <MobileStickyNav />
              <CustomerServiceWidgetWrapper />
              <ScrollToTop />
              <ToastContainer />
              {/* Web Vitals Performance Monitoring */}
              <WebVitals debug={process.env.NODE_ENV === "development"} />
              {process.env.NODE_ENV === "development" && <WebVitalsDebugPanel />}
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
