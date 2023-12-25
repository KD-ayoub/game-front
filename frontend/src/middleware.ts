import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import CheckUserStatus from "./app/api/checkUserStatus";
import { loginStatus } from "./app/utils/library/authEnum";
import { useUserContext } from "./app/components/useUserContext";
import { UserType } from "./app/types/goodloginType";
import getUserStatus from "./app/api/auth/getUserStatus";

async function goodLoginMiddleware() {}

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {

  const cookie = request.cookies.get("connect.sid");
  if (cookie && request.nextUrl.pathname === "/auth/goodlogin") {
    const responseStatus = await CheckUserStatus(cookie.value);
    const data = await responseStatus.json();
    if (data.message === loginStatus.FirstTime) {
      console.log('entered 1', data.message);
      return NextResponse.next();
    } else if (data.message === loginStatus.TwoFactor) {
      console.log('entered 2', data.message);
      return NextResponse.redirect(new URL("/auth/twofactor", request.url));
    } else {
      console.log('entered 3', data.message);
      return NextResponse.redirect(new URL("/profile", request.url));
    }
  } else if (cookie && request.nextUrl.pathname === "/auth/twofactor") {
    const responseStatus = await CheckUserStatus(cookie.value);
    const data = await responseStatus.json();
    if (data.message === loginStatus.FirstTime) {
      console.log('entered 4', data.message);
      return NextResponse.redirect(new URL("/auth/goodlogin", request.url));
    } else if (data.message === loginStatus.TwoFactor) {
      console.log('entered 5', data.message);
      return NextResponse.next();
    } else {
      console.log('entered 6', data.message);
      return NextResponse.redirect(new URL("/profile", request.url));
    }
  } else if (cookie && request.nextUrl.pathname === "/auth") {
    const responseStatus = await CheckUserStatus(cookie.value);
    const data = await responseStatus.json();
    console.log(data.message);
    if (data.message === loginStatus.FirstTime) {
      console.log('entered 7', data.message);
      return NextResponse.redirect(new URL("/auth/goodlogin", request.url));
    } else if (data.message === loginStatus.TwoFactor) {
      console.log('entered 8', data.message);
      return NextResponse.redirect(new URL("/auth/twofactor", request.url));
    } else if (data.message === loginStatus.NotLogged) {
      console.log('entered 8', data.message);
      return NextResponse.next();
    } else {
      console.log('entered 9', data.message);
      return NextResponse.redirect(new URL("/profile", request.url));
    }
  } else if (!cookie && request.nextUrl.pathname === "/auth") {
    console.log('entered 10');
    return NextResponse.next();
  } else if(cookie && request.nextUrl.pathname !== "/auth") {
    const responseStatus = await CheckUserStatus(cookie.value);
    const data = await responseStatus.json();
    if (data.message === loginStatus.FirstTime) {
      console.log('entered 11', data.message);
      return NextResponse.redirect(new URL("/auth/goodlogin", request.url));
    } else if (data.message === loginStatus.TwoFactor) {
      console.log('entered 12', data.message);
      return NextResponse.redirect(new URL("/auth/twofactor", request.url));
    } else if (data.message === loginStatus.NotLogged) {
      console.log('entered 12', data.message);
      return NextResponse.redirect(new URL("/auth", request.url));
    } else {
      console.log('entered 14', data.message);
      return NextResponse.next();
    }
  } else if (!cookie) {
    return NextResponse.redirect(new URL("/auth", request.url));
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
