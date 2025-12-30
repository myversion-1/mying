import type { Metadata } from "next";
import { StructuredDataServer } from "../../components/StructuredDataServer";

export const metadata: Metadata = {
  title: "Factory Visit - Verified Client Booking",
  description:
    "Schedule a verified factory visit to see our amusement rides manufacturing process. Request verification and get a one-time code to unlock booking.",
  keywords: [
    "factory visit",
    "amusement ride factory tour",
    "verified factory visit",
    "ride manufacturing tour",
    "factory booking",
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


