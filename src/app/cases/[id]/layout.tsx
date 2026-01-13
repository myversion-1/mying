import type { Metadata } from "next";
import { cases } from "../../../content/cases";
import { getLocalizedCase } from "../../../content/cases";
import { generateHreflangAlternates } from "../../../utils/hreflang";

interface CaseLayoutProps {
  params: Promise<{
    id: string;
  }>;
  children: React.ReactNode;
}

// Helper to get case by ID
function getCaseById(id: string) {
  return cases.find((c) => c.id === id || c.slug === id);
}

export async function generateMetadata({
  params,
}: CaseLayoutProps): Promise<Metadata> {
  const { id } = await params;
  const caseItem = getCaseById(id);

  if (!caseItem) {
    return {
      title: "Case Not Found | Miying Amusement",
    };
  }

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.miyingrides.com";
  const canonicalUrl = `${baseUrl}/cases/${id}`;

  // Get localized title and description
  const title = caseItem.titleEn || caseItem.titleZh || caseItem.title;
  const description =
    caseItem.descriptionEn ||
    caseItem.descriptionZh ||
    caseItem.description ||
    `${title} - Case Study by Miying Amusement Equipment`;

  return {
    title: `${title} - Case Study | Miying Amusement Equipment`,
    description: description,
    alternates: {
      canonical: canonicalUrl,
      ...generateHreflangAlternates(`/cases/${id}`, true),
    },
    openGraph: {
      title: `${title} - Case Study | Miying Amusement Equipment`,
      description: description,
      url: canonicalUrl,
      siteName: "Miying Amusement Equipment",
      images: caseItem.image
        ? [
            {
              url: `${baseUrl}${caseItem.image}`,
              width: 1200,
              height: 630,
              alt: title,
            },
          ]
        : [],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} - Case Study | Miying Amusement Equipment`,
      description: description,
      images: caseItem.image ? [`${baseUrl}${caseItem.image}`] : [],
    },
  };
}

export default function CaseLayout({ children }: CaseLayoutProps) {
  return <>{children}</>;
}

