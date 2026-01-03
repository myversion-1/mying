import { NextRequest, NextResponse } from "next/server";
import { getAllBacklinks, updateBacklink, updateLastCronRun } from "@/lib/seo-tracker-storage";
import { checkBacklink } from "@/lib/backlink-checker";

/**
 * Cron job endpoint to check all backlinks weekly
 * This should be called by Vercel Cron Jobs or similar service
 * 
 * To set up Vercel Cron:
 * 1. Create vercel.json with cron configuration
 * 2. Or use Vercel Dashboard → Settings → Cron Jobs
 */
export async function GET(request: NextRequest) {
  try {
    // Authentication check
    // Vercel Cron Jobs automatically send Authorization header
    // You can also manually trigger with CRON_SECRET
    const authHeader = request.headers.get("authorization");
    const cronSecret = process.env.CRON_SECRET;
    
    // If CRON_SECRET is set, require authentication
    // If not set, allow access (for development/testing)
    if (cronSecret) {
      if (!authHeader || authHeader !== `Bearer ${cronSecret}`) {
        return NextResponse.json(
          { error: "Unauthorized. Missing or invalid CRON_SECRET." },
          { status: 401 }
        );
      }
    }

    console.log("Starting weekly backlink check cron job...");
    
    const backlinks = await getAllBacklinks();
    const results = {
      total: backlinks.length,
      checked: 0,
      active: 0,
      lost: 0,
      noFollow: 0,
      errors: 0,
    };

    // Check each backlink
    for (const backlink of backlinks) {
      try {
        const result = await checkBacklink(backlink.externalUrl, backlink.targetUrl);
        
        await updateBacklink(backlink.id, {
          status: result.status,
          linkType: result.linkType,
          anchorText: result.anchorText,
        });
        
        results.checked++;
        
        if (result.status === "Active") {
          results.active++;
        } else if (result.status === "Lost") {
          results.lost++;
        } else if (result.status === "No-Follow") {
          results.noFollow++;
        }
      } catch (error: any) {
        console.error(`Error checking backlink ${backlink.id}:`, error);
        results.errors++;
      }
    }

    // Update last cron run time
    await updateLastCronRun();

    console.log("Cron job completed:", results);

    return NextResponse.json({
      success: true,
      message: "Weekly backlink check completed",
      results,
      timestamp: new Date().toISOString(),
    }, { status: 200 });
  } catch (error: any) {
    console.error("Cron job error:", error);
    return NextResponse.json(
      { 
        error: "Cron job failed",
        details: error.message 
      },
      { status: 500 }
    );
  }
}

// Also support POST for manual triggers
export async function POST(request: NextRequest) {
  return GET(request);
}

