import { NextResponse } from "next/server";
import { getAllProductSlugs } from "@/content/products_multilingual";
import { SUPPORTED_LANGUAGES } from "@/utils/hreflang";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://mying.vercel.app";

export async function GET() {
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

    return NextResponse.json({ productUrls }, { status: 200 });
  } catch (error: any) {
    console.error("Error fetching product URLs:", error);
    return NextResponse.json(
      { error: "Failed to fetch product URLs" },
      { status: 500 }
    );
  }
}

