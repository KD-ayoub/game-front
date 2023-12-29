import { NeuePlakFontBold } from "@/app/utils/NeuePlakFont";
import React from "react";
import Image from "next/image";
import BlueAchiev from "@/app/assets/svg/achievement/blue.svg";
import PinkAchiev from "@/app/assets/svg/achievement/pink.svg";
import RaketAchiev from "@/app/assets/svg/achievement/raket.svg";
import Manachiev from "@/app/assets/svg/achievement/man.svg";
import TrophiAchiev from "@/app/assets/svg/achievement/trophi.svg";
import { AchievementType } from "@/app/types/achievementtype";

export default function Achievements({
  Isloaded,
  dataAchievement,
}: {
  Isloaded: boolean;
  dataAchievement: AchievementType;
}) {
  return (
    <div className="m-3 mt-2">
      <div
        className={`${NeuePlakFontBold.className} text-white md:text-[18px] lg:text-[24px] xl:text-[28px] 2xl:text-[45px]`}
      >
        Achievement
      </div>
      <div className="w-full flex gap-2 sm:gap-3 md:gap-4 lg:gap-5 xl:gap-6 2xl:gap-7 overflow-x-auto">
        { !Isloaded && dataAchievement.kickstart && ( <Image
          draggable={false}
          className="md:w-[50px] md:h-[46px] lg:w-[60px] lg:h-[55px] xl:w-[65px] xl:h-[60px] 2xl:w-[90px] 2xl:h-[80px] "
          src={BlueAchiev.src}
          width={45}
          height={41}
          alt="kickstart achievement"
        />)}
        { !Isloaded && dataAchievement.social && (<Image
          draggable={false}
          className="md:w-[50px] md:h-[46px] lg:w-[60px] lg:h-[55px] xl:w-[65px] xl:h-[60px] 2xl:w-[90px] 2xl:h-[80px]"
          src={PinkAchiev.src}
          width={45}
          height={41}
          alt="social achievement"
        />)}
        { !Isloaded && dataAchievement.first_game && (<Image
          draggable={false}
          className="md:w-[50px] md:h-[46px] lg:w-[60px] lg:h-[55px] xl:w-[65px] xl:h-[60px] 2xl:w-[90px] 2xl:h-[80px]"
          src={RaketAchiev.src}
          width={45}
          height={41}
          alt="first game achievement"
        />)}
        { !Isloaded && dataAchievement.level_1 && (<Image
          draggable={false}
          className="md:w-[50px] md:h-[46px] lg:w-[60px] lg:h-[55px] xl:w-[65px] xl:h-[60px] 2xl:w-[90px] 2xl:h-[80px]"
          src={Manachiev.src}
          width={45}
          height={41}
          alt="level 1 achievement"
        />)}
        { !Isloaded && dataAchievement.level_5 && (<Image
          draggable={false}
          className="md:w-[50px] md:h-[46px] lg:w-[60px] lg:h-[55px] xl:w-[65px] xl:h-[60px] 2xl:w-[90px] 2xl:h-[80px]"
          src={TrophiAchiev.src}
          width={45}
          height={41}
          alt="level 5 achievement"
        />)}
      </div>
    </div>
  );
}
