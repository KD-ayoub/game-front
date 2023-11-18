"use client";

import Link from "next/link";
import React from "react";
import { useState } from "react";
import { Header, SideBar, Login } from "@/app/components";
import Image from "next/image";
import picture_login from "@/app/assets/svg/picture_login.svg";


export default function Auth() {

  return (
    <main className="h-screen bg-[#0B0813] relative w-full max-w-[5120px] flex">
        <div className="w-full h-screen flex">
            <img src={picture_login.src} className="h-screen w-1/2 bg-contain bg-center bg-gradient-radial "/>
            <Login />

        </div>
    </main>
  );
}
