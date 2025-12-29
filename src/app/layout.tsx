import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "../components/Providers";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { StructuredData } from "../components/StructuredData";

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

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://mying.vercel.app"),
  title: {
    default: "Miying Rides | Amusement Rides Portfolio & Factory Visits",
    template: "%s | Miying Rides",
  },
  description:
    "Miying delivers amusement rides worldwide with factory-tested safety, consulting, refurbishment, and verified factory visits. Browse our catalog of family rides, thrill rides, and custom attractions.",
  keywords: [
    "amusement rides",
    "theme park rides",
    "family rides",
    "thrill rides",
    "amusement equipment",
    "factory visit",
    "ride refurbishment",
    "ride consulting",
    "amusement park equipment",
    "carnival rides",
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
    // Add your verification codes here when available
    // google: "your-google-verification-code",
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
    <html lang="en" dir="ltr">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} antialiased bg-[#0c1014] text-white`}
      >
        <Providers>
          <StructuredData />
          <Header />
          <main className="pb-20">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
