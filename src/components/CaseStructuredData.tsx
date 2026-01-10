import type { CaseItem } from "../content/types/case";

interface CaseStructuredDataProps {
  caseItem: CaseItem;
  lang: string;
  caseUrl: string;
  baseUrl?: string;
}

/**
 * CaseStudy Structured Data (JSON-LD)
 * Automatically generates Schema.org CaseStudy markup for SEO
 * 
 * Requirements:
 * - CaseStudy Schema with all required fields
 * - BreadcrumbList Schema for navigation
 * - Location information (Place Schema)
 * - All URLs use absolute paths
 * - Multi-language support
 */
export function CaseStructuredData({
  caseItem,
  lang,
  caseUrl,
  baseUrl = typeof window !== "undefined"
    ? window.location.origin
    : "https://mying.vercel.app",
}: CaseStructuredDataProps) {
  // Get localized content
  const title = caseItem.titleEn || caseItem.titleZh || caseItem.title;
  const description =
    caseItem.descriptionEn || caseItem.descriptionZh || caseItem.description || "";
  const city = caseItem.cityEn || caseItem.cityZh || caseItem.city || "";

  // Build CaseStudy schema
  const caseStudySchema = {
    "@context": "https://schema.org",
    "@type": "CaseStudy",
    name: title,
    description: description,
    datePublished: caseItem.datePublished || caseItem.year || new Date().toISOString(),
    author: {
      "@type": "Organization",
      name: "Miying Amusement Equipment",
      url: baseUrl,
    },
    publisher: {
      "@type": "Organization",
      name: "Miying Amusement Equipment",
      logo: {
        "@type": "ImageObject",
        url: `${baseUrl}/logo.jpg`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": caseUrl,
    },
    image: caseItem.image
      ? `${baseUrl}${caseItem.image}`
      : `${baseUrl}/logo.jpg`,
    ...(caseItem.completionPhotos && caseItem.completionPhotos.length > 0 && {
      image: [
        caseItem.image ? `${baseUrl}${caseItem.image}` : `${baseUrl}/logo.jpg`,
        ...caseItem.completionPhotos.map((photo) => `${baseUrl}${photo}`),
      ],
    }),
    location: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressCountry: caseItem.countryCode || caseItem.country,
        ...(city && { addressLocality: city }),
      },
      ...(caseItem.coordinates && {
        geo: {
          "@type": "GeoCoordinates",
          latitude: caseItem.coordinates.latitude,
          longitude: caseItem.coordinates.longitude,
        },
      }),
    },
    // Additional properties for case study details
    ...(caseItem.clientPainPoints && {
      about: {
        "@type": "Thing",
        name: "Client Challenges",
        description:
          typeof caseItem.clientPainPoints === "string"
            ? caseItem.clientPainPoints
            : caseItem.clientPainPoints[lang] ||
              caseItem.clientPainPoints.en ||
              "",
      },
    }),
    ...(caseItem.solution && {
      solution: {
        "@type": "Thing",
        name: "Solution",
        description:
          typeof caseItem.solution === "string"
            ? caseItem.solution
            : caseItem.solution[lang] || caseItem.solution.en || "",
      },
    }),
    // Safety compliance information
    ...(caseItem.safetyCompliance && {
      additionalProperty: caseItem.safetyCompliance.standards.map((standard) => ({
        "@type": "PropertyValue",
        name: "Safety Standard",
        value: standard,
      })),
    }),
  };

  // Breadcrumb schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: lang === "zh" ? "首页" : "Home",
        item: baseUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: lang === "zh" ? "案例" : "Cases",
        item: `${baseUrl}/cases`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: title,
        item: caseUrl,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(caseStudySchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    </>
  );
}






