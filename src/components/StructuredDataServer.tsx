import type { Lang } from "./language";

type StructuredDataProps = {
  lang?: Lang;
  type?: "home" | "products" | "services" | "contact" | "about" | "visit";
  products?: Array<{
    name: string;
    category: string;
    image?: string;
    description?: string;
  }>;
  services?: Array<{
    title: string;
    desc: string;
  }>;
};

export function StructuredDataServer({
  lang = "en",
  type = "home",
  products = [],
  services = [],
}: StructuredDataProps) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://mying.vercel.app";

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
      addressLocality: "China",
    },
  };

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${baseUrl}#organization`,
    name: "Miying Amusement Equipment",
    image: `${baseUrl}/logo.jpg`,
    url: baseUrl,
    telephone: "+86-131-1295-9561",
    email: "miyingyoule@gmail.com",
    address: {
      "@type": "PostalAddress",
      addressCountry: "CN",
      addressLocality: "China",
    },
    priceRange: "$$",
    servesCuisine: false,
    areaServed: "Worldwide",
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

  // Product schemas
  const productSchemas = products.map((product) => ({
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description || `${product.name} - ${product.category} amusement ride`,
    category: product.category,
    image: product.image ? `${baseUrl}${product.image}` : `${baseUrl}/logo.jpg`,
    brand: {
      "@type": "Brand",
      name: "Miying Amusement Equipment",
    },
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      priceCurrency: "USD",
      url: `${baseUrl}/products`,
    },
  }));

  // Service schemas
  const serviceSchemas = services.map((service) => ({
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.desc,
    provider: {
      "@type": "Organization",
      name: "Miying Amusement Equipment",
    },
    areaServed: "Worldwide",
    serviceType: "Amusement Ride Services",
  }));

  // Breadcrumb schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: getBreadcrumbs(type, baseUrl),
  };

  const schemas = [
    organizationSchema,
    localBusinessSchema,
    websiteSchema,
    breadcrumbSchema,
    ...productSchemas,
    ...serviceSchemas,
  ];

  return (
    <>
      {schemas.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}

function getBreadcrumbs(
  type: StructuredDataProps["type"],
  baseUrl: string
): Array<{
  "@type": "ListItem";
  position: number;
  name: string;
  item: string;
}> {
  const breadcrumbs = [
    {
      "@type": "ListItem" as const,
      position: 1,
      name: "Home",
      item: baseUrl,
    },
  ];

  switch (type) {
    case "products":
      breadcrumbs.push({
        "@type": "ListItem" as const,
        position: 2,
        name: "Products",
        item: `${baseUrl}/products`,
      });
      break;
    case "services":
      breadcrumbs.push({
        "@type": "ListItem" as const,
        position: 2,
        name: "Services",
        item: `${baseUrl}/services`,
      });
      break;
    case "contact":
      breadcrumbs.push({
        "@type": "ListItem" as const,
        position: 2,
        name: "Contact",
        item: `${baseUrl}/contact`,
      });
      break;
    case "about":
      breadcrumbs.push({
        "@type": "ListItem" as const,
        position: 2,
        name: "About",
        item: `${baseUrl}/about`,
      });
      break;
    case "visit":
      breadcrumbs.push({
        "@type": "ListItem" as const,
        position: 2,
        name: "Factory Visit",
        item: `${baseUrl}/visit`,
      });
      break;
  }

  return breadcrumbs;
}



