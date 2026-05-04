import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  let needsRedirect = false;

  // www → non-www
  if (url.hostname.startsWith("www.")) {
    url.hostname = url.hostname.slice(4);
    needsRedirect = true;
  }

  // Lowercase pathname
  const lower = url.pathname.toLowerCase();
  if (url.pathname !== lower) {
    url.pathname = lower;
    needsRedirect = true;
  }

  // Remove trailing slash (skip root "/")
  if (url.pathname.length > 1 && url.pathname.endsWith("/")) {
    url.pathname = url.pathname.slice(0, -1);
    needsRedirect = true;
  }

  if (needsRedirect) {
    return NextResponse.redirect(url, { status: 301 });
  }
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon\\.ico|icons/|assets/|api/).*)"],
};
