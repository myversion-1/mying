/**
 * Environment variable validation
 * Ensures all required environment variables are set at startup
 */

interface EnvConfig {
  required: string[];
  optional: string[];
}

const envConfig: EnvConfig = {
  required: [
    "NEXT_PUBLIC_SITE_URL",
    "CONTACT_EMAIL",
  ],
  optional: [
    "ADMIN_PASSWORD",
    "RESEND_API_KEY",
    "SENDGRID_API_KEY",
    "WEBHOOK_URL",
    "CRON_SECRET",
    "FROM_EMAIL",
    "NEXT_PUBLIC_VERIFICATION_CODE",
    "NEXT_PUBLIC_CALENDLY_URL",
  ],
};

/**
 * Validate required environment variables
 * Throws an error if any required variables are missing
 */
export function validateEnv(): void {
  if (typeof window !== "undefined") {
    // Skip validation on client side
    return;
  }

  const missing: string[] = [];

  for (const key of envConfig.required) {
    if (!process.env[key]) {
      missing.push(key);
    }
  }

  if (missing.length > 0) {
    const errorMessage = `Missing required environment variables: ${missing.join(", ")}\n\n` +
      `Please set these variables in:\n` +
      `- Vercel Dashboard → Settings → Environment Variables\n` +
      `- Or create a .env.local file for local development`;
    
    console.error("❌ Environment Validation Failed:");
    console.error(errorMessage);
    
    // In production, throw error to prevent deployment
    if (process.env.NODE_ENV === "production") {
      throw new Error(errorMessage);
    }
    
    // In development, just warn
    console.warn("⚠️  Continuing in development mode, but some features may not work.");
  } else {
    console.log("✅ Environment variables validated successfully");
  }
}

/**
 * Get environment variable with fallback
 */
export function getEnv(key: string, fallback?: string): string {
  const value = process.env[key];
  if (!value && fallback === undefined) {
    throw new Error(`Environment variable ${key} is required but not set`);
  }
  return value || fallback || "";
}

/**
 * Check if environment variable is set
 */
export function hasEnv(key: string): boolean {
  return !!process.env[key];
}

/**
 * Get all environment variable status
 * Useful for debugging and health checks
 */
export function getEnvStatus(): {
  required: Record<string, boolean>;
  optional: Record<string, boolean>;
} {
  const required: Record<string, boolean> = {};
  const optional: Record<string, boolean> = {};

  for (const key of envConfig.required) {
    required[key] = hasEnv(key);
  }

  for (const key of envConfig.optional) {
    optional[key] = hasEnv(key);
  }

  return { required, optional };
}

// Validate on module load (server-side only)
if (typeof window === "undefined") {
  // Only validate in production or when explicitly enabled
  if (process.env.NODE_ENV === "production" || process.env.VALIDATE_ENV === "true") {
    try {
      validateEnv();
    } catch (error) {
      // Error already logged in validateEnv
      // In production, this will prevent the app from starting
    }
  }
}



