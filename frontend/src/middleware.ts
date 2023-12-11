import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import CheckUserStatus from "./app/api/checkUserStatus";
import { loginStatus } from "./app/utils/library/authEnum";

async function goodLoginMiddleware() {}

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const cookie = request.cookies.get("connect.sid");
  if (cookie && request.nextUrl.pathname === "/auth/goodlogin") {
    const responseStatus = await CheckUserStatus(cookie.value);
    const data = await responseStatus.json();
    if (data.message === loginStatus.FirstTime) {
      return NextResponse.next();
    } else if (data.message === loginStatus.TwoFactor) {
      return NextResponse.redirect(new URL("/auth/twofactor", request.url));
    } else {
      return NextResponse.redirect(new URL("/profile", request.url));
    }
  } else if (cookie && request.nextUrl.pathname === "/auth/twofactor") {
    const responseStatus = await CheckUserStatus(cookie.value);
    const data = await responseStatus.json();
    if (data.message === loginStatus.FirstTime) {
      return NextResponse.redirect(new URL("/auth/goodlogin", request.url));
    } else if (data.message === loginStatus.TwoFactor) {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(new URL("/profile", request.url));
    }
  } else if (cookie && request.nextUrl.pathname === "/auth") {
    const responseStatus = await CheckUserStatus(cookie.value);
    const data = await responseStatus.json();
    console.log(data.message);
    if (data.message === loginStatus.FirstTime) {
      return NextResponse.redirect(new URL("/auth/goodlogin", request.url));
    } else if (data.message === loginStatus.TwoFactor) {
      return NextResponse.redirect(new URL("/auth/twofactor", request.url));
    } else {
      return NextResponse.redirect(new URL("/profile", request.url));
    }
  } else if (!cookie && request.nextUrl.pathname === "/auth") {
    return NextResponse.next();
  } else if(cookie) {
    const responseStatus = await CheckUserStatus(cookie.value);
    const data = await responseStatus.json();
    if (data.message === loginStatus.FirstTime) {
      return NextResponse.redirect(new URL("/auth/goodlogin", request.url));
    } else if (data.message === loginStatus.TwoFactor) {
      return NextResponse.redirect(new URL("/auth/twofactor", request.url));
    } else {
      return NextResponse.next();
    }
  }
}

export const config = {
  matcher: [
    "/profile/:path*",
    "/chat",
    "/game",
    "/settings",
    "/auth/:path*",
  ],
};
