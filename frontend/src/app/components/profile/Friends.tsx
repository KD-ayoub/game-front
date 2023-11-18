import { NeuePlakFont, NeuePlakFontBold } from "@/app/utils/NeuePlakFont";
import ProfileImg from "@/app/assets/svg/profileimg.svg";
import Iconplus from "@/app/assets/svg/iconPlus.svg";
import Iconmsg from "@/app/assets/svg/Iconmsg.svg";
import Iconprofile from "@/app/assets/svg/Iconprofile.svg";
import Image from "next/image";
import React from "react";
import { FriendsType } from "@/app/types/friendstype";

export default function Friends({
  Isloaded,
  dataFriends,
}: {
  Isloaded: boolean;
  dataFriends: FriendsType[];
}) {
  return (
    <div className="m-3 mt-2 md:ml-5 lg:ml-10 lg:basis-1/2">
      <div
        className={`${NeuePlakFontBold.className} md:text-[18px] lg:text-[24px] xl:text-[28px] 2xl:text-[45px] `}
      >
        Friends
      </div>
      <div className="w-auto h-[250px] lg:h-[350px] xl:h-[500px] 2xl:h-[800px] bg-gradient-to-b from-[#110D1F] via-[#110D1F] to-[#2d2a38] rounded-[25px] pl-1 overflow-y-auto max-h-[250px] lg:max-h-[350px] xl:max-h-[500px] 2xl:max-h-[800px]">
        {Isloaded && (
          <div className="h-full w-full flex flex-col p-2 2xl:p-10 items-center gap-6 animate-pulse">
            <div className="w-full h-6 sm:h-8 2xl:h-20 flex items-center gap-2">
              <div className="w-[25px] h-[25px] sm:w-[30px] sm:h-[30px] md:w-[35px] md:h-[35px] lg:w-[42px] lg:h-[42px] xl:w-12 xl:h-12 2xl:w-20 2xl:h-20 rounded-full bg-[#302B43] "></div>
              <div className="w-32 sm:w-80 h-5 sm:h-6 2xl:h-10 rounded-[10px] 2xl:rounded-[20px] bg-[#302B43]"></div>
            </div>
            <div className="w-full h-6 sm:h-8 2xl:h-20 flex items-center gap-2">
              <div className="w-[25px] h-[25px] sm:w-[30px] sm:h-[30px] md:w-[35px] md:h-[35px] lg:w-[42px] lg:h-[42px] xl:w-12 xl:h-12 2xl:w-20 2xl:h-20 rounded-full bg-[#302B43] "></div>
              <div className="w-32 sm:w-80 h-5 sm:h-6 2xl:h-10 rounded-[10px] 2xl:rounded-[20px] bg-[#302B43]"></div>
            </div>
            <div className="w-full h-6 sm:h-8 2xl:h-20 flex items-center gap-2">
              <div className="w-[25px] h-[25px] sm:w-[30px] sm:h-[30px] md:w-[35px] md:h-[35px] lg:w-[42px] lg:h-[42px] xl:w-12 xl:h-12 2xl:w-20 2xl:h-20 rounded-full bg-[#302B43] "></div>
              <div className="w-32 sm:w-80 h-5 sm:h-6 2xl:h-10 rounded-[10px] 2xl:rounded-[20px] bg-[#302B43]"></div>
            </div>
            <div className="w-full h-6 sm:h-8 2xl:h-20 flex items-center gap-2">
              <div className="w-[25px] h-[25px] sm:w-[30px] sm:h-[30px] md:w-[35px] md:h-[35px] lg:w-[42px] lg:h-[42px] xl:w-12 xl:h-12 2xl:w-20 2xl:h-20 rounded-full bg-[#302B43] "></div>
              <div className="w-32 sm:w-80 h-5 sm:h- 2xl:h-10 rounded-[10px] 2xl:rounded-[20px] bg-[#302B43]"></div>
            </div>
          </div>
        )}
        {!Isloaded &&
          dataFriends.length !== 0 && dataFriends.map((data) => {
            const Isimage =
              data.photo_path === "defautl_img"
                ? `${ProfileImg.src}`
                : data.photo_path;
            return (
              <div className="p-2 lg:p-3 2xl:p-5 flex justify-between ">
                <div className="flex gap-1 md:gap-5 items-center">
                  <Image
                    className="sm:w-[30px] sm:h-[30px] md:w-[35px] md:h-[35px] lg:w-[42px] lg:h-[42px] xl:w-12 xl:h-12 2xl:w-20 2xl:h-20"
                    src={Isimage}
                    width={25}
                    height={25}
                    alt="profile image"
                  />
                  <p
                    className={`${NeuePlakFont.className} md:text-[18px] lg:text-[22px] xl:text-[24px] 2xl:text-[38px]`}
                  >
                    {data.nickName}
                  </p>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}
