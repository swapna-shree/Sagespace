import { NextRequest, NextResponse } from 'next/server';
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });
  const url = request.nextUrl;

  if (
    token &&
    (
      url.pathname.startsWith('/signin') ||
      url.pathname.startsWith('/signup') ||
      url.pathname.startsWith('/verify') ||
      url.pathname.startsWith('/dashboard') ||
      url.pathname.startsWith('/new-user')
    )
  ) {
    return NextResponse.redirect(new URL('/home', request.url));
  }

  // Fallback for all other cases
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/signin',
    '/signup',
    '/verify',
    '/error',
    '/',
    '/dashboard',
    '/home',
    '/profile',
    '/messages',
    '/settings',
  ],
};

