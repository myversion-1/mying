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
    // Default (English) version
    entries.push({
      url: `${baseUrl}${route}`,
      lastModified: new Date(),
      changeFrequency: route === "" ? "weekly" : "monthly",
      priority: route === "" ? 1 : 0.8,
      alternates: {
        languages: Object.fromEntries(
          languages.map((lang) => [
            lang === "en" ? "en-US" : 
            lang === "zh" ? "zh-CN" :
            lang === "ar" ? "ar-SA" :
            lang === "ru" ? "ru-RU" :
            lang === "ja" ? "ja-JP" :
            lang === "ko" ? "ko-KR" :
            lang === "th" ? "th-TH" :
            lang === "vi" ? "vi-VN" :
            lang === "id" ? "id-ID" :
            lang === "hi" ? "hi-IN" :
            "es-ES",
            `${baseUrl}${route}${route === "" ? "?" : "&"}lang=${lang}`
          ])
        ),
      },
    });
  });

  return entries;
}

