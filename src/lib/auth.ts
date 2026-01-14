/**
 * Simple password-based authentication for admin panel
 * Uses environment variable ADMIN_PASSWORD for authentication
 */

/**
 * Verify admin password from request
 * Checks Authorization header: "Bearer <password>"
 */
export function verifyAdminAuth(request: Request): boolean {
  const adminPassword = process.env.ADMIN_PASSWORD;
  
  // If no password is set, allow access in development only
  if (!adminPassword) {
    if (process.env.NODE_ENV === "development") {
      console.warn("⚠️  ADMIN_PASSWORD not set. Allowing access in development mode only.");
      return true;
    }
    // In production, deny access if no password is set
    return false;
  }

  const authHeader = request.headers.get("authorization");
  
  if (!authHeader) {
    return false;
  }

  // Check if it's a Bearer token
  if (!authHeader.startsWith("Bearer ")) {
    return false;
  }

  const token = authHeader.substring(7); // Remove "Bearer " prefix
  return token === adminPassword;
}

/**
 * Create an authenticated response (for API routes)
 */
export function createUnauthorizedResponse() {
  return new Response(
    JSON.stringify({ error: "Unauthorized. Invalid or missing admin password." }),
    {
      status: 401,
      headers: { "Content-Type": "application/json" },
    }
  );
}

/**
 * Get admin password from client (for login)
 * This is safe because we verify on the server side
 */
export function getAdminPassword(): string | null {
  if (typeof window === "undefined") {
    return null;
  }
  return localStorage.getItem("admin_password");
}

/**
 * Store admin password in localStorage (client-side only)
 */
export function setAdminPassword(password: string): void {
  if (typeof window === "undefined") {
    return;
  }
  localStorage.setItem("admin_password", password);
}

/**
 * Clear admin password from localStorage
 */
export function clearAdminPassword(): void {
  if (typeof window === "undefined") {
    return;
  }
  localStorage.removeItem("admin_password");
}

/**
 * Check if user is authenticated (client-side check)
 * Note: This is just for UI state. Server-side verification is required.
 */
export async function checkAuthStatus(): Promise<boolean> {
  if (typeof window === "undefined") {
    return false;
  }

  const password = getAdminPassword();
  if (!password) {
    return false;
  }

  // Verify with server
  try {
    const response = await fetch("/api/admin/auth/verify", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${password}`,
      },
    });

    return response.ok;
  } catch {
    return false;
  }
}


















