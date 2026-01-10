import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter, Crimson_Text } from "next/font/google";
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

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const crimsonText = Crimson_Text({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://mying.vercel.app"),
  title: {
    default: "Miying Rides | Amusement Rides Portfolio & Factory Visits",
    template: "%s | Miying Rides",
  },
  description:
    "Miying delivers amusement rides worldwide with factory-tested safety, consulting, refurbishment, and verified factory visits. Browse our catalog of family rides, thrill rides, water rides, and custom attractions. Request quotes and factory visits for your theme park or carnival project.",
  keywords: [
    // Core Keywords
    "amusement rides",
    "theme park rides",
    "family rides",
    "thrill rides",
    "amusement equipment",
    "amusement park equipment",
    "carnival rides",
    
    // Manufacturer & Supplier
    "amusement ride manufacturer",
    "theme park equipment supplier",
    "amusement ride factory",
    "ride manufacturer China",
    "amusement equipment supplier",
    "theme park rides manufacturer",
    "carnival equipment supplier",
    
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
  return (
    <html lang="en" dir="ltr" className="dark" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} ${crimsonText.variable} antialiased bg-[var(--background)] text-[var(--foreground)]`}
        suppressHydrationWarning
      >
        <ErrorBoundary>
          <Providers>
            <StructuredDataServer type="home" />
            <Header />
            <main className="pb-28 md:pb-0">{children}</main>
          <Footer />
          <MobileStickyNav />
          <CustomerServiceWidgetWrapper />
          <ToastContainer />
        </Providers>
        <Analytics />
      </ErrorBoundary>
      </body>
    </html>
  );
}
