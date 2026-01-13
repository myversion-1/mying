import { NextRequest, NextResponse } from "next/server";
import { verifyAdminAuth } from "@/lib/auth";

/**
 * Verify admin authentication
 * Used by client-side to check if stored password is still valid
 */
export async function POST(request: NextRequest) {
  const isAuthenticated = verifyAdminAuth(request);
  
  if (!isAuthenticated) {
    return NextResponse.json(
      { authenticated: false, error: "Invalid password" },
      { status: 401 }
    );
  }

  return NextResponse.json(
    { authenticated: true },
    { status: 200 }
  );
}
















