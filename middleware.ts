import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'
import { prisma } from '@/lib/lib/db';

export async function middleware(request: NextRequest) {
  const publicRoutes = [
    '/api/login',
    '/api/auth',
    '/login',
    '/homepage',
    '/signup',
    '/forgot-password',
    '/reset-password',
  ];

  const { pathname } = request.nextUrl;

  // Allow all public routes
  if (publicRoutes.some(path => pathname.startsWith(path))) {
    return NextResponse.next();
  }

  // Allow access to static files and images
  if (pathname.startsWith('/_next/') || pathname.includes('.')) {
    return NextResponse.next();
  }

  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value,
            ...options,
          })
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          })
          response.cookies.set({
            name,
            value,
            ...options,
          })
        },
        remove(name: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value: '',
            ...options,
          })
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          })
          response.cookies.set({
            name,
            value: '',
            ...options,
          })
        },
      },
    }
  )

  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Fetch user role from your database
  const dbUser = await prisma.user.findUnique({
    where: { id: user.id },
    select: { role: true },
  });

  if (!dbUser) {
    // If user exists in Supabase but not in your DB, redirect to login
    return NextResponse.redirect(new URL('/login', request.url));
  }

  const { role } = dbUser;
  const homeURL = new URL('/homepage', request.url);

  // More robust role-based redirection logic
  switch (role) {
    case 'COMPANY':
      if (!pathname.startsWith('/dashboard/company') && !pathname.startsWith('/company/create')) {
        return NextResponse.redirect(new URL('/dashboard/company', request.url));
      }
      break;
    case 'HRD':
      if (!pathname.startsWith('/dashboard/hrd')) {
        return NextResponse.redirect(new URL('/dashboard/hrd', request.url));
      }
      break;
    case 'ADMIN':
      if (!pathname.startsWith('/admin')) {
        return NextResponse.redirect(new URL('/admin', request.url));
      }
      break;
    case 'SOCIETY':
      if (pathname.startsWith('/dashboard') || pathname.startsWith('/admin') || pathname.startsWith('/company')) {
        return NextResponse.redirect(homeURL);
      }
      break;
    default:
      // Redirect any other roles or undefined roles to homepage
      return NextResponse.redirect(homeURL);
  }

  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
}
