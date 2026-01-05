import type { Metadata } from "next";
import { StructuredDataServer } from "../../components/StructuredDataServer";

export const metadata: Metadata = {
  title: "Products - Amusement Rides Catalog | Miying Rides",
  description:
    "Browse our complete catalog of amusement rides including family rides, thrill rides, water rides, and custom attractions. All rides are factory-tested and certified for safety.",
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
