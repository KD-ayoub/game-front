import { NeuePlakFont, NeuePlakFontBold } from "@/app/utils/NeuePlakFont";
import ProfileImg from "@/app/assets/svg/profileimg.svg";
import Iconplus from "@/app/assets/svg/iconPlus.svg";
import Iconmsg from "@/app/assets/svg/Iconmsg.svg";
import Iconprofile from "@/app/assets/svg/Iconprofile.svg";
import Image from "next/image";
import React from "react";

export default function Friends() {
  return (
    <div className="m-3 mt-2 md:ml-5 lg:ml-10 lg:basis-1/2">
      <div className={`${NeuePlakFontBold.className} md:text-[18px] lg:text-[24px] xl:text-[28px] 2xl:text-[45px] `}>Friends</div>
      <div className="w-auto h-[250px] lg:h-[350px] xl:h-[500px] 2xl:h-[800px] bg-gradient-to-b from-[#110D1F] via-[#110D1F] to-[#2d2a38] rounded-[25px] pl-1 overflow-y-auto max-h-[250px] lg:max-h-[350px] xl:max-h-[500px] 2xl:max-h-[800px]">
        <div className="p-2 lg:p-3 2xl:p-5 flex justify-between ">
          <div className="flex gap-1 md:gap-5 items-center">
            <Image
              className="sm:w-[30px] sm:h-[30px] md:w-[35px] md:h-[35px] lg:w-[42px] lg:h-[42px] xl:w-12 xl:h-12 2xl:w-20 2xl:h-20"
              src={ProfileImg.src}
              width={25}
              height={25}
              alt="profile image"
            />
            <p className={`${NeuePlakFont.className} md:text-[18px] lg:text-[22px] xl:text-[24px] 2xl:text-[38px]`}>Yaskour</p>
          </div>
          {/* <div className="flex gap-2 md:gap-6 items-center">
            <Image className="md:w-5 md:h-5 lg:w-7 lg:h-7 xl:w-8 xl:h-8 2xl:w-12 2xl:h-12" src={Iconplus.src} width={13} height={13} alt="icon plus" />
            <Image className="md:w-5 md:h-6 lg:w-7 lg:h-7 xl:w-8 xl:h-8 2xl:w-12 2xl:h-12" src={Iconmsg.src} width={15} height={18} alt="icon msg" />
            <Image
              className="md:w-5 md:h-5 lg:w-7 lg:h-7 xl:w-8 xl:h-8 2xl:w-12 2xl:h-12"
              src={Iconprofile.src}
              width={15}
              height={15}
              alt="icon profile"
            />
          </div> */}
        </div>
        <div className="p-2 lg:p-3 2xl:p-5 flex justify-between ">
          <div className="flex gap-1 md:gap-5 items-center">
            <Image
              className="sm:w-[30px] sm:h-[30px] md:w-[35px] md:h-[35px] lg:w-[42px] lg:h-[42px] xl:w-12 xl:h-12 2xl:w-20 2xl:h-20"
              src={ProfileImg.src}
              width={25}
              height={25}
              alt="profile image"
            />
            <p className={`${NeuePlakFont.className} md:text-[18px] lg:text-[22px] xl:text-[24px] 2xl:text-[38px]`}>Yaskour</p>
          </div>
          {/* <div className="flex gap-2 md:gap-6">
            <Image className="md:w-5 md:h-5 lg:w-7 lg:h-7 xl:w-8 xl:h-8 2xl:w-12 2xl:h-12" src={Iconplus.src} width={13} height={13} alt="icon plus" />
            <Image className="md:w-5 md:h-6 lg:w-7 lg:h-7 xl:w-8 xl:h-8 2xl:w-12 2xl:h-12" src={Iconmsg.src} width={15} height={18} alt="icon msg" />
            <Image
              className="md:w-5 md:h-5 lg:w-7 lg:h-7 xl:w-8 xl:h-8 2xl:w-12 2xl:h-12"
              src={Iconprofile.src}
              width={15}
              height={15}
              alt="icon profile"
            />
          </div> */}
        </div>
      </div>
    </div>
  );
}
