import type { Metadata } from "next";
import { StructuredDataServer } from "../../components/StructuredDataServer";

export const metadata: Metadata = {
  title: "About Us - Factory-Tested Safety & Global Delivery",
  description:
    "Miying engineers amusement rides with verified safety and global delivery. Factory-tested QA, compliance-ready documentation, and experienced assembly teams.",
  keywords: [
    // Company Identity
    "amusement ride manufacturer",
    "amusement equipment manufacturer",
    "theme park supplier",
    "carnival equipment manufacturer",
    "ride manufacturer China",
    "international ride supplier",
    
    // Quality & Safety
    "factory tested safety",
    "safety tested rides",
    "certified amusement rides",
    "quality amusement equipment",
    "reliable ride manufacturer",
    "trusted ride supplier",
    
    // Compliance & Standards
    "ride compliance",
    "EN 13814",
    "EN 13814 compliant",
    "ASTM F24",
    "ASTM F24 certified",
    "safety standards compliance",
    "ride certification",
    "international safety standards",
    
    // Capabilities
    "global delivery",
    "worldwide shipping",
    "factory visit",
    "verified factory",
    "experienced manufacturer",
    "professional ride manufacturer",
    
    // Services
    "ride refurbishment",
    "ride consulting",
    "custom ride manufacturing",
    "ride assembly service",
    
    // Long-tail Keywords
    "certified amusement ride manufacturer",
    "EN 13814 compliant ride manufacturer",
    "factory tested amusement rides",
    "reliable theme park equipment supplier",
    "international amusement ride exporter",
    "verified ride manufacturer with factory visits",
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

