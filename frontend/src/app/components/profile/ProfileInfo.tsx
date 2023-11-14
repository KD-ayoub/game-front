import React from "react";

import Image from "next/image";
import { NeuePlakFont, NeuePlakFontBold } from "../../utils/NeuePlakFont";
import BgProfileinfo from "@/app/assets/svg/bgProfileinfo.svg";
import ProfileImg from "@/app/assets/svg/profileimg.svg";

export default function ProfileInfo() {
  return (
    <div className="flex  justify-center">
      <div className="w-[222px] h-[222px] relative">
        <Image
          src={BgProfileinfo.src}
          width={222}
          height={222}
          alt="bg profile info"
        />
        <div className="absolute top-[20%] -translate-y-1/2 -translate-x-1/2 left-1/2">
          <Image
            src={ProfileImg.src}
            width={60}
            height={60}
            alt="profile image"
          />{" "}
          {/* fetch image */}
        </div>
        <div className="absolute top-[35%] w-full">
          <p className={`text-center ${NeuePlakFontBold.className}`}>
            Hicham kaddouri
          </p>{" "}
          {/* fetch fullname, adjust font size*/}
          <p
            className={`${NeuePlakFont.className} text-center text-[12px] text-[#E95A3A]`}
          >
            Noobie
          </p>
        </div>
        <div className="absolute top-[55%] w-full">
          <div className="flex justify-around items-center">
            <div className="flex flex-col items-center">
              <p className={`${NeuePlakFontBold.className} text-[14px] `}>500</p>
              <p className={`${NeuePlakFontBold.className} text-[12px] text-[#717273] `}>Friends</p>
            </div>
            <div className="flex flex-col items-center">
              <p className={`${NeuePlakFontBold.className} text-[14px]`}>18</p>
              <p className={`${NeuePlakFontBold.className} text-[12px] text-[#717273]`}>Level</p>
            </div>
            <div className="flex flex-col items-center">
              <p className={`${NeuePlakFont.className} text-[14px] text-[#E95A3A]`}>at game</p>
              <p className={`${NeuePlakFontBold.className} text-[12px] text-[#717273]`}>status</p>
            </div>
          </div>
        </div>
        <div className="absolute top-[78%] w-full">
          <div className="flex justify-center">
            <button className={`w-32 h-8 bg-[#E95A3A] rounded-3xl ${NeuePlakFont.className}`}>Edit Profile</button>
          </div>
        </div>
      </div>
    </div>
  );
}
