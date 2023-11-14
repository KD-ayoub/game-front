import React from "react";
import { NeuePlakFont, NeuePlakFontBold } from "@/app/utils/NeuePlakFont";
import ProfileImg from "@/app/assets/svg/profileimg.svg";
import Image from "next/image";

export default function GameHistory() {
  return (
    <div className="m-3 mt-2 lg:mr-[100px] lg:basis-1/2">
      <div className={`${NeuePlakFontBold.className} md:text-[18px] lg:text-[24px] xl:text-[28px] 2xl:text-[45px]`}>Game History</div>
      <div className="w-auto h-[280px] lg:h-[350px] xl:h-[500px] 2xl:h-[800px] bg-gradient-to-b from-[#110D1F] via-[#110D1F] to-[#2d2a38] rounded-[25px] pl-1 ">
        <div className="overflow-x-auto overflow-y-auto max-h-[280px] lg:max-h-[350px] xl:max-h-[500px] 2xl:max-h-[800px]">
          <table className="w-full">
            <thead className="border-b-[1px]">
              <tr>
                <th className={`${NeuePlakFont.className} text-[14px] md:text-[16px] lg:text-[20px] xl:text-[24px] 2xl:text-[35px] pl-3 `}>Player</th>
                <th className={`${NeuePlakFont.className} text-[14px] md:text-[16px] lg:text-[20px] xl:text-[24px] 2xl:text-[35px] pl-5`}>Result</th>
                <th className={`${NeuePlakFont.className} text-[14px] md:text-[16px] lg:text-[20px] xl:text-[24px] 2xl:text-[35px] pl-5`}>Level xp</th>
                <th className={`${NeuePlakFont.className} text-[14px] md:text-[16px] lg:text-[20px] xl:text-[24px] 2xl:text-[35px] pl-5`}>Time</th>
              </tr>
            </thead>
            <tbody >
              <tr className="text-center even:bg-[#0C0914] ">
                <td className={`flex ${NeuePlakFont.className} text-[14px] sm:text-[18px] lg:text-[22px] xl:text-[24px] 2xl:text-[35px] p-2 gap-1 md:gap-5 items-center`}>
                  <Image
                    className="sm:w-[20px] sm:h-[20px] md:w-[30px] md:h-[30px] lg:w-[36px] lg:h-[36px] xl:w-10 xl:h-10 2xl:w-14 2xl:h-14"
                    src={ProfileImg.src}
                    width={15}
                    height={15}
                    alt="img of a user"
                  />
                  Yaskour
                </td>
                <td className={`${NeuePlakFont.className} text-[9px] sm:text-[11px] md:text-[14px] lg:text-[18px] xl:text-[22px] 2xl:text-[30px] pl-5 text-[#0CFFBB]`}>Win</td>
                <td className={`${NeuePlakFont.className} text-[9px] sm:text-[11px] md:text-[14px] lg:text-[18px] xl:text-[22px] 2xl:text-[30px] pl-5 text-[#0CFFBB]`}>+20xp</td>
                <td className={`${NeuePlakFont.className} text-[9px] sm:text-[11px] md:text-[14px] lg:text-[18px] xl:text-[22px] 2xl:text-[30px] pl-5 text-[#717273]`}>12 minutes ago</td>
              </tr>
              <tr className="text-center even:bg-[#0C0914] ">
                <td className={`flex ${NeuePlakFont.className} text-[14px] sm:text-[18px] lg:text-[22px] xl:text-[24px] 2xl:text-[35px] p-2 gap-1 md:gap-5 items-center`}>
                  <Image
                    className="sm:w-[20px] sm:h-[20px] md:w-[30px] md:h-[30px] lg:w-[36px] lg:h-[36px] xl:w-10 xl:h-10 2xl:w-14 2xl:h-14"
                    src={ProfileImg.src}
                    width={15}
                    height={15}
                    alt="img of a user"
                  />
                  Yaskour
                </td>
                <td className={`${NeuePlakFont.className} text-[9px] sm:text-[11px] md:text-[14px] lg:text-[18px] xl:text-[22px] 2xl:text-[30px] pl-5 text-[#EF443B]`}>Loss</td>
                <td className={`${NeuePlakFont.className} text-[9px] sm:text-[11px] md:text-[14px] lg:text-[18px] xl:text-[22px] 2xl:text-[30px] pl-5 text-[#EF443B]`}>-20xp</td>
                <td className={`${NeuePlakFont.className} text-[9px] sm:text-[11px] md:text-[14px] lg:text-[18px] xl:text-[22px] 2xl:text-[30px] pl-5 text-[#717273]`}>14 minutes ago</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
