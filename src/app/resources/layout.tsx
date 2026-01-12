import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "B2B Resources | Equipment Guides & Downloads - Miying",
  description:
    "Download free B2B resources: Equipment Selection Guide, Safety Certification Checklist, ROI Calculator, Maintenance Templates, and Park Layout Planning Guide.",
  keywords: [
    "amusement equipment resources",
    "B2B downloads",
    "equipment selection guide",
    "safety certification checklist",
    "ROI calculator",
    "maintenance templates",
    "park planning guide",
    "amusement ride resources",
  ],
  openGraph: {
    title: "B2B Resources | Equipment Guides & Downloads - Miying",
    description:
      "Download free B2B resources: Equipment Selection Guide, Safety Certification Checklist, ROI Calculator, Maintenance Templates, and Park Layout Planning Guide.",
    url: "/resources",
  },
  alternates: {
    canonical: "/resources",
  },
};

export default function ResourcesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

