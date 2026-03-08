import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/** Canonical domain (no www). Redirect www so GSC indexes one URL and "Page with redirect" resolves. */
const CANONICAL_HOST = 'bhupendranath.com.np';

export function middleware(request: NextRequest) {
  const hostname = request.nextUrl.hostname;
  if (hostname.startsWith('www.')) {
    const url = request.nextUrl.clone();
    url.hostname = CANONICAL_HOST;
    url.port = '';
    return NextResponse.redirect(url, 301);
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Run on all pathnames except _next/static, _next/image, favicon, etc.
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|avif)$).*)',
  ],
};
