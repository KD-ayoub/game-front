import React from "react";
import Image from "next/image";

import { NeuePlakFont, NeuePlakFontBold } from "../utils/NeuePlakFont";

export default function DropdownMenu({
  ImageSource, Item
}: {
    ImageSource: string;
    Item: string;
}) {
  return (
    <div className="flex pl-1 gap-2  items-center">
      <Image
        draggable={false}
        className="sm:w-[14px] sm:h-[14px] lg:w-[20px] lg:h-[20px] xl:w-[30px] xl:h-[30px] 2xl:w-[45px] 2xl:h-[45px]"
        src={ImageSource}
        width={12}
        height={12}
        alt="Profile Drop notif"
      />
      <li
        className={`${NeuePlakFont.className} sm:text-[18px] lg:text-[25px] xl:text-[32px] 2xl:text-[45px]`}
      >
        {Item}
      </li>
    </div>
  );
}
