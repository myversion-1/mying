import type { Metadata } from "next";
import { StructuredDataServer } from "../../components/StructuredDataServer";
import { getServices } from "../../content/copy";

export const metadata: Metadata = {
  title: "Services - Consulting, Sourcing & Refurbishment",
  description:
    "Professional services for amusement rides: purchasing support, consulting, appraisal, refurbishment, assembly & installation, and attraction rentals.",
  keywords: [
    "ride consulting",
    "ride sourcing",
    "ride refurbishment",
    "ride assembly",
    "attraction rentals",
    "ride appraisal",
    "amusement ride services",
    "theme park consulting",
    "amusement equipment services",
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

