import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Amusement Industry Glossary | Key Terms & Definitions - Miying",
  description:
    "Comprehensive glossary of amusement industry terms including ASTM F24, CE marking, FEC, capacity factor, and more. Understand key terminology for informed decision-making.",
  keywords: [
    "amusement industry glossary",
    "amusement ride terminology",
    "FEC definition",
    "ASTM F24",
    "CE marking",
    "amusement park terms",
    "ride industry vocabulary",
    "theme park glossary",
  ],
  openGraph: {
    title: "Amusement Industry Glossary | Key Terms & Definitions - Miying",
    description:
      "Comprehensive glossary of amusement industry terms including ASTM F24, CE marking, FEC, capacity factor, and more.",
    url: "/glossary",
  },
  alternates: {
    canonical: "/glossary",
  },
};

export default function GlossaryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

