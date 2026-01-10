/**
 * Simple in-memory rate limiting
 * Suitable for small to medium scale applications
 * For production at scale, consider using Redis-based solutions
 */

interface RateLimitRecord {
  count: number;
  resetTime: number;
}

const requestCounts = new Map<string, RateLimitRecord>();

const RATE_LIMIT = {
  maxRequests: 5,
  windowMs: 60 * 60 * 1000, // 1 hour
};

export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  resetTime: number;
}

/**
 * Check rate limit for an identifier (IP address, user ID, etc.)
 * @param identifier - Unique identifier for rate limiting (e.g., IP address)
 * @returns Rate limit result with allowed status, remaining requests, and reset time
 */
export function checkRateLimit(identifier: string): RateLimitResult {
  const now = Date.now();
  const record = requestCounts.get(identifier);

  // No record or window expired - create new record
  if (!record || now > record.resetTime) {
    const resetTime = now + RATE_LIMIT.windowMs;
    requestCounts.set(identifier, {
      count: 1,
      resetTime,
    });
    
    // Clean up old records periodically (every 1000 requests)
    if (requestCounts.size > 1000) {
      cleanupOldRecords(now);
    }
    
    return {
      allowed: true,
      remaining: RATE_LIMIT.maxRequests - 1,
      resetTime,
    };
  }

  // Rate limit exceeded
  if (record.count >= RATE_LIMIT.maxRequests) {
    return {
      allowed: false,
      remaining: 0,
      resetTime: record.resetTime,
    };
  }

  // Increment count
  record.count++;
  return {
    allowed: true,
    remaining: RATE_LIMIT.maxRequests - record.count,
    resetTime: record.resetTime,
  };
}

/**
 * Clean up expired rate limit records
 */
function cleanupOldRecords(now: number): void {
  for (const [key, record] of requestCounts.entries()) {
    if (now > record.resetTime) {
      requestCounts.delete(key);
    }
  }
}

/**
 * Get client identifier from request
 * Tries to get IP from various headers
 */
export function getClientIdentifier(request: Request): string {
  // Try to get IP from headers (Vercel, Cloudflare, etc.)
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) {
    return forwardedFor.split(",")[0].trim();
  }

  const realIp = request.headers.get("x-real-ip");
  if (realIp) {
    return realIp;
  }

  // Fallback to a default identifier
  return "unknown";
}












