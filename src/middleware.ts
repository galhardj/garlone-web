import { NextResponse, type NextRequest } from "next/server";
import { getAuthUser } from "@/src/lib/supabase";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const authUser = await getAuthUser();

  const withDebugHeaders = (response: NextResponse) => {
    response.headers.set("x-middleware-executed", "true");
    response.headers.set("x-pathname", pathname);
    return response;
  };

  if (pathname.startsWith("/login") && authUser) {
    return withDebugHeaders(
      NextResponse.redirect(new URL("/dashboard", request.url)),
    );
  }

  if (pathname.startsWith("/dashboard") && !authUser) {
    return withDebugHeaders(
      NextResponse.redirect(new URL("/login", request.url)),
    );
  }

  return withDebugHeaders(NextResponse.next());
}

export const config = {
  matcher: ["/login/:path*", "/dashboard/:path*"],
};
