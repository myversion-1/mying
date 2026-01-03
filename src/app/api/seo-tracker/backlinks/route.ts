import { NextRequest, NextResponse } from "next/server";
import {
  getAllBacklinks,
  createBacklink,
  updateBacklink,
  deleteBacklink,
  type Backlink,
} from "@/lib/seo-tracker-storage";

// GET - Get all backlinks
export async function GET() {
  try {
    const backlinks = await getAllBacklinks();
    return NextResponse.json({ backlinks }, { status: 200 });
  } catch (error: any) {
    console.error("Error fetching backlinks:", error);
    return NextResponse.json(
      { error: "Failed to fetch backlinks" },
      { status: 500 }
    );
  }
}

// POST - Create new backlink
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { externalUrl, targetUrl, language, notes } = body;

    // Validate required fields
    if (!externalUrl || !targetUrl || !language) {
      return NextResponse.json(
        { error: "Missing required fields: externalUrl, targetUrl, language" },
        { status: 400 }
      );
    }

    const newBacklink = await createBacklink({
      externalUrl,
      targetUrl,
      language,
      status: "Pending",
      notes,
    });

    return NextResponse.json({ backlink: newBacklink }, { status: 201 });
  } catch (error: any) {
    console.error("Error creating backlink:", error);
    return NextResponse.json(
      { error: "Failed to create backlink" },
      { status: 500 }
    );
  }
}

// PUT - Update backlink
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, ...updates } = body;

    if (!id) {
      return NextResponse.json(
        { error: "Missing required field: id" },
        { status: 400 }
      );
    }

    const updatedBacklink = await updateBacklink(id, updates);

    if (!updatedBacklink) {
      return NextResponse.json(
        { error: "Backlink not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ backlink: updatedBacklink }, { status: 200 });
  } catch (error: any) {
    console.error("Error updating backlink:", error);
    return NextResponse.json(
      { error: "Failed to update backlink" },
      { status: 500 }
    );
  }
}

// DELETE - Delete backlink
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Missing required parameter: id" },
        { status: 400 }
      );
    }

    const deleted = await deleteBacklink(id);

    if (!deleted) {
      return NextResponse.json(
        { error: "Backlink not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error: any) {
    console.error("Error deleting backlink:", error);
    return NextResponse.json(
      { error: "Failed to delete backlink" },
      { status: 500 }
    );
  }
}

