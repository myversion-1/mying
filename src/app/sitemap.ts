import { MetadataRoute } from "next";
import { productsMultilingual } from "../content/products_multilingual";
import { getMainCategories } from "../content/product-categories";

/**
 * Generate slug from product name (English version)
 */
function generateProductSlug(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "") // Remove special characters
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/-+/g, "-") // Replace multiple hyphens with single
    .replace(/^-|-$/g, ""); // Remove leading/trailing hyphens
}

/**
 * Get all product slugs
 */
function getAllProductSlugs(): string[] {
  return productsMultilingual.map((p) => generateProductSlug(p.name.en));
}

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://mying.vercel.app";
  
  // Main routes
  const mainRoutes = [
    {
      path: "",
      priority: 1,
      changeFrequency: "weekly" as const,
    },
    {
      path: "/products",
      priority: 0.9,
      changeFrequency: "weekly" as const,
    },
    {
      path: "/products/compare",
      priority: 0.7,
      changeFrequency: "monthly" as const,
    },
    {
      path: "/services",
      priority: 0.8,
      changeFrequency: "monthly" as const,
    },
    {
      path: "/cases",
      priority: 0.8,
      changeFrequency: "monthly" as const,
    },
    {
      path: "/resources",
      priority: 0.8,
      changeFrequency: "monthly" as const,
    },
    {
      path: "/glossary",
      priority: 0.7,
      changeFrequency: "monthly" as const,
    },
    {
      path: "/faq",
      priority: 0.7,
      changeFrequency: "monthly" as const,
    },
    {
      path: "/about",
      priority: 0.7,
      changeFrequency: "monthly" as const,
    },
    {
      path: "/blog",
      priority: 0.7,
      changeFrequency: "weekly" as const,
    },
    {
      path: "/contact",
      priority: 0.6,
      changeFrequency: "monthly" as const,
    },
    {
      path: "/visit",
      priority: 0.6,
      changeFrequency: "monthly" as const,
    },
  ];

  // Language variants
  const languages = ["en", "zh", "ar", "ru", "ja", "ko", "th", "vi", "id", "hi", "es"];
  
  // Generate sitemap entries
  const entries: MetadataRoute.Sitemap = [];

  // Add main routes - create separate entries for each language
  mainRoutes.forEach((route) => {
    languages.forEach((lang) => {
      const isDefault = lang === "en";
      
      // Build URL - always use ? for query parameter (routes don't have existing params)
      const langUrl = isDefault 
        ? `${baseUrl}${route.path}`
        : `${baseUrl}${route.path}?lang=${lang}`;

      entries.push({
        url: langUrl,
        lastModified: new Date(),
        changeFrequency: route.changeFrequency,
        priority: route.priority,
      });
    });
  });

  // Add product pages - create separate entries for each language
  const productSlugs = getAllProductSlugs();
  productSlugs.forEach((slug) => {
    languages.forEach((lang) => {
      const isDefault = lang === "en";
      const productUrl = isDefault
        ? `${baseUrl}/products/${slug}`
        : `${baseUrl}/products/${slug}?lang=${lang}`;

      entries.push({
        url: productUrl,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.7, // Slightly lower than main pages but still important
      });
    });
  });

  // Add category pages
  const mainCategories = getMainCategories();
  mainCategories.forEach((category) => {
    const categorySlug = category.toLowerCase().replace(/\s+/g, "-");
    languages.forEach((lang) => {
      const isDefault = lang === "en";
      const categoryUrl = isDefault
        ? `${baseUrl}/products/category/${categorySlug}`
        : `${baseUrl}/products/category/${categorySlug}?lang=${lang}`;

      entries.push({
        url: categoryUrl,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.8,
      });
    });
  });

  return entries;
}

