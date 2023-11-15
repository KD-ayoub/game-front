import React from "react";

import Image from "next/image";
import BgStatusgame from "@/app/assets/svg/bgstatusgame.svg";
import { NeuePlakFontBold } from "@/app/utils/NeuePlakFont";

export default function StatusGame() {
  return (
    <div className="m-3 mt-2  md:flex-grow">
      <div className="w-auto h-[79px] lg:h-[125px] xl:h-[140px] 2xl:h-[190px] relative">
        <Image
          className="object-cover rounded-[20px]"
          src={BgStatusgame.src}
          alt="bg profile info"
          fill
        />
        <div className="absolute top-[30%] w-full">
          <div className="flex justify-around">
            <div className="flex flex-col items-center">
              <p className={`${NeuePlakFontBold.className} text-[14px] md:text-[18px] lg:text-[24px] xl:text-[28px] 2xl:text-[35px]`}>105</p>
              <p className={`${NeuePlakFontBold.className} text-[9px] md:text-[12px] lg:text-[18px] xl:text-[22px] 2xl:text-[28px] text-[#717273]`}>TOTAL GAMES</p>
            </div>
            <div className="flex flex-col items-center">
              <p className={`${NeuePlakFontBold.className} text-[14px] md:text-[18px] lg:text-[24px] xl:text-[28px] 2xl:text-[35px]`}>80</p>
              <p className={`${NeuePlakFontBold.className} text-[9px] md:text-[12px] lg:text-[18px] xl:text-[22px] 2xl:text-[28px] text-[#717273]`}>WINNINGS</p>
            </div>
            <div className="flex flex-col items-center">
              <p className={`${NeuePlakFontBold.className} text-[14px] md:text-[18px] lg:text-[24px] xl:text-[28px] 2xl:text-[35px]`}>25</p>
              <p className={`${NeuePlakFontBold.className} text-[9px] md:text-[12px] lg:text-[18px] xl:text-[22px] 2xl:text-[28px] text-[#717273]`}>LOSSES</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
