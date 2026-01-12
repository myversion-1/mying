import type { Metadata } from "next";
import { StructuredDataServer } from "../../components/StructuredDataServer";
import { getServices } from "../../content/copy";

export const metadata: Metadata = {
  title: "Amusement Ride Installation Services | Theme Park Equipment",
  description:
    "Comprehensive amusement park services: purchasing consultation, park planning, equipment appraisal, refurbishment. Expert guidance from concept to operation.",
  keywords: [
    "amusement park consulting services",
    "equipment solutions",
    "purchasing consultation",
    "park planning",
    "equipment appraisal",
    "refurbishment",
    "amusement ride services",
    "theme park consulting",
    "amusement equipment services",
    "ride services",
    "attraction services",
    "ride consulting",
    "amusement park consulting",
    "ride selection consulting",
    "park planning consulting",
    "ride feasibility study",
    "ride sourcing",
    "amusement ride sourcing",
    "equipment sourcing",
    "ride procurement",
    "ride purchasing support",
    "ride supplier selection",
    "ride refurbishment",
    "amusement ride refurbishment",
    "ride restoration",
    "ride renovation",
    "ride maintenance",
    "ride repair service",
    "ride upgrade service",
    "ride assembly",
    "ride installation",
    "ride assembly service",
    "ride installation service",
    "ride setup service",
    "ride commissioning",
    "attraction rentals",
    "ride rentals",
    "ride appraisal",
    "ride valuation",
    "ride inspection",
    "ride certification",
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

