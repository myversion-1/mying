/**
 * Next.js Middleware
 * Handles compression and performance optimizations
 */

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  // 确保压缩头部设置正确
  // Note: Next.js 16+ 自动处理 gzip 压缩，但我们可以添加额外的优化

  // 为文本资源添加压缩提示
  // Note: Next.js/Vercel 自动处理 gzip/brotli 压缩
  // 我们只需要确保 Vary 头部正确设置
  const pathname = request.nextUrl.pathname;
  const isTextResource =
    pathname.endsWith(".js") ||
    pathname.endsWith(".css") ||
    pathname.endsWith(".json") ||
    pathname.endsWith(".html") ||
    pathname.endsWith(".svg") ||
    pathname.endsWith(".xml");

  if (isTextResource) {
    // 确保 Accept-Encoding 头部被正确处理（支持 gzip 和 brotli）
    const existingVary = response.headers.get("Vary");
    if (existingVary && !existingVary.includes("Accept-Encoding")) {
      response.headers.set("Vary", `${existingVary}, Accept-Encoding`);
    } else if (!existingVary) {
      response.headers.set("Vary", "Accept-Encoding");
    }
  }

  // 优化静态资源缓存
  if (pathname.startsWith("/_next/static/")) {
    response.headers.set(
      "Cache-Control",
      "public, max-age=31536000, immutable"
    );
  }

  return response;
}

// 只对特定路径运行中间件，减少开销
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};

