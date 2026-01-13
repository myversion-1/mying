"use client";

import { useLanguage } from "./language";

export function StructuredData() {
  const { lang } = useLanguage();
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.miyingrides.com";

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Miying Amusement Equipment",
    url: baseUrl,
    logo: `${baseUrl}/logo.jpg`,
    description:
      "Miying delivers amusement rides worldwide with factory-tested safety, consulting, refurbishment, and verified factory visits.",
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+86-131-1295-9561",
      contactType: "Customer Service",
      email: "miyingyoule@gmail.com",
      availableLanguage: ["en", "zh", "ar", "ru", "ja", "ko", "th", "vi", "id", "hi", "es"],
    },
    sameAs: [
      "https://www.tiktok.com/@miying_amusements",
      "https://www.youtube.com/@MiyingAmusementEquipment",
      "https://wa.me/8613112959561",
    ],
    address: {
      "@type": "PostalAddress",
      addressCountry: "CN",
    },
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Miying Rides",
    url: baseUrl,
    description:
      "Miying delivers amusement rides worldwide with factory-tested safety, consulting, refurbishment, and verified factory visits.",
    inLanguage: lang,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${baseUrl}/products?search={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
    </>
  );
}

