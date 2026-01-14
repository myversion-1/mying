/**
 * SEO Health Report Export API
 * GET /api/seo-health/export
 * 
 * Query parameters:
 * - domain: Domain to check
 * - format: Export format (json, csv, html) - default: json
 * - includeThirdParty: Include third-party API data
 */

import { NextRequest, NextResponse } from "next/server";
import { runSEOHealthCheck } from "@/lib/seo-health-checker";
import { fetchAllThirdPartyData } from "@/lib/seo-third-party-apis";
import {
  generateCSVReport,
  generateHTMLReport,
  generateJSONReport,
} from "@/lib/seo-report-generator";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const domain = searchParams.get("domain") || "https://www.miyingrides.com";
    const format = searchParams.get("format") || "json";
    const includeThirdParty = searchParams.get("includeThirdParty") === "true";
    
    // Run SEO health check
    const report = await runSEOHealthCheck(domain);
    
    // Fetch third-party data if requested
    if (includeThirdParty) {
      try {
        const thirdPartyData = await fetchAllThirdPartyData(domain);
        report.thirdParty = thirdPartyData;
      } catch (error) {
        console.error("Error fetching third-party data:", error);
      }
    }
    
    // Generate report based on format
    let content: string;
    let contentType: string;
    let filename: string;
    
    switch (format.toLowerCase()) {
      case "csv":
        content = generateCSVReport(report);
        contentType = "text/csv";
        filename = `seo-health-report-${domain.replace(/https?:\/\//, "").replace(/\//g, "-")}-${new Date().toISOString().split("T")[0]}.csv`;
        break;
      case "html":
        content = generateHTMLReport(report);
        contentType = "text/html";
        filename = `seo-health-report-${domain.replace(/https?:\/\//, "").replace(/\//g, "-")}-${new Date().toISOString().split("T")[0]}.html`;
        break;
      case "json":
      default:
        content = generateJSONReport(report);
        contentType = "application/json";
        filename = `seo-health-report-${domain.replace(/https?:\/\//, "").replace(/\//g, "-")}-${new Date().toISOString().split("T")[0]}.json`;
        break;
    }
    
    return new NextResponse(content, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Content-Disposition": `attachment; filename="${filename}"`,
        "Cache-Control": "no-store, no-cache, must-revalidate",
      },
    });
  } catch (error) {
    console.error("SEO health report export error:", error);
    return NextResponse.json(
      {
        error: "Failed to generate SEO health report",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

