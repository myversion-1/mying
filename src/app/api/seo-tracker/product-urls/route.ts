import { NextRequest, NextResponse } from "next/server";
import { productsMultilingual } from "@/content/products_multilingual";
import { SUPPORTED_LANGUAGES } from "@/utils/hreflang";
import { verifyAdminAuth, createUnauthorizedResponse } from "@/lib/auth";
import { CachePresets } from "@/lib/cache";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://mying.vercel.app";

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

export async function GET(request: NextRequest) {
  // Verify admin authentication
  if (!verifyAdminAuth(request)) {
    return createUnauthorizedResponse();
  }

  try {
    const productSlugs = getAllProductSlugs();
    const productUrls = productSlugs.flatMap((slug) =>
      SUPPORTED_LANGUAGES.map((lang) => {
        const url =
          lang === "en"
            ? `${BASE_URL}/products/${slug}`
            : `${BASE_URL}/products/${slug}?lang=${lang}`;
        return { url, label: `${slug} (${lang})`, slug, lang: lang };
      })
    );

    return NextResponse.json(
      { productUrls },
      {
        status: 200,
        headers: {
          "Cache-Control": CachePresets.static(),
        },
      }
    );
  } catch (error: unknown) {
    console.error("Error fetching product URLs:", error);
    return NextResponse.json(
      { error: "Failed to fetch product URLs" },
      { status: 500 }
    );
  }
}


