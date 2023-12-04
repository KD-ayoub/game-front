'use client';

import { usePathname } from "next/navigation";
import { NeuePlakFontBold } from "@/app/utils/NeuePlakFont";
import React, { SyntheticEvent, useEffect, useState } from "react";
import Image from "next/image";
// import BlueAchiev from "@/app/assets/svg/blueachiev.svg";
import intra_logo from "@/app/assets/svg/42_logo.svg";
import logo from "@/app/assets/svg/logo.svg";
import Link from 'next/link';
import { useRouter } from "next/router";


export default function Login() 
{
  


  return (
    <div className="flex  w-1/2 h-screen items-center justify-center  flex-col bg-gradient-radial">
      <div className="w-514 h-601 bg-[#15131D] border border-rgb-129-87-98 rounded-3xl p-10 flex flex-col items-center justify-center">
        <img src={logo.src} alt="logo" className="w-11 h-11" />
        <p className={`${NeuePlakFontBold.className} text-[32px]`}>
          Welcome Back again!
        </p>
        <p className="text-[#8E86A5]">We'are so excited to see you again!</p>
          <Link  href="http://localhost:3001/auth/login">
        <button  className="border m-2 p-2 rounded-xl hover:bg-[#ff5555bb]">
            Log with Your <br />
            <img src={intra_logo.src} alt="42" className="inline" /> Intra
        </button>
          </Link>
      </div>
    </div>
  );
}
