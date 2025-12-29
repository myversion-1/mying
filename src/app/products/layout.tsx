import type { Metadata } from "next";
import { StructuredDataServer } from "../../components/StructuredDataServer";
import { getProducts } from "../../content/copy";

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
    "theme park rides",
    "carnival rides",
    "amusement park equipment",
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
  const products = getProducts("en"); // Use English for structured data
  const productData = products.slice(0, 10).map((p) => ({
    name: p.name,
    category: p.category,
    image: p.image,
    description: `${p.name} - ${p.category} amusement ride`,
  }));

  return (
    <>
      <StructuredDataServer type="products" products={productData} />
      {children}
    </>
  );
}

