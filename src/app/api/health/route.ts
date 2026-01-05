import { NextResponse } from "next/server";
import { getEnvStatus } from "@/lib/env";
import { CachePresets } from "@/lib/cache";

/**
 * Health check endpoint
 * Used for monitoring and load balancer health checks
 * Accessible at /api/health
 */
export async function GET() {
  const envStatus = getEnvStatus();
  const allRequiredEnvSet = Object.values(envStatus.required).every(Boolean);

  return NextResponse.json(
    {
      status: allRequiredEnvSet ? "ok" : "degraded",
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      environment: process.env.NODE_ENV,
      version: process.env.npm_package_version || "0.1.0",
      env: {
        required: envStatus.required,
        optional: envStatus.optional,
      },
    },
    {
      headers: {
        "Cache-Control": CachePresets.dynamic(), // Health check should be fresh
      },
    }
  );
}

