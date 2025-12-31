import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token");

  // Protect `/engine` route
  // if (request.nextUrl.pathname.startsWith("/engine") && !token) {
  //   return NextResponse.redirect(new URL("/", request.url));
  // }

  return NextResponse.next();
}
