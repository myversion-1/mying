import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Get Amusement Ride Quote | Request Pricing & Specifications | 24h Response",
  description:
    "Get instant quote for amusement rides & theme park equipment. Request pricing, technical specifications & delivery timelines. For FECs, theme parks & entertainment centers. 24-hour response.",
  keywords: [
    "request quote",
    "amusement ride quote",
    "theme park equipment pricing",
    "ride manufacturer quote",
    "get pricing",
    "quote request",
    "amusement equipment pricing",
    "custom ride quote",
  ],
  openGraph: {
    title: "Request a Quote - Get Pricing for Your Project | Miying Rides",
    description:
      "Request a detailed quote for amusement rides and equipment. Get pricing, specifications, and delivery timelines for your project.",
    url: "/quote",
  },
  alternates: {
    canonical: "/quote",
  },
};

export default function QuoteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

















