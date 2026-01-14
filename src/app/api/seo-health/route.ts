/**
 * SEO Health Check API Endpoint
 * GET /api/seo-health
 * 
 * Query parameters:
 * - domain: Domain to check (default: https://www.miyingrides.com)
 * - pages: Comma-separated list of pages to check (optional)
 * - includeThirdParty: Include third-party API data (default: false)
 */

import { NextRequest, NextResponse } from "next/server";
import { runSEOHealthCheck } from "@/lib/seo-health-checker";
import { fetchAllThirdPartyData } from "@/lib/seo-third-party-apis";
import type { SEOHealthReport } from "@/lib/seo-health-checker";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const domain = searchParams.get("domain") || "https://www.miyingrides.com";
    const pagesParam = searchParams.get("pages");
    const includeThirdParty = searchParams.get("includeThirdParty") === "true";
    
    const samplePages = pagesParam
      ? pagesParam.split(",").map((p) => p.trim())
      : [
          "/",
          "/products",
          "/about",
          "/contact",
        ];
    
    // Run SEO health check
    const report = await runSEOHealthCheck(domain, samplePages);
    
    // Fetch third-party data if requested
    if (includeThirdParty) {
      try {
        const thirdPartyData = await fetchAllThirdPartyData(domain);
        report.thirdParty = thirdPartyData;
      } catch (error) {
        console.error("Error fetching third-party data:", error);
        // Continue without third-party data
      }
    }
    
    return NextResponse.json(report, {
      status: 200,
      headers: {
        "Cache-Control": "no-store, no-cache, must-revalidate",
      },
    });
  } catch (error) {
    console.error("SEO health check error:", error);
    return NextResponse.json(
      {
        error: "Failed to run SEO health check",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}


