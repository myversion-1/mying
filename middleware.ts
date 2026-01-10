// Temporarily disabled: next-intl middleware is configured but pages are not using [locale] route structure
// TODO: Migrate to next-intl [locale] route structure or implement custom middleware
// import createMiddleware from 'next-intl/middleware';
// import { routing } from './i18n/routing';

// export default createMiddleware(routing);

// Temporary middleware that does nothing (passes through all requests)
export default function middleware() {
  // No-op: pass through all requests
}

export const config = {
  // 匹配所有路径，除了：
  // - API 路由 (/api/*)
  // - Next.js 内部路由 (_next/*)
  // - Vercel 相关路由 (_vercel/*)
  // - 静态文件 (*.*)
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
};





