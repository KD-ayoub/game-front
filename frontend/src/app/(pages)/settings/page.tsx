"use client";

import Link from "next/link";
import React from "react";
import Image from "next/image";
import { useState } from "react";
import { Header, SideBar } from "@/app/components";
import { NeuePlakFont, NeuePlakFontBold } from "@/app/utils/NeuePlakFont";
import ProfileImg from "@/app/assets/svg/profileimg.svg";
import TrashImg from "@/app/assets/svg/settings/trash.svg";
import ChangeImg from "@/app/assets/svg/settings/change.svg";
import Horizontal from "@/app/assets/svg/settings/horizontalred.svg";
import Vertical from "@/app/assets/svg/settings/verticalred.svg";
import Qrcode from "@/app/assets/svg/settings/qrcode.svg";

export default function Chat() {
  const [isHumburgClicked, setisHumburgClicked] = useState(false);
  const marginbody = isHumburgClicked ? "ml-6" : "";

  return (
    <main className="h-screen bg-[#0B0813] relative w-full max-w-[5120px] flex">
      <div className="h-[80px] w-[80px] sm:w-28 sm:h-28 md:w-64 md:h-64 lg:w-80 lg:h-80 xl:w-[480px] xl:h-[480px] 2xl:w-[550px] 2xl:h-[550px] rounded-full fixed -top-5 sm:-top-10 md:-top-32 lg:-top-40 xl:-top-64 right-0 opacity-70 sm:opacity-60 md:opacity-30 lg:opacity-25 xl:opacity-20 2xl:opacity-[0.19] bg-gradient-to-b from-[#323138] via-[#E95A3A] to-[#60C58D] blur-3xl "></div>
      <Header
        isHumburgClicked={isHumburgClicked}
        setisHumburgClicked={setisHumburgClicked}
      />
      <SideBar isHumburgClicked={isHumburgClicked} />
      <div
        className={`grow overflow-y-auto mt-[41px] sm:mt-11 md:mt-14 lg:mt-[72px] xl:mt-[96px] 2xl:mt-[128px] ${marginbody} //flex justify-center items-center//`}
      >
        <div className="w-full h-full">
          <div
            className={`ml-[10px] text-[20px] md:text-[30px] lg:text-[38px] xl:text-[44px] 2xl:text-[60px] ${NeuePlakFontBold.className}`}
          >
            Settings
          </div>
          <div className="w-auto h-[2900px] m-2 bg-gradient-to-b from-[#110D1F] via-[#110D1F] to-[#2d2a38] rounded-[20px]">
            <div className="flex flex-col justify-center items-center">
              <Image
                className="m-4 md:m-8 2xl:m-16 md:w-20 md:h-20 lg:w-28 lg:h-28 xl:w-36 xl:h-36 2xl:w-44 2xl:h-44"
                src={ProfileImg.src}
                width={60}
                height={60}
                alt="settings image"
              />
              <div className="flex justify-center gap-4 md:gap-12">
                <div className="w-[94px] md:h-8 md:w-[100px] lg:w-[130px] xl:w-[170px] 2xl:w-[240px] lg:h-9 xl:h-12 2xl:h-16 flex gap-1 xl:gap-3 2xl:gap-7 border-solid border rounded-[15px] 2xl:rounded-[30px] justify-center items-center">
                  <Image
                    className="lg:w-5 lg:h-5 xl:w-7 2xl:w-9 xl:h-7 2xl:h-9 "
                    src={TrashImg.src}
                    width={14}
                    height={14}
                    alt="trash icon"
                  />
                  <p className={`${NeuePlakFont.className} text-[14px] lg:text-[18px] xl:text-[22px] 2xl:text-[28px]`}>
                    Remove
                  </p>
                </div>
                <div className="w-[94px] md:h-8 md:w-[100px]  xl:w-[170px] lg:w-[130px] xl:h-12 2xl:w-[240px] lg:h-9 2xl:h-16 flex gap-1 xl:gap-3 2xl:gap-7 bg-[#E95A3A] rounded-[15px]  2xl:rounded-[30px] justify-center items-center">
                  <Image
                    className="lg:w-5 lg:h-5 xl:w-7 2xl:w-9 xl:h-7 2xl:h-9"
                    src={ChangeImg.src}
                    width={14}
                    height={14}
                    alt="trash icon"
                  />
                  <p className={`${NeuePlakFont.className} text-[14px] lg:text-[18px] xl:text-[22px] 2xl:text-[28px]`}>
                    Change
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-9 md:mt-16 2xl:mt-20">
              {/* <p className={`${NeuePlakFont.className} ml-2 md:text-[18px]`}>Edit Profile</p> */}
              <div className="m-3 sm:flex sm:gap-20 md:gap-32 justify-evenly">
                <form>
                  <p className={`${NeuePlakFont.className} text-[12px] md:text-[14px] lg:text-[22px] xl:text-[25px] 2xl:text-[33px] `}>Full name</p>
                  <input
                    className={`${NeuePlakFont.className} bg-[#383546] rounded-[5px] 2xl:rounded-[10px] h-8 w-[200px] sm:w-[240px] md:w-[260px] lg:w-[300px] xl:w-[400px] 2xl:w-[500px] lg:h-10 xl:h-12 2xl:h-16 pl-1`}
                    type="text"
                  />
                </form>
                <form>
                  <p className={`${NeuePlakFont.className} text-[12px] md:text-[14px] lg:text-[22px] xl:text-[25px] 2xl:text-[33px]`}>Nickname</p>
                  <input
                    className={`${NeuePlakFont.className} bg-[#383546] rounded-[5px] 2xl:rounded-[10px] h-8 w-[200px] sm:w-[240px] md:w-[260px] lg:w-[300px] xl:w-[400px] 2xl:w-[500px] lg:h-10 xl:h-12 2xl:h-16 pl-1`}
                    type="text"
                  />
                </form>
              </div>
            </div>
            {/* <p className={`${NeuePlakFont.className} ml-2 md:text-[18px]`}>Security</p> */}
            <div className="m-3 mt-9 md:m-11 lg:m-16 xl:m-40 flex flex-col md:flex-row justify-center items-center">
              <div className="md:w-[70%] xl:p-20 2xl:p-[90px]">
                <p className={`${NeuePlakFont.className} md:text-[18px] lg:text-[22px] xl:text-[25px] 2xl:text-[38px]`}>
                  Two-Factor Authentication
                </p>
                <p
                  className={`${NeuePlakFont.className} text-[12px] md:text-[15px] lg:text-[18px] xl:text-[22px] 2xl:text-[30px] text-[#A8A0C4]`}
                >
                  Protect your account with extra layer of security. Once
                  configured, you'll be required to enter both your password and
                  an authentication code from your mobile phone in order to sign
                  in.
                </p>
                <button
                  className={`w-[90px] h-[30px] lg:w-[110px] lg:h-[35px] xl:w-[130px] 2xl:w-[170px] xl:h-[45px] 2xl:h-[60px] rounded-[15px] 2xl:rounded-[27px] xl:rounded-[22px] ${NeuePlakFont.className} m-2 lg:text-[18px] xl:text-[22px] 2xl:text-[32px] bg-[#E95A3A]`}
                >
                  Enable
                </button>
                {/* <button
                className={`w-[90px] h-[30px] rounded-[15px] ${NeuePlakFont.className} m-2 bg-[#4A4853]`}
                >
                Disable
            </button> switch with enable */}
              </div>
              <div className="flex justify-center md:w-[10%]">
                <Image
                  className="md:hidden"
                  src={Horizontal.src}
                  width={119}
                  height={1}
                  alt="horizontal red"
                />
                <Image
                  className="hidden md:block xl:w-[5px] 2xl:w-[6px]"
                  src={Vertical.src}
                  width={2}
                  height={119}
                  alt="vertical red"
                />
              </div>
              <div className="m-5 flex justify-center items-center md:w-[20%] bg-slate-50">
                <Image className="md:w-full md:h-full" src={Qrcode.src} width={132} height={132} alt="Qr code"/>
              </div> 
            </div>
            <div className="flex flex-col md:flex-row md:justify-evenly justify-center items-center">
              <button
                className={`m-3 w-[160px] h-[30px] md:h-10 lg:w-[180px] lg:h-12 xl:w-[220px] 2xl:w-[270px] xl:h-14 2xl:h-16 border-solid border rounded-[15px] lg:rounded-[20px] xl:rounded-[25px] 2xl:rounded-[30px] ${NeuePlakFont.className} text-[14px] md:text-[18px] lg:text-[20px] xl:text-[25px] 2xl:text-[32px] bg-[#15131D]`}
              >
                Save changes
              </button>
              <button
                className={`m-3 w-[160px] h-[30px] md:h-10 lg:w-[180px] lg:h-12 xl:w-[220px] 2xl:w-[270px] xl:h-14 2xl:h-16 ${NeuePlakFont.className} text-[14px] md:text-[18px]  lg:text-[20px] xl:text-[25px] 2xl:text-[32px] text-[#DA373C]`}
              >
                Delete account
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
