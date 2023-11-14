import React from "react";

import Image from "next/image";
import BgStatusgame from "@/app/assets/svg/bgstatusgame.svg";
import { NeuePlakFontBold } from "@/app/utils/NeuePlakFont";

export default function StatusGame() {
  return (
    <div className="flex justify-center">
      <div className="w-[222px] h-[79px] relative mt-3">
        <Image
          src={BgStatusgame.src}
          width={222}
          height={79}
          alt="bg profile info"
        />
        <div className="absolute top-[30%] w-full">
          <div className="flex justify-around">
            <div className="flex flex-col items-center">
              <p className={`${NeuePlakFontBold.className} text-[14px]`}>105</p>
              <p className={`${NeuePlakFontBold.className} text-[9px] text-[#717273]`}>TOTAL GAMES</p>
            </div>
            <div className="flex flex-col items-center">
              <p className={`${NeuePlakFontBold.className} text-[14px]`}>80</p>
              <p className={`${NeuePlakFontBold.className} text-[9px] text-[#717273]`}>WINNINGS</p>
            </div>
            <div className="flex flex-col items-center">
              <p className={`${NeuePlakFontBold.className} text-[14px]`}>25</p>
              <p className={`${NeuePlakFontBold.className} text-[9px] text-[#717273]`}>LOSSES</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
