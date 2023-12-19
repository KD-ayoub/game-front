import React, { ChangeEvent } from "react";
import { NeuePlakFont, NeuePlakFontBold } from "@/app/utils/NeuePlakFont";
import { useState } from "react";

export default function GameLevel() {
  const [level, setLevel] = useState("");
  function handlChange(e: ChangeEvent<HTMLInputElement>) {
    setLevel(e.target.value);
    console.log("check box", e.target.value);
  }
  function handlNextClick() {
    if (level) {
        console.log("go next");
    }
  }

  console.log("levelll", level);
  return (
    <div className="flex justify-center items-center flex-col gap-2 lg:gap-6 xl:gap-7 2xl:gap-9 w-[178px] h-[179px] sm:w-[220px] sm:h-[221px] lg:w-[320px] lg:h-[321px] xl:w-[420px] xl:h-[421px] 2xl:w-[620px] 2xl:h-[621px] bg-[#15131D] rounded-[10px] md:rounded-[13px] lg:rounded-[15px] xl:rounded-[20px] 2xl:rounded-[25px]">
      <div
        className={`${NeuePlakFont.className} md:text-[20px] lg:text-[28px] xl:text-[35px] 2xl:text-[44px]`}
      >
        Choose a bot level
      </div>
      <div className="flex flex-col">
        <label
          className={`${NeuePlakFont.className} md:text-[18px] lg:text-[25px] xl:text-[30px] 2xl:text-[36px]`}
          htmlFor="easy"
        >
          <input
            className="m-1 xl:m-2 2xl:m-3 lg:w-4 lg:h-4 xl:w-6 xl:h-6 2xl:w-8 2xl:h-8"
            type="radio"
            name="level"
            id="easy"
            value="Easy"
            onChange={handlChange}
          />
          Easy
        </label>
        <label
          className={`${NeuePlakFont.className} md:text-[18px] lg:text-[25px] xl:text-[30px] 2xl:text-[36px]`}
          htmlFor="medium"
        >
          <input
            className="m-1 xl:m-2 2xl:m-3 lg:w-4 lg:h-4 xl:w-6 xl:h-6 2xl:w-8 2xl:h-8"
            type="radio"
            name="level"
            id="medium"
            value="Medium"
            onChange={handlChange}
          />
          Medium
        </label>
        <label
          className={`${NeuePlakFont.className} md:text-[18px] lg:text-[25px] xl:text-[30px] 2xl:text-[36px]`}
          htmlFor="hard"
        >
          <input
            className="m-1 xl:m-2 2xl:m-3 lg:w-4 lg:h-4 xl:w-6 xl:h-6 2xl:w-8 2xl:h-8"
            type="radio"
            name="level"
            id="hard"
            value="Hard"
            onChange={handlChange}
          />
          Hard
        </label>
      </div>
      <div
        className="w-20 h-8 md:w-24 md:h-9 lg:w-28 lg:h-10 xl:w-36 xl:h-12 2xl:w-44 2xl:h-16 bg-[#E95A3A] rounded-[20px] xl:rounded-[24px] 2xl:rounded-[28px] flex justify-center items-center"
        onClick={handlNextClick}
      >
        <p
          className={`${NeuePlakFont.className} md:text-[20px] lg:text-[25px] xl:text-[30px] 2xl:text-[36px]`}
        >
          Next
        </p>
      </div>
    </div>
  );
}
