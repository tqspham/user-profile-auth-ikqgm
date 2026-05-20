'use server';

import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const session = await auth();

  // Allow static assets and Next.js internals first
  const isStaticAsset =
    pathname.startsWith('/_next') ||
    pathname.startsWith('/public') ||
    /\.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2)$/i.test(pathname);

  if (isStaticAsset) {
    return NextResponse.next();
  }

  // Allow auth API routes
  const isAuthRoute = pathname.startsWith('/api/auth');
  if (isAuthRoute) {
    return NextResponse.next();
  }

  // Define public auth paths
  const isPublicAuthPath = pathname === '/login' || pathname === '/auth/signup';

  // Define protected paths
  const isProtectedPath = pathname === '/profile';

  // If on a public auth path, allow access regardless of session state
  // (will be handled by page-level redirects if needed)
  if (isPublicAuthPath) {
    return NextResponse.next();
  }

  // If on a protected path and not authenticated, redirect to login
  if (isProtectedPath && !session) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // If on root path, redirect based on session state
  if (pathname === '/') {
    if (session) {
      return NextResponse.redirect(new URL('/profile', request.url));
    }
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Allow all other paths
  return NextResponse.next();
}