// Temporarily disabled: next-intl middleware is configured but pages are not using [locale] route structure
// TODO: Migrate to next-intl [locale] route structure or implement custom middleware
// import createMiddleware from 'next-intl/middleware';
// import { routing } from './i18n/routing';

// export default createMiddleware(routing);

import { NextRequest, NextResponse } from 'next/server';

// Minimal middleware that explicitly allows all requests
// This ensures no requests are blocked, especially for Lighthouse and other crawlers
export default function middleware(request: NextRequest) {
  // Simply pass through all requests without any blocking or modification
  return NextResponse.next();
}

export const config = {
  // Minimal matcher - only match page routes, exclude API and Next.js internals
  // This ensures middleware doesn't interfere with static assets or API routes
  matcher: [
    /*
     * Match page routes only, exclude:
     * - /api/* (API routes)
     * - /_next/* (Next.js internals)
     * - /_vercel/* (Vercel internals)
     * - Static files (.*\..*)
     */
    '/((?!api|_next|_vercel|.*\\..*).*)',
  ],
};





