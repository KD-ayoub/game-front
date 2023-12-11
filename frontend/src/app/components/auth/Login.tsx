

import { NeuePlakFontBold, NeuePlakFont } from "@/app/utils/NeuePlakFont";
// import React, { SyntheticEvent, useEffect, useState } from "react";
import Image from "next/image";
// import BlueAchiev from "@/app/assets/svg/blueachiev.svg";
import intra_logo from "@/app/assets/svg/42_logo.svg";
import logo from "@/app/assets/svg/logo.svg";
import Link from "next/link";

export default function Login() {
  return (
    <div className="w-52 h-[400px] md:w-56 md:h-[450px] lg:w-[352px] lg:h-[550px] xl:w-[450px] xl:h-[600px] 2xl:w-[550px] 2xl:h-[700px] bg-[#15131D] flex flex-col lg:gap-4 justify-center items-center border border-solid border-white rounded-[20px]">
      <Image
        src={logo.src}
        width={30}
        height={30}
        alt="logo"
        className="m-3 md:w-9 md:h-9 lg:w-14 lg:h-14 xl:w-[72px] xl:h-[72px] 2xl:w-[85px]"
      />
      <p
        className={`${NeuePlakFontBold.className} text-[22px] text-center md:text-[26px] lg:text-[28px] xl:text-[34px] 2xl:text-[38px]`}
      >
        Welcome Back again!
      </p>
      <p className="text-[#8E86A5] text-center mb-3 md:text-[20px] xl:text-[22px] 2xl:text-[25px] lg:p-3">
        We'are so excited to see you again!
      </p>
      <Link href="http://localhost:3001/auth/login">
        <div className="lg:w-56 lg:h-16 xl:w-60 xl:h-20 2xl:w-64 2xl:h-24 border m-2 p-2 flex flex-col rounded-xl hover:bg-[#ff5555bb]">
          <p
            className={`${NeuePlakFont.className} text-[18px] xl:text-[22px] 2xl:text-[24px] text-center`}
          >
            Log with Your
          </p>
          <div className="flex justify-center gap-3">
            <Image src={intra_logo.src} width={20} height={20} alt="42 logo" />
            <p className={`${NeuePlakFont.className} text-[18px] xl:text-[22px] 2xl:text-[24px] text-center`}>Intra</p>
          </div>
        </div>
      </Link>
    </div>
  );
}
