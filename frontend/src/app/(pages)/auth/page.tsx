"use client";

// import Link from "next/link";
import React from "react";
// import { useState } from "react";
import { Login } from "@/app/components";
// import Image from "next/image";
import picture_login from "@/app/assets/svg/picture_login.svg";
import Image from "next/image";
import CheckUserStatus from "@/app/api/checkUserStatus";
import { useEffect } from "react";
import { loginStatus } from "@/app/utils/library/authEnum";
import { useRouter } from "next/navigation";


export default function Auth() {
  const router = useRouter();

  // useEffect(() => {
  //   async function fetcher() {
  //     const responseStatus = await CheckUserStatus();
  //     if (responseStatus.status === 403) {
  //       const body = await responseStatus.json();
  //       if (body.message === loginStatus.FirstTime) {
  //         //redirect to first time
  //         console.log("first time");
  //         router.push('/auth/goodlogin');
  //       } else if (body.message === loginStatus.NotLogged) {
  //         //redirect to auth
  //         console.log("not logged");
  //       } else if (body.message === loginStatus.TwoFactor) {
  //         console.log("two factor");
  //         router.push('/auth/twofactor');
  //       }
  //       await console.log("bbbbbb", body);
  //     } else {
  //       console.log("you are alrady logged");
  //       router.push("/profile");
  //       return null;
  //     }
  //   }
  //   fetcher();
  // }, []);
  return (
    <main className="h-screen w-full bg-[#252134] max-w-[5120px]">
      <div className="w-full h-full flex justify-around items-center ">
        <Image
          src={picture_login.src}
          width={728}
          height={1024}
          alt="picture login"
          className="h-screen w-1/2 bg-contain bg-center bg-gradient-radial hidden sm:block"
        />
        <Login/>
      </div>
    </main>
  );
}
