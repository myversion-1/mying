import { NextRequest, NextResponse } from "next/server";
import { checkBacklink } from "@/lib/backlink-checker";
import { updateBacklink, getBacklinkById } from "@/lib/seo-tracker-storage";

// POST - Check a single backlink
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, externalUrl, targetUrl } = body;

    // If ID is provided, fetch from storage
    if (id) {
      const backlink = await getBacklinkById(id);
      if (!backlink) {
        return NextResponse.json(
          { error: "Backlink not found" },
          { status: 404 }
        );
      }
      
      // Check the backlink
      const result = await checkBacklink(backlink.externalUrl, backlink.targetUrl);
      
      // Update the backlink with results
      const updated = await updateBacklink(id, {
        status: result.status,
        linkType: result.linkType,
        anchorText: result.anchorText,
      });
      
      return NextResponse.json({ 
        backlink: updated,
        checkResult: result 
      }, { status: 200 });
    }
    
    // If externalUrl and targetUrl are provided directly
    if (!externalUrl || !targetUrl) {
      return NextResponse.json(
        { error: "Missing required fields: id or (externalUrl and targetUrl)" },
        { status: 400 }
      );
    }
    
    const result = await checkBacklink(externalUrl, targetUrl);
    
    return NextResponse.json({ checkResult: result }, { status: 200 });
  } catch (error: any) {
    console.error("Error checking backlink:", error);
    return NextResponse.json(
      { error: "Failed to check backlink", details: error.message },
      { status: 500 }
    );
  }
}

