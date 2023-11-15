import React, { useEffect, useState } from "react";

import Image from "next/image";
import { NeuePlakFont, NeuePlakFontBold } from "../../utils/NeuePlakFont";
import BgProfileinfo from "@/app/assets/svg/bgProfileinfo.svg";
import ProfileImg from "@/app/assets/svg/profileimg.svg";
import getProfileInfo from "@/app/api/getProfileInfo";
import { MainProfileType } from "@/app/types/mainprofiletype";

export default function ProfileInfo() {
  const [dataprofile, setdataProfile] = useState<MainProfileType>({
    id: "",
    full_name: "",
    nickName: "",
    is_active: "",
    last_activity: "",
    photo_path: "",
    friend_number: 0,
    level: 0,
  });

  useEffect(() => {
    async function fetchdata() {
      setdataProfile(await getProfileInfo());
    }
    fetchdata();
  }, []);
  console.log(dataprofile);
  return (
    <div className="m-3 mt-2 md:ml-5 lg:ml-10 2xl:ml-16 lg:mr-[100px] md:flex-grow md:basis-1/2">
      <div className="w-auto h-[222px] md:h-[185px] lg:h-[222px] xl:h-[265px] 2xl:h-[320px] relative">
        <Image
          className="object-cover rounded-[20px]"
          src={BgProfileinfo.src}
          alt="bg profile info"
          fill
        />
        <div className="md:w-full md:h-full md:relative">
          <div className="absolute top-[20%] md:top-[35%] -translate-y-1/2 -translate-x-1/2 left-1/2 md:left-[50px] lg:left-[70px] xl:left-[80px] 2xl:left-[122px] ">
            <Image
              className="md:w-20 md:h-20 lg:w-24 lg:h-24 xl:w-28 xl:h-28 2xl:w-36 2xl:h-36"
              src={ProfileImg.src}
              width={60}
              height={60}
              alt="profile image"
            />
            {/* fetch image */}
          </div>
          <div className="absolute top-[35%] md:top-[65%] md:left-[3%] w-full">
            <p
              className={`text-center md:text-left md:text-[18px] lg:text-[22px] xl:text-[28px] 2xl:text-[35px] ${NeuePlakFontBold.className}`}
            >
              Hicham Kaddouri
              {/* {dataprofile.full_name} */}
            </p>
            {/* fetch fullname, adjust font size*/}
            <p
              className={`${NeuePlakFont.className} text-center md:text-left text-[12px] lg:text-[16px] xl:text-[18px] 2xl:text-[24px] text-[#E95A3A]`}
            >
              {`@Noobie`}
            </p>
          </div>

          <div className="absolute top-[55%] w-full md:hidden">
            <div className="flex justify-around items-center">
              <div className="flex flex-col items-center">
                <p className={`${NeuePlakFontBold.className} text-[14px] `}>
                  500
                </p>
                <p
                  className={`${NeuePlakFontBold.className} text-[12px] text-[#717273] `}
                >
                  Friends
                </p>
              </div>
              <div className="flex flex-col items-center">
                <p className={`${NeuePlakFontBold.className} text-[14px]`}>
                  18
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
                  at game
                </p>
                <p
                  className={`${NeuePlakFontBold.className} text-[12px] text-[#717273]`}
                >
                  status
                </p>
              </div>
            </div>
          </div>
          <div className="absolute top-[78%] w-full md:hidden">
            <div className="flex justify-center">
              <button
                className={`w-32 h-8 bg-[#E95A3A] rounded-3xl ${NeuePlakFont.className}`}
              >
                Edit Profile
              </button>
            </div>
          </div>
          <div className="hidden md:block md:w-[70%] md:h-24 md:absolute md:left-[27%] 2xl:left-[22%] md:top-3 ">
            <p
              className={`${NeuePlakFont.className} text-[16px] lg:text-[18px] xl:text-[22px] 2xl:text-[30px] text-[#E95A3A]`}
            >
              at game
            </p>
            <div className="md:w-full md:h-10">
              <p
                className={`${NeuePlakFont.className} text-[9px] lg:text-[11px] xl:text-[14px] 2xl:text-[20px] text-end`}
              >
                80%
              </p>
              <div>
                <div className="md:w-full md:bg-gray-200 md:rounded-full md:h-2.5 xl:h-3 md:dark:bg-[#4A4953]">
                  <div className="md:bg-[#E95A3A] md:h-2.5 xl:h-3 md:rounded-full md:w-[80%]"></div>
                </div>
              </div>
              <p
                className={`${NeuePlakFont.className} text-[9px] lg:text-[11px] xl:text-[14px] 2xl:text-[20px] text-end`}
              >
                {`Level 18`}
              </p>
              <div className="md:flex md:justify-between">
                <div className="flex flex-col justify-start">
                  <p
                    className={`${NeuePlakFont.className} md:text-[14px] lg:text-[18px] xl:text-[22px] 2xl:text-[28px] md:text-[#717273]`}
                  >
                    Friends
                  </p>
                  <p
                    className={`${NeuePlakFont.className} md:text-[10px] lg:text-[14px] xl:text-[18px] 2xl:text-[24px] md:text-center`}
                  >
                    500
                  </p>
                </div>
                <button
                  className={`md:mt-1 md:w-20 md:h-6 lg:w-24 lg:h-7 xl:w-28 xl:h-8 2xl:w-40 2xl:h-10 md:bg-[#E95A3A] md:rounded-3xl ${NeuePlakFont.className} md:text-[10px] lg:text-[14px] xl:text-[18px] 2xl:text-[24px]`}
                >
                  Edit Profile
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
