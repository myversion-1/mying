import type { Metadata } from "next";
import { StructuredDataServer } from "../../components/StructuredDataServer";
import { getServices } from "../../content/copy";

export const metadata: Metadata = {
  title: "Amusement Ride Services | Consulting, Sourcing & Refurbishment | Get Quote",
  description:
    "Professional amusement ride services: consulting, sourcing, refurbishment, assembly & installation. For FECs, theme parks & entertainment centers. Request service consultation & pricing.",
  keywords: [
    // Core Service Keywords
    "amusement ride services",
    "theme park consulting",
    "amusement equipment services",
    "ride services",
    "attraction services",
    
    // Consulting Services
    "ride consulting",
    "theme park consulting",
    "amusement park consulting",
    "ride selection consulting",
    "park planning consulting",
    "ride feasibility study",
    
    // Sourcing Services
    "ride sourcing",
    "amusement ride sourcing",
    "equipment sourcing",
    "ride procurement",
    "ride purchasing support",
    "ride supplier selection",
    
    // Refurbishment & Maintenance
    "ride refurbishment",
    "amusement ride refurbishment",
    "ride restoration",
    "ride renovation",
    "ride maintenance",
    "ride repair service",
    "ride upgrade service",
    
    // Assembly & Installation
    "ride assembly",
    "ride installation",
    "ride assembly service",
    "ride installation service",
    "ride setup service",
    "ride commissioning",
    
    // Other Services
    "attraction rentals",
    "ride rentals",
    "ride appraisal",
    "ride valuation",
    "ride inspection",
    "ride certification",
    
    // Long-tail Keywords
    "professional ride consulting services",
    "where to refurbish amusement rides",
    "ride assembly and installation near me",
    "theme park equipment sourcing",
    "amusement ride maintenance service",
    "certified ride inspection",
  ],
  openGraph: {
    title: "Services - Consulting, Sourcing & Refurbishment | Miying Rides",
    description:
      "Professional services for amusement rides: purchasing support, consulting, appraisal, refurbishment, assembly & installation, and attraction rentals.",
    url: "/services",
  },
  alternates: {
    canonical: "/services",
  },
};

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const services = getServices("en"); // Use English for structured data
  const serviceData = services.map((s) => ({
    title: s.title,
    desc: s.desc,
  }));

  return (
    <>
      <StructuredDataServer type="services" services={serviceData} />
      {children}
    </>
  );
}

