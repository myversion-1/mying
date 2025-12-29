import type { Metadata } from "next";
import { StructuredDataServer } from "../../components/StructuredDataServer";

export const metadata: Metadata = {
  title: "About Us - Factory-Tested Safety & Global Delivery",
  description:
    "Miying engineers amusement rides with verified safety and global delivery. Factory-tested QA, compliance-ready documentation, and experienced assembly teams.",
  keywords: [
    "amusement ride manufacturer",
    "factory tested safety",
    "ride compliance",
    "EN 13814",
    "ASTM F24",
    "ride refurbishment",
    "global delivery",
    "amusement equipment manufacturer",
    "theme park supplier",
  ],
  openGraph: {
    title: "About Us - Factory-Tested Safety & Global Delivery | Miying Rides",
    description:
      "Miying engineers amusement rides with verified safety and global delivery. Factory-tested QA, compliance-ready documentation, and experienced assembly teams.",
    url: "/about",
  },
  alternates: {
    canonical: "/about",
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <StructuredDataServer type="about" />
      {children}
    </>
  );
}

