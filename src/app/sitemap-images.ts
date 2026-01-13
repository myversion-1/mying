import { MetadataRoute } from "next";
import { productsMultilingual } from "../content/products_multilingual";

/**
 * Image Sitemap for SEO
 * Helps search engines discover and index product images
 * Accessible at /sitemap-images.xml
 */
export default function imagesSitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.miyingrides.com";
  
  const entries: MetadataRoute.Sitemap = [];

  // Add product images
  productsMultilingual.forEach((product) => {
    if (product.image) {
      const imageUrl = product.image.startsWith("http")
        ? product.image
        : `${baseUrl}${product.image.startsWith("/") ? product.image : `/${product.image}`}`;
      
      entries.push({
        url: imageUrl,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.6,
      });
    }
  });

  // Add logo and other important images
  entries.push({
    url: `${baseUrl}/logo.jpg`,
    lastModified: new Date(),
    changeFrequency: "yearly",
    priority: 0.5,
  });

  return entries;
}

