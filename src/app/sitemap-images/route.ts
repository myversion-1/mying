import { NextResponse } from "next/server";
import { productsMultilingual } from "../../content/products_multilingual";

/**
 * Image Sitemap API Route
 * Generates XML sitemap for images
 * Accessible at /sitemap-images (returns XML)
 */
export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.miyingrides.com";
  
  const imageUrls: string[] = [];

  // Add product images
  productsMultilingual.forEach((product) => {
    if (product.image) {
      const imageUrl = product.image.startsWith("http")
        ? product.image
        : `${baseUrl}${product.image.startsWith("/") ? product.image : `/${product.image}`}`;
      imageUrls.push(imageUrl);
    }
  });

  // Add logo and other important images
  imageUrls.push(`${baseUrl}/logo.jpg`);

  // Generate XML sitemap
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${imageUrls.map(url => `  <url>
    <loc>${url}</loc>
    <image:image>
      <image:loc>${url}</image:loc>
    </image:image>
  </url>`).join('\n')}
</urlset>`;

  return new NextResponse(xml, {
    status: 200,
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}

