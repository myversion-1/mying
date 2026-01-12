import type { Metadata } from "next";
import { StructuredDataServer } from "../../components/StructuredDataServer";

export const metadata: Metadata = {
  title: "Blog & News - Industry Updates & Technical Articles | Miying Rides",
  description:
    "Stay updated with the latest industry news, company updates, technical articles, and product information from Miying Amusement Equipment.",
  keywords: [
    "amusement ride news",
    "theme park industry news",
    "amusement equipment blog",
    "ride manufacturer updates",
    "industry trends",
    "technical articles",
    "trade show news",
    "amusement ride technology",
    "industry insights",
    "company news",
  ],
  openGraph: {
    title: "Blog & News - Industry Updates & Technical Articles | Miying Rides",
    description:
      "Stay updated with the latest industry news, company updates, technical articles, and product information from Miying Amusement Equipment.",
    url: "/blog",
  },
  alternates: {
    canonical: "/blog",
  },
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <StructuredDataServer type="blog" />
      {children}
    </>
  );
}


















