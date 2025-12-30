import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us - Get a Quote for Your Project",
  description:
    "Contact Miying for amusement ride quotes, project consultations, and factory visit requests. We respond with options, timelines, and next steps.",
  keywords: [
    // Contact Intent
    "contact amusement ride manufacturer",
    "contact ride supplier",
    "amusement equipment inquiry",
    "ride manufacturer contact",
    "theme park equipment inquiry",
    
    // Quote & Consultation
    "ride quote",
    "amusement ride quote",
    "ride price quote",
    "equipment quote",
    "project consultation",
    "ride consultation",
    "free consultation",
    "project inquiry",
    
    // Factory Visit
    "factory visit",
    "factory tour",
    "visit ride factory",
    "factory visit booking",
    "verified factory visit",
    
    // Business Terms
    "request quote",
    "get quote",
    "inquiry form",
    "contact form",
    "sales inquiry",
    "business inquiry",
    
    // Long-tail Keywords
    "how to contact amusement ride manufacturer",
    "request amusement ride quote",
    "schedule factory visit",
    "get free ride consultation",
    "amusement equipment inquiry form",
    "contact ride supplier for quote",
  ],
  openGraph: {
    title: "Contact Us - Get a Quote for Your Project | Miying Rides",
    description:
      "Contact Miying for amusement ride quotes, project consultations, and factory visit requests.",
    url: "/contact",
  },
  alternates: {
    canonical: "/contact",
  },
};

import { StructuredDataServer } from "../../components/StructuredDataServer";

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <StructuredDataServer type="contact" />
      {children}
    </>
  );
}

