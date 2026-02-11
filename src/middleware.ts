import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifySessionValue } from '@/lib/auth/session';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip login page itself
  if (pathname === '/admin/login') {
    const cookie = request.cookies.get('admin-session');
    if (cookie) {
      const session = await verifySessionValue(cookie.value);
      if (session) {
        // Already authenticated — redirect to admin dashboard
        return NextResponse.redirect(new URL('/admin', request.url));
      }
    }
    return NextResponse.next();
  }

  // Protect all other /admin routes
  const cookie = request.cookies.get('admin-session');
  if (!cookie) {
    return NextResponse.redirect(new URL('/admin/login', request.url));
  }

  const session = await verifySessionValue(cookie.value);
  if (!session) {
    // Invalid or expired session
    const response = NextResponse.redirect(
      new URL('/admin/login', request.url)
    );
    response.cookies.delete('admin-session');
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
