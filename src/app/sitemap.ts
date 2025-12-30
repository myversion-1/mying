import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://mying.vercel.app";
  
  // Main routes
  const mainRoutes = [
    "",
    "/about",
    "/services",
    "/products",
    "/contact",
    "/visit",
  ];

  // Language variants
  const languages = ["en", "zh", "ar", "ru", "ja", "ko", "th", "vi", "id", "hi", "es"];
  
  // Generate sitemap entries
  const entries: MetadataRoute.Sitemap = [];

  // Add main routes - create separate entries for each language
  mainRoutes.forEach((route) => {
    languages.forEach((lang) => {
      // Map language codes
      const langCodeMap: Record<string, string> = {
        en: "en-US",
        zh: "zh-CN",
        ar: "ar-SA",
        ru: "ru-RU",
        ja: "ja-JP",
        ko: "ko-KR",
        th: "th-TH",
        vi: "vi-VN",
        id: "id-ID",
        hi: "hi-IN",
        es: "es-ES",
      };

      const isDefault = lang === "en";
      
      // Build URL - always use ? for query parameter (routes don't have existing params)
      const langUrl = isDefault 
        ? `${baseUrl}${route}`
        : `${baseUrl}${route}?lang=${lang}`;

      entries.push({
        url: langUrl,
        lastModified: new Date(),
        changeFrequency: route === "" ? "weekly" : "monthly",
        priority: route === "" ? 1 : 0.8,
      });
    });
  });

  return entries;
}

