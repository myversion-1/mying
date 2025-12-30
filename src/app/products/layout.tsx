import type { Metadata } from "next";
import { StructuredDataServer } from "../../components/StructuredDataServer";
import { getProducts } from "../../content/copy";

export const metadata: Metadata = {
  title: "Products - Amusement Rides Catalog",
  description:
    "Browse our catalog of amusement rides including family rides, thrill rides, water rides, and custom attractions. Request specifications and quotes for your project.",
  keywords: [
    // Core Product Keywords
    "amusement rides catalog",
    "amusement ride catalog",
    "theme park rides catalog",
    "carnival rides catalog",
    
    // Ride Categories
    "family rides",
    "thrill rides",
    "water rides",
    "kiddie rides",
    "adult rides",
    "indoor amusement rides",
    "outdoor amusement rides",
    
    // Specific Ride Types
    "carousel",
    "merry go round",
    "ferris wheel",
    "bumper cars",
    "spinning rides",
    "swinging rides",
    "flying rides",
    "drop tower",
    "roller coaster",
    "dark ride",
    "simulator ride",
    
    // Equipment Types
    "amusement equipment",
    "theme park rides",
    "carnival rides",
    "amusement park equipment",
    "fairground rides",
    "funtime rides",
    
    // Product Attributes
    "new amusement rides",
    "used amusement rides",
    "custom amusement rides",
    "indoor rides",
    "outdoor rides",
    "portable rides",
    "stationary rides",
    
    // Search Intent
    "buy amusement rides",
    "amusement ride prices",
    "ride specifications",
    "ride dimensions",
    "ride capacity",
    "amusement ride quotes",
    "compare amusement rides",
    
    // Long-tail Keywords
    "best family rides for theme park",
    "affordable carnival rides",
    "indoor amusement rides for sale",
    "water park rides catalog",
    "thrill ride manufacturers",
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

