import type { Metadata } from "next";
import { StructuredDataServer } from "../../components/StructuredDataServer";

export const metadata: Metadata = {
  title: "Factory Visit - Verified Client Booking",
  description:
    "Schedule a verified factory visit to see our amusement rides manufacturing process. Request verification and get a one-time code to unlock booking.",
  keywords: [
    // Core Visit Keywords
    "factory visit",
    "factory tour",
    "amusement ride factory tour",
    "ride factory visit",
    "manufacturing facility tour",
    
    // Verification & Booking
    "verified factory visit",
    "factory visit booking",
    "book factory tour",
    "schedule factory visit",
    "factory visit verification",
    "one-time visit code",
    
    // Manufacturing Focus
    "ride manufacturing tour",
    "amusement ride manufacturing",
    "see ride production",
    "factory inspection",
    "quality control tour",
    
    // Business Terms
    "factory booking",
    "visit request",
    "tour booking",
    "verified client visit",
    "exclusive factory access",
    
    // Long-tail Keywords
    "how to visit amusement ride factory",
    "verified factory visit booking",
    "schedule ride factory tour",
    "book verified factory visit",
    "amusement ride manufacturing facility tour",
    "one-time code factory visit",
  ],
  openGraph: {
    title: "Factory Visit - Verified Client Booking | Miying Rides",
    description:
      "Schedule a verified factory visit to see our amusement rides manufacturing process.",
    url: "/visit",
  },
  alternates: {
    canonical: "/visit",
  },
};

export default function VisitLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <StructuredDataServer type="visit" />
      {children}
    </>
  );
}



