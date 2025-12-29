import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us - Get a Quote for Your Project",
  description:
    "Contact Miying for amusement ride quotes, project consultations, and factory visit requests. We respond with options, timelines, and next steps.",
  keywords: [
    "contact amusement ride manufacturer",
    "ride quote",
    "project consultation",
    "factory visit",
    "amusement equipment inquiry",
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

