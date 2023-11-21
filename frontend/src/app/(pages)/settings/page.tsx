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
          <div className="w-auto h-[900px] m-2 bg-gradient-to-b from-[#110D1F] via-[#110D1F] to-[#2d2a38] rounded-[20px]">
            <div className="flex flex-col justify-center items-center">
              <Image
                className="m-4"
                src={ProfileImg.src}
                width={60}
                height={60}
                alt="settings image"
              />
              <div className="flex justify-center gap-4">
                <div className="w-[94px] flex gap-1 border-solid border rounded-[15px] justify-center">
                  <Image
                    src={TrashImg.src}
                    width={14}
                    height={14}
                    alt="trash icon"
                  />
                  <p className={`${NeuePlakFont.className} text-[14px]`}>
                    Remove
                  </p>
                </div>
                <div className="w-[94px] flex gap-1 bg-[#E95A3A] rounded-[15px] justify-center">
                  <Image
                    src={ChangeImg.src}
                    width={14}
                    height={14}
                    alt="trash icon"
                  />
                  <p className={`${NeuePlakFont.className} text-[14px]`}>
                    Change
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-5">
              <p className={`${NeuePlakFont.className} ml-2`}>Edit Profile</p>
              <div className="m-3">
                <form>
                  <label className={`${NeuePlakFont.className} text-[12px]`}>
                    Full Name
                    <input
                      className={`${NeuePlakFont.className} bg-[#383546] rounded-[5px] h-8 w-[200px] pl-1`}
                      type="text"
                    />
                  </label>
                </form>
                <form>
                  <label className={`${NeuePlakFont.className} text-[12px]`}>
                    Nickname
                    <input
                      className={`${NeuePlakFont.className} bg-[#383546] rounded-[5px] h-8 w-[200px] pl-1`}
                      type="text"
                    />
                  </label>
                </form>
              </div>
            </div>
            <p className={`${NeuePlakFont.className} ml-2`}>Security</p>
            <div className="m-3">
              <div>
                <p className={`${NeuePlakFont.className}`}>
                  Two-Factor Authentication
                </p>
                <p
                  className={`${NeuePlakFont.className} text-[12px] text-[#A8A0C4]`}
                >
                  Protect your account with extra layer of security. Once
                  configured, you’ll be required to enter both your password and
                  an authentication code from your mobile phone in order to sign
                  in.
                </p>
                <button
                  className={`w-[90px] h-[30px] rounded-[15px] ${NeuePlakFont.className} m-2 bg-[#E95A3A]`}
                >
                  Enable
                </button>
                {/* <button
                className={`w-[90px] h-[30px] rounded-[15px] ${NeuePlakFont.className} m-2 bg-[#4A4853]`}
                >
                Disable
            </button> switch with enable */}
              </div>
              <div className="flex justify-center">
                <Image
                  src={Vertical.src}
                  width={119}
                  height={1}
                  alt="vertical red"
                />
              </div>
              {/* <div className="m-5 flex justify-center items-center w-36 h-36 bg-slate-50">
                <Image src={Qrcode.src} width={132} height={132} alt="Qr code"/>
              </div> show qr code */}
            </div>
            <div className="flex flex-col justify-center items-center">
                <button className={`m-3 w-[160px] h-[30px] border-solid border rounded-[15px] ${NeuePlakFont.className} text-[14px] bg-[#15131D]`}>Save changes</button>
                <button className={`m-3 w-[160px] h-[30px] ${NeuePlakFont.className} text-[14px] text-[#DA373C]`}>Delete account</button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
