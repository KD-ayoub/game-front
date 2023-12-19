import React from "react";
import Image from "next/image";
import { NeuePlakFont, NeuePlakFontBold } from "@/app/utils/NeuePlakFont";

export default function PlayMode({ Picture, Mode }: { Picture:string, Mode: string }) {
  return (
    <div>
      <Image
        className="sm:w-[220px] sm:h-[221px] lg:w-[320px] lg:h-[321px] xl:w-[420px] xl:h-[421px] 2xl:w-[620px] 2xl:h-[621px]"
        src={Picture}
        width={178}
        height={179}
        alt="with friend pic"
      />
      <div className="absolute top-[80%]">
        <p
          className={`${NeuePlakFontBold.className} p-1 lg:p-3 xl:p-5 md:text-[18px] lg:text-[25px] xl:text-[32px] 2xl:text-[40px]`}
        >
          {Mode}
        </p>
      </div>
    </div>
  );
}
