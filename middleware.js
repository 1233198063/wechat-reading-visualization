import { createMiddlewareClient } from '@/lib/supabase/middleware';
import { NextResponse } from 'next/server';

const PUBLIC_PATHS = ['/login'];
const SUPABASE_CONFIGURED =
  process.env.NEXT_PUBLIC_SUPABASE_URL &&
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export async function middleware(request) {
  // Skip auth when Supabase is not configured (API-key-only mode).
  if (!SUPABASE_CONFIGURED) {
    return NextResponse.next();
  }

  const { supabase, response } = createMiddlewareClient(request);
  const { data: { session } } = await supabase.auth.getSession();

  const { pathname } = request.nextUrl;
  const isPublic = PUBLIC_PATHS.some(p => pathname.startsWith(p));

  if (!session && !isPublic) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (session && isPublic) {
    return NextResponse.redirect(new URL('/overview', request.url));
  }

  return response;
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|api).*)'],
};
