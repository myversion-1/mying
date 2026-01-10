import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default createMiddleware(routing);

export const config = {
  // 匹配所有路径，除了：
  // - API 路由 (/api/*)
  // - Next.js 内部路由 (_next/*)
  // - Vercel 相关路由 (_vercel/*)
  // - 静态文件 (*.*)
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
};




