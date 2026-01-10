/**
 * Request logging utilities
 * Provides structured logging for API requests
 */

interface LogEntry {
  timestamp: string;
  method: string;
  path: string;
  statusCode: number;
  duration: number;
  ip?: string;
  userAgent?: string;
}

/**
 * Log API request
 */
export function logRequest(
  method: string,
  path: string,
  statusCode: number,
  duration: number,
  request?: Request
): void {
  const log: LogEntry = {
    timestamp: new Date().toISOString(),
    method,
    path,
    statusCode,
    duration,
  };

  if (request) {
    log.ip = getClientIp(request);
    log.userAgent = request.headers.get("user-agent") || undefined;
  }

  // Format log message
  const logMessage = `[${log.timestamp}] ${method} ${path} ${statusCode} ${duration}ms`;

  // Log based on status code
  if (statusCode >= 500) {
    console.error(logMessage, log);
  } else if (statusCode >= 400) {
    console.warn(logMessage, log);
  } else if (process.env.NODE_ENV === "development") {
    console.log(logMessage);
  }

  // In production, you might want to send to a logging service
  if (process.env.NODE_ENV === "production" && process.env.LOG_SERVICE_URL) {
    // Send to logging service (e.g., Logtail, Datadog, etc.)
    // fetch(process.env.LOG_SERVICE_URL, {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(log),
    // }).catch((err) => console.error("Failed to send log:", err));
  }
}

/**
 * Get client IP from request
 */
function getClientIp(request: Request): string {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) {
    return forwardedFor.split(",")[0].trim();
  }

  const realIp = request.headers.get("x-real-ip");
  if (realIp) {
    return realIp;
  }

  return "unknown";
}

/**
 * Create a request logger middleware
 * Usage: const startTime = Date.now(); ... await handler(); logRequest(...)
 */
export function createRequestLogger(method: string, path: string, request: Request) {
  const startTime = Date.now();

  return {
    log: (statusCode: number) => {
      const duration = Date.now() - startTime;
      logRequest(method, path, statusCode, duration, request);
    },
  };
}

/**
 * Log error with context
 */
export function logError(
  error: unknown,
  context?: {
    method?: string;
    path?: string;
    userId?: string;
    [key: string]: unknown;
  }
): void {
  const errorLog = {
    timestamp: new Date().toISOString(),
    error: error instanceof Error ? {
      message: error.message,
      stack: error.stack,
      name: error.name,
    } : {
      message: String(error),
    },
    context,
  };

  console.error("Error occurred:", errorLog);

  // In production, send to error tracking service
  if (process.env.NODE_ENV === "production") {
    // Example: Send to Sentry, LogRocket, etc.
  }
}










