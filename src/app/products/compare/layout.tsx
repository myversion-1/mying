import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Compare Amusement Rides | Side-by-Side Product Comparison - Miying",
  description:
    "Compare up to 4 amusement rides side-by-side. Compare specifications, features, and pricing to make the best decision for your venue.",
  keywords: [
    "compare amusement rides",
    "product comparison",
    "ride comparison tool",
    "amusement equipment comparison",
    "compare theme park rides",
  ],
  openGraph: {
    title: "Compare Amusement Rides | Side-by-Side Product Comparison - Miying",
    description:
      "Compare up to 4 amusement rides side-by-side. Compare specifications, features, and pricing to make the best decision for your venue.",
    url: "/products/compare",
  },
  alternates: {
    canonical: "/products/compare",
  },
};

export default function CompareLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

















