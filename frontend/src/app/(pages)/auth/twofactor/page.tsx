"use client";
import { useState, useEffect } from "react";
import { NeuePlakFontBold, NeuePlakFont } from "@/app/utils/NeuePlakFont";
import { ToastContainer, toast } from "react-toastify";
import Image from "next/image";
import Qrimage from "@/app/assets/images/qrcodeee.jpeg";
import OTPVerification from "@/app/components/auth/OTPverification";

// sssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss
export default function TwoFactor() {
  return (
    <main className="h-screen bg-[#0B0813] relative w-full max-w-[5120px] flex">
      <div className="flex w-full h-screen items-center justify-center  flex-col bg-gradient-radial">
        <div className="w-52 h-[400px] sm:w-72 sm:h-[450px] md:w-80 md:h-[480px] lg:w-[368px] lg:h-[550px] xl:w-[500px] xl:h-[650px] 2xl:w-[600px] 2xl:h-[850px] bg-[#15131D] border border-solid border-white rounded-[20px] flex flex-col justify-evenly items-center ">
          <div className="flex flex-col justify-center items-center gap-3 lg:gap-5 2xl:gap-7">
            <Image
              className="sm:w-44 sm:h-44 lg:w-52 lg:h-52 xl:w-60 xl:h-60 2xl:w-[272px] 2xl:h-[272px]"
              src={Qrimage.src}
              width={100}
              height={100}
              alt="qr image scan"
            />
            <p className={`${NeuePlakFont.className} text-[16px] sm:text-[20px] lg:text-[23px] xl:text-[28px] 2xl:text-[33px]`}>
              Enter the code
            </p>
            <OTPVerification/>
            <div className="w-24 h-8 sm:w-28 sm:h-9 md:w-28 lg:w-36 lg:h-12 xl:w-40 xl:h-[56px] 2xl:w-48 2xl:h-[72px] border border-solid border-gray-500 rounded-[8px] 2xl:rounded-[18px] flex justify-center">
            <button
              className={`${NeuePlakFont.className} text-[16px] sm:text-[18px] lg:text-[23px] xl:text-[28px] 2xl:text-[33px]`}
            >
              Login
            </button>
          </div>
          </div>
        </div>
      </div>
    </main>
  );
}
