import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import CheckUserStatus from "./app/api/checkUserStatus";
import { loginStatus } from "./app/utils/library/authEnum";

// This function can be marked `async` if using `await` inside

async function goodLoginMiddleware() {
  const responseStatus = await CheckUserStatus();
  if (responseStatus.status === 403) {
    const body = await responseStatus.json();
    if (body.message === loginStatus.FirstTime) {
      console.log("first time");
      return loginStatus.FirstTime;
    } else if (body.message === loginStatus.NotLogged) {
      console.log("not logged", body.message);
      return loginStatus.NotLogged;
    } else if (body.message === loginStatus.TwoFactor) {
      console.log("two factor");
      return loginStatus.TwoFactor;
    }
  } else {
    console.log("you are alrady logged");
    return "200";
  }
}

export async function middleware(request: NextRequest) {
    const status = await goodLoginMiddleware();
    // if (status === loginStatus.FirstTime) {
    //   return NextResponse.redirect(new URL('/auth/goodlogin', request.url));
    // } else if (status === loginStatus.NotLogged) {
    //   return NextResponse.redirect(new URL('/auth', request.url));
    // } else if (status === loginStatus.TwoFactor) {
    //   return NextResponse.redirect(new URL('/auth/twofctor'));
    // }
    // return NextResponse.redirect(new URL('/profile', request.url));
  // const responseStatus = await CheckUserStatus();
  //     if (responseStatus.status === 403) {
  //       const body = await responseStatus.json();
  //       if (body.message === loginStatus.FirstTime) {
  //         console.log("first time");
  //       } else if (body.message === loginStatus.NotLogged) {
  //         console.log("not logged");
  //         return NextResponse.redirect(new URL('/auth', request.url))
  //       } else if (body.message === loginStatus.TwoFactor) {
  //         console.log("two factor");
  //         return NextResponse.redirect(new URL('/auth/twofactor', request.url))
  //       }
  //       await console.log("bbbbbb", body);
  //     } else {
  //       console.log("you are alrady logged");
  //       return NextResponse.redirect(new URL('/profile', request.url))
  //     }
  return NextResponse.next();
}

export const config = {
  matcher: ["/profile/", "/chat", "/game", "/settings", "/auth/:path*"],
};
