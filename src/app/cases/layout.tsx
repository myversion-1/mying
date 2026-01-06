import type { Metadata } from "next";
import { StructuredDataServer } from "../../components/StructuredDataServer";

export const metadata: Metadata = {
  title: "Case Studies - Successful Projects Worldwide | Miying Rides",
  description:
    "Explore our successful amusement ride projects around the world. From theme parks to family entertainment centers, see how we help clients achieve their goals.",
  keywords: [
    "amusement ride cases",
    "theme park projects",
    "FEC projects",
    "water park installations",
    "carnival ride projects",
    "amusement ride portfolio",
    "successful ride projects",
    "ride installation cases",
    "global ride projects",
    "amusement equipment cases",
  ],
  openGraph: {
    title: "Case Studies - Successful Projects Worldwide | Miying Rides",
    description:
      "Explore our successful amusement ride projects around the world. From theme parks to family entertainment centers, see how we help clients achieve their goals.",
    url: "/cases",
  },
  alternates: {
    canonical: "/cases",
  },
};

export default function CasesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <StructuredDataServer type="cases" />
      {children}
    </>
  );
}








