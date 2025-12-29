import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Products - Amusement Rides Catalog",
  description:
    "Browse our catalog of amusement rides including family rides, thrill rides, water rides, and custom attractions. Request specifications and quotes for your project.",
  keywords: [
    "amusement rides catalog",
    "family rides",
    "thrill rides",
    "water rides",
    "carousel",
    "ferris wheel",
    "bumper cars",
    "amusement equipment",
  ],
  openGraph: {
    title: "Products - Amusement Rides Catalog | Miying Rides",
    description:
      "Browse our catalog of amusement rides including family rides, thrill rides, water rides, and custom attractions.",
    url: "/products",
  },
  alternates: {
    canonical: "/products",
  },
};

export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

