import type { Metadata } from "next";
import { StructuredDataServer } from "../../components/StructuredDataServer";

/**
 * ISR Configuration for Products Layout
 * Revalidate every 60 seconds for optimal performance
 */
export const revalidate = 60;

export const metadata: Metadata = {
  title: "Buy Amusement Rides | Theme Park Equipment Catalog | Get Quote",
  description:
    "Buy factory-tested amusement rides for FECs & theme parks. Browse family rides, thrill rides, water rides. EN 13814 compliant, global delivery. Get instant quote & download specifications.",
  keywords: [
    "amusement rides catalog",
    "theme park rides",
    "family rides",
    "thrill rides",
    "water rides",
    "carnival rides",
    "amusement equipment",
    "ride catalog",
    "buy amusement rides",
    "amusement ride manufacturer",
    "theme park equipment",
    "custom attractions",
    "factory tested rides",
    "certified rides",
  ],
  openGraph: {
    title: "Products - Amusement Rides Catalog | Miying Rides",
    description:
      "Browse our complete catalog of amusement rides including family rides, thrill rides, water rides, and custom attractions.",
    url: "/products",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Products - Amusement Rides Catalog | Miying Rides",
    description:
      "Browse our complete catalog of amusement rides including family rides, thrill rides, water rides, and custom attractions.",
  },
  alternates: {
    canonical: "/products",
    languages: {
      "en-US": "/products",
      "zh-CN": "/products?lang=zh",
      "ar-SA": "/products?lang=ar",
      "ru-RU": "/products?lang=ru",
      "ja-JP": "/products?lang=ja",
      "ko-KR": "/products?lang=ko",
      "th-TH": "/products?lang=th",
      "vi-VN": "/products?lang=vi",
      "id-ID": "/products?lang=id",
      "hi-IN": "/products?lang=hi",
      "es-ES": "/products?lang=es",
    },
  },
};

export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <StructuredDataServer type="products" />
      {children}
    </>
  );
}
