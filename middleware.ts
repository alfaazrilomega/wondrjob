import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { prisma } from "@/lib/lib/db";

export async function middleware(request: NextRequest) {
  const publicRoutes = [
    "/api/login",
    "/api/auth",
    "/login",
    "/homepage",
    "/signup",
    "/forgot-password",
    "/reset-password",
  ];

  const { pathname } = request.nextUrl;

  // Allow all public routes
  if (publicRoutes.some((path) => pathname.startsWith(path))) {
    return NextResponse.next();
  }

  // Allow access to static files and images
  if (pathname.startsWith("/_next/") || pathname.includes(".")) {
    return NextResponse.next();
  }

  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          // If the cookie is set, update the request's cookies.
          request.cookies.set({
            name,
            value,
            ...options,
          });
          // Also update the response's cookies.
          response.cookies.set({
            name,
            value,
            ...options,
          });
        },
        remove(name: string, options: CookieOptions) {
          // If the cookie is removed, update the request's cookies.
          request.cookies.set({
            name,
            value: "",
            ...options,
          });
          // Also update the response's cookies.
          response.cookies.set({
            name,
            value: "",
            ...options,
          });
        },
      },
    },
  );

  // Refresh session if expired - important!
  const { data: { user } } = await supabase.auth.getUser();

  const isSimulating = request.cookies.get("simulation_mode")?.value === "true";
  const simulatedUserId = request.cookies.get("simulated_user_id")?.value;

  if (isSimulating && simulatedUserId && user) {
    // User must be logged in (i.e., an admin) to simulate.
    const simulatedDbUser = await prisma.user.findUnique({
      where: { id: simulatedUserId },
      select: { role: true },
    });

    if (simulatedDbUser) {
      // The rest of the middleware will now use the simulated user's role
      const { role } = simulatedDbUser;
      const homeURL = new URL("/homepage", request.url);

      // Role-based redirection for the SIMULATED user
      switch (role) {
        case "COMPANY":
          if (
            !pathname.startsWith("/dashboard/company") &&
            !pathname.startsWith("/company/create")
          ) {
            return NextResponse.redirect(
              new URL("/dashboard/company", request.url),
            );
          }
          break;
        case "HRD":
          if (!pathname.startsWith("/dashboard/hrd")) {
            return NextResponse.redirect(
              new URL("/dashboard/hrd", request.url),
            );
          }
          break;
        case "ADMIN": // Should not happen, but as a safeguard
          if (!pathname.startsWith("/admin")) {
            return NextResponse.redirect(new URL("/admin", request.url));
          }
          break;
        case "SOCIETY":
          if (
            pathname.startsWith("/dashboard") ||
            pathname.startsWith("/admin") ||
            pathname.startsWith("/company")
          ) {
            return NextResponse.redirect(homeURL);
          }
          break;
        default:
          return NextResponse.redirect(homeURL);
      }
      // If the path is allowed for the simulated role, continue.
      return response;
    }
  }

  if (!user) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Fetch user role from your database
  const dbUser = await prisma.user.findUnique({
    where: { id: user.id },
    select: { role: true },
  });

  if (!dbUser) {
    // If user exists in Supabase but not in your DB, redirect to login
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const { role } = dbUser;
  const homeURL = new URL("/homepage", request.url);

  // More robust role-based redirection logic
  switch (role) {
    case "COMPANY":
      if (
        !pathname.startsWith("/dashboard/company") &&
        !pathname.startsWith("/company/create")
      ) {
        return NextResponse.redirect(
          new URL("/dashboard/company", request.url),
        );
      }
      break;
    case "HRD":
      if (!pathname.startsWith("/dashboard/hrd")) {
        return NextResponse.redirect(new URL("/dashboard/hrd", request.url));
      }
      break;
    case "ADMIN":
      if (!pathname.startsWith("/admin")) {
        return NextResponse.redirect(new URL("/admin", request.url));
      }
      break;
    case "SOCIETY":
      if (
        pathname.startsWith("/dashboard") ||
        pathname.startsWith("/admin") ||
        pathname.startsWith("/company")
      ) {
        return NextResponse.redirect(homeURL);
      }
      break;
    default:
      // Redirect any other roles or undefined roles to homepage
      return NextResponse.redirect(homeURL);
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
