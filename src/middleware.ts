import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getSupabaseUser } from "@/src/lib/supabase";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const user = await getSupabaseUser();

  const withDebugHeaders = (response: NextResponse) => {
    response.headers.set("x-middleware-executed", "true");
    response.headers.set("x-pathname", pathname);
    return response;
  };

  if (pathname.startsWith("/login") && user) {
    return withDebugHeaders(
      NextResponse.redirect(new URL("/dashboard", request.url)),
    );
  }

  if (pathname.startsWith("/dashboard") && !user) {
    return withDebugHeaders(
      NextResponse.redirect(new URL("/login", request.url)),
    );
  }

  return withDebugHeaders(NextResponse.next());
}

export const config = {
  matcher: ["/login/:path*", "/dashboard/:path*"],
};
