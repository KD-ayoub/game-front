import React, { useEffect, useState } from "react";

import Image from "next/image";
import { NeuePlakFont, NeuePlakFontBold } from "../../utils/NeuePlakFont";
import BgProfileinfo from "@/app/assets/svg/bgProfileinfo.svg";
import ProfileImg from "@/app/assets/svg/profileimg.svg";
import FollowImg from "@/app/assets/svg/profileInfo/follow.svg";
import ChallengeImg from "@/app/assets/svg/profileInfo/challenge.svg";
import MessageImg from "@/app/assets/svg/profileInfo/message.svg";
import BlockImg from "@/app/assets/svg/profileInfo/block.svg";
import UnfollowImg from "@/app/assets/svg/profileInfo/unfollow.svg";
import { MainProfileType } from "@/app/types/mainprofiletype";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function ProfileInfo({
  Isloaded,
  dataprofile,
}: {
  Isloaded: boolean;
  dataprofile: MainProfileType;
}) {
  const [Follow, setFollow] = useState(false);
  const pathname = usePathname() === "/profile";
  console.log("pathname; ", pathname);

  function handlFollowClick() {
    // send folow request
    setFollow(true);
  }
  function handlUnfollowClick() {
    // send unfollow request
    setFollow(false);
  }
  if (Isloaded) {
    return (
      <div className="md:flex-grow md:basis-1/2 w-auto h-[222px] md:h-[185px] lg:h-[222px] xl:h-[265px] 2xl:h-[320px] relative bg-[#110D1F] rounded-[20px] animate-pulse">
        <div className="absolute top-[20%] md:top-[35%] -translate-y-1/2 -translate-x-1/2 left-1/2 md:left-[50px] lg:left-[70px] xl:left-[80px] 2xl:left-[122px] ">
          <div className="w-[60px] h-[60px] md:w-20 md:h-20 lg:w-24 lg:h-24 xl:w-28 xl:h-28 2xl:w-36 2xl:h-36 rounded-full bg-[#302B43]"></div>
        </div>
        <div className="absolute top-[35%] md:top-[65%] md:left-[3%] w-full h-10 flex justify-center items-center md:justify-start">
          <div className="w-[75%] h-7 rounded-xl bg-[#302B43]"></div>
        </div>
        <div className="absolute top-[55%] md:top-[65%] md:left-[3%] w-full p-2 h-20 rounded-[20px] bg-[#302B43] md:hidden"></div>
        <div className="hidden md:block md:w-[70%] md:h-24 md:absolute md:left-[27%] 2xl:left-[22%] md:top-3 p-2 h-20 xl:h-32 rounded-[20px] bg-[#302B43] "></div>
      </div>
    );
  }
  const Isimage =
    dataprofile.photo_path === "default_img"
      ? `${ProfileImg.src}`
      : dataprofile.photo_path;
  const textsize = dataprofile.full_name.length >= 23 ? "text-[12px]" : "";
  return (
    <div className="m-3 mt-2 md:ml-5 lg:ml-10 2xl:ml-16 lg:mr-[100px] md:flex-grow md:basis-1/2">
      <div className="w-auto h-[222px] md:h-[185px] lg:h-[222px] xl:h-[265px] 2xl:h-[320px] rounded-[20px] relative bg-[#110D1F]">
        <Image
          className="object-cover rounded-[20px]"
          src={BgProfileinfo.src}
          alt="bg profile info"
          fill
        />
        <div className="md:w-full md:h-full md:relative">
          <div className="absolute top-[20%] md:top-[35%] -translate-y-1/2 -translate-x-1/2 left-1/2 md:left-[50px] lg:left-[70px] xl:left-[80px] 2xl:left-[122px] ">
            <Image
              className="md:w-20 md:h-20 lg:w-24 lg:h-24 xl:w-28 xl:h-28 2xl:w-36 2xl:h-36 rounded-full"
              src={Isimage}
              width={60}
              height={60}
              alt="profile image"
            />
            {/* fetch image */}
          </div>
          <div className="absolute top-[35%] md:top-[65%] md:left-[3%] w-full">
            <p
              className={`text-center ${textsize} md:text-left md:text-[18px] lg:text-[22px] xl:text-[28px] 2xl:text-[35px] ${NeuePlakFontBold.className} text-white`}
            >
              {dataprofile.full_name}
            </p>
            <p
              className={`${NeuePlakFont.className} text-center md:text-left text-[12px] lg:text-[16px] xl:text-[18px] 2xl:text-[24px] text-[#E95A3A]`}
            >
              {`@${dataprofile.nickName}`}
            </p>
          </div>

          <div className="absolute top-[55%] w-full md:hidden">
            <div className="flex justify-around items-center">
              <div className="flex flex-col items-center">
                <p className={`${NeuePlakFontBold.className} text-[14px] text-white`}>
                  {dataprofile.friend_number}
                </p>
                <p
                  className={`${NeuePlakFontBold.className} text-[12px] text-[#717273]`}
                >
                  Friends
                </p>
              </div>
              <div className="flex flex-col items-center">
                <p className={`${NeuePlakFontBold.className} text-[14px] text-white`}>
                  {dataprofile.level}
                </p>
                <p
                  className={`${NeuePlakFontBold.className} text-[12px] text-[#717273]`}
                >
                  Level
                </p>
              </div>
              <div className="flex flex-col items-center">
                <p
                  className={`${NeuePlakFont.className} text-[14px] text-[#E95A3A]`}
                >
                  {dataprofile.is_active}
                </p>
                <p
                  className={`${NeuePlakFontBold.className} text-[12px] text-[#717273]`}
                >
                  status
                </p>
              </div>
            </div>
          </div>
          {/* add follow , unfollow , challenge , block and message */}
          <div className="absolute top-[78%] w-full md:hidden flex justify-evenly">
            {!pathname && !Follow && (
              <div
                className="w-9 h-9 rounded-full bg-[#E95A3A] relative"
                onClick={handlFollowClick}
              >
                <Image
                  className="absolute top-[2px] left-[5px]"
                  src={FollowImg.src}
                  width={29}
                  height={27}
                  alt="follow icon"
                />
              </div>
            )}
            {!pathname && Follow && (
              <div
                className="w-9 h-9 rounded-full bg-[#4A4853] relative"
                onClick={handlUnfollowClick}
              >
                <Image
                  className="absolute top-[2px] left-[6px]"
                  src={UnfollowImg.src}
                  width={25}
                  height={27}
                  alt="follow icon"
                />
              </div>
            )}
            {!pathname && (
              <div className="w-9 h-9 rounded-full bg-[#E95A3A] relative">
                <Image
                  className="absolute top-[5px] left-[6px]"
                  src={ChallengeImg.src}
                  width={25}
                  height={20}
                  alt="follow icon"
                />
              </div>
            )}
            {!pathname && (
              <div className="w-9 h-9 rounded-full bg-[#E95A3A] relative">
                <Image
                  className="absolute top-[5px] left-[2px]"
                  src={MessageImg.src}
                  width={31}
                  height={30}
                  alt="follow icon"
                />
              </div>
            )}
            {!pathname && (
              <div className="w-9 h-9 rounded-full bg-[#4A4853] relative">
                <Image
                  className="absolute top-[7px] left-[7px]"
                  src={BlockImg.src}
                  width={22}
                  height={22}
                  alt="follow icon"
                />
              </div>
            )}
            {pathname && (
              <div className="flex justify-center">
                <Link href={"/settings"}>
                  <button
                    className={`w-32 h-8 bg-[#E95A3A] text-white rounded-3xl ${NeuePlakFont.className}`}
                  >
                    Edit Profile
                  </button>
                </Link>
              </div>
            )}
          </div>
          <div className="hidden md:block md:w-[70%] md:h-24 md:absolute md:left-[27%] 2xl:left-[22%] md:top-3 ">
            <p
              className={`${NeuePlakFont.className} text-[16px] lg:text-[18px] xl:text-[22px] 2xl:text-[30px] text-[#E95A3A]`}
            >
              {dataprofile.is_active}
            </p>
            <div className="md:w-full md:h-10">
              <p
                className={`${NeuePlakFont.className} text-white text-[9px] lg:text-[11px] xl:text-[14px] 2xl:text-[20px] text-end`}
              >
                80%
              </p>
              {/* calcul the percentage and adjust the width  */}
              <div>
                <div className="md:w-full md:bg-[#4A4953] md:rounded-full md:h-2.5 xl:h-3 ">
                  <div className="md:bg-[#E95A3A] md:h-2.5 xl:h-3 md:rounded-full md:w-[80%]"></div>
                </div>
              </div>
              <p
                className={`${NeuePlakFont.className} text-[9px] lg:text-[11px] xl:text-[14px] 2xl:text-[20px] text-end text-white`}
              >
                {`Level ${dataprofile.level}`}
              </p>
              <div className="md:flex md:justify-between">
                <div className="flex flex-col justify-start">
                  <p
                    className={`${NeuePlakFont.className} md:text-[14px] lg:text-[18px] xl:text-[22px] 2xl:text-[28px] md:text-[#717273]`}
                  >
                    Friends
                  </p>
                  <p
                    className={`${NeuePlakFont.className} text-white md:text-[10px] lg:text-[14px] xl:text-[18px] 2xl:text-[24px] md:text-center`}
                  >
                    {dataprofile.friend_number}
                  </p>
                </div>
                {!pathname && !Follow && (
                  <button
                    className={`hidden xl:block xl:w-28 xl:h-8 2xl:w-40 2xl:h-10 md:bg-[#E95A3A] md:rounded-3xl ${NeuePlakFont.className} text-white xl:text-[18px] 2xl:text-[24px]`}
                    onClick={handlFollowClick}
                  >
                    Add Friend
                  </button>
                )}
                {!pathname && Follow && (
                  <button
                    className={`hidden xl:block xl:w-28 xl:h-8 2xl:w-40 2xl:h-10 md:bg-[#4A4853] md:rounded-3xl ${NeuePlakFont.className} text-white xl:text-[18px] 2xl:text-[24px]`}
                    onClick={handlUnfollowClick}
                  >
                    Unfriend
                  </button>
                )}
                {!pathname && (
                  <button
                    className={`hidden 2xl:block xl:w-28 xl:h-8 2xl:w-40 2xl:h-10 md:bg-[#E95A3A] md:rounded-3xl ${NeuePlakFont.className} text-white xl:text-[18px] 2xl:text-[24px]`}
                  >
                    Challenge
                  </button>
                )}
                {!pathname && (
                  <button
                    className={`hidden 2xl:block xl:w-28 xl:h-8 2xl:w-40 2xl:h-10 md:bg-[#E95A3A] md:rounded-3xl ${NeuePlakFont.className} text-white xl:text-[18px] 2xl:text-[24px]`}
                  >
                    Message
                  </button>
                )}
                {!pathname && (
                  <button
                    className={`hidden 2xl:block xl:w-28 xl:h-8 2xl:w-40 2xl:h-10 md:bg-[#4A4853] md:rounded-3xl ${NeuePlakFont.className} text-white xl:text-[18px] 2xl:text-[24px]`}
                  >
                    Block
                  </button>
                )}
                {!pathname && !Follow && (
                  <div
                    className="w-9 h-9 rounded-full bg-[#E95A3A] relative xl:hidden"
                    onClick={handlFollowClick}
                  >
                    <Image
                      className="absolute top-[2px] left-[5px]"
                      src={FollowImg.src}
                      width={29}
                      height={27}
                      alt="follow icon"
                    />
                  </div>
                )}
                {!pathname && Follow && (
                  <div
                    className="w-9 h-9 rounded-full bg-[#4A4853] relative xl:hidden"
                    onClick={handlUnfollowClick}
                  >
                    <Image
                      className="absolute top-[2px] left-[6px]"
                      src={UnfollowImg.src}
                      width={25}
                      height={27}
                      alt="follow icon"
                    />
                  </div>
                )}
                {!pathname && (
                  <div className="w-9 h-9 xl:w-10 xl:h-10 2xl:hidden rounded-full bg-[#E95A3A] relative">
                    <Image
                      className="absolute top-[5px] left-[6px] xl:left-1 xl:top-2 xl:w-8 xl:h-6"
                      src={ChallengeImg.src}
                      width={25}
                      height={20}
                      alt="follow icon"
                    />
                  </div>
                )}
                {!pathname && (
                  <div className="w-9 h-9 xl:w-10 xl:h-10 2xl:hidden rounded-full bg-[#E95A3A] relative">
                    <Image
                      className="absolute top-[5px] left-[2px] xl:w-9 xl:h-8"
                      src={MessageImg.src}
                      width={31}
                      height={30}
                      alt="follow icon"
                    />
                  </div>
                )}
                {!pathname && (
                  <div className="w-9 h-9 xl:w-10 xl:h-10 2xl:hidden rounded-full bg-[#4A4853] relative">
                    <Image
                      className="absolute top-[7px] left-[7px] xl:left-[6px] xl:top-[6px] xl:w-7 xl:h-7"
                      src={BlockImg.src}
                      width={22}
                      height={22}
                      alt="follow icon"
                    />
                  </div>
                )}
                {pathname && (
                  <Link href={"/settings"}>
                    <button
                      className={`md:mt-1 md:w-20 md:h-6 lg:w-24 lg:h-7 xl:w-28 xl:h-8 2xl:w-40 2xl:h-10 md:bg-[#E95A3A] md:rounded-3xl ${NeuePlakFont.className} text-white md:text-[10px] lg:text-[14px] xl:text-[18px] 2xl:text-[24px]`}
                    >
                      Edit Profile
                    </button>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
