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

  // Add main routes with language variants
  mainRoutes.forEach((route) => {
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

    // Build language alternates
    const languageAlternates: Record<string, string> = {};
    languages.forEach((lang) => {
      const langCode = langCodeMap[lang] || lang;
      const langUrl = `${baseUrl}${route}${route === "" ? "?" : "&"}lang=${lang}`;
      languageAlternates[langCode] = langUrl;
    });

    // Default (English) version
    entries.push({
      url: `${baseUrl}${route}`,
      lastModified: new Date(),
      changeFrequency: route === "" ? "weekly" : "monthly",
      priority: route === "" ? 1 : 0.8,
      alternates: {
        languages: languageAlternates,
      },
    });
  });

  return entries;
}

