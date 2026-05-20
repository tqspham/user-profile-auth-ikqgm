import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  const session = await auth();

  const isPublicAuthPath = pathname === '/login' || pathname === '/auth/signup';
  const isProtectedPath = pathname === '/profile';
  const isAuthRoute = pathname.startsWith('/api/auth');
  const isStaticAsset =
    pathname.startsWith('/_next') ||
    pathname.startsWith('/public') ||
    /\.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2)$/i.test(pathname);

  if (isAuthRoute || isStaticAsset) {
    return NextResponse.next();
  }

  if (isPublicAuthPath) {
    if (session) {
      return NextResponse.redirect(new URL('/profile', request.url));
    }
    return NextResponse.next();
  }

  if (isProtectedPath) {
    if (!session) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
    return NextResponse.next();
  }

  if (pathname === '/') {
    if (session) {
      return NextResponse.redirect(new URL('/profile', request.url));
    }
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}
