import Link from "next/link";
import React from "react";
import { Header, SideBar } from "@/app/components";

export default function Chat() {
  return (
    <main className="h-screen bg-[#0B0813] relative w-full max-w-[2880px] flex">
      <div className="h-[80px] w-[80px] sm:w-28 sm:h-28 md:w-64 md:h-64 lg:w-80 lg:h-80 rounded-full fixed -top-5 sm:-top-10 md:-top-32 lg:-top-40 right-0 opacity-70 sm:opacity-60 md:opacity-30 lg:opacity-25 bg-gradient-to-b from-[#323138] via-[#E95A3A] to-[#60C58D] blur-3xl "></div>
      <Header />
      <SideBar />
      <div className=" grow overflow-y-auto mt-[41px] sm:mt-11 md:mt-14 lg:mt-[72px] //flex justify-center items-center//">
        {/* <div className="h-[200px] w-[70px] bg-red-500"></div> */}
      </div>
    </main>
  );
}
