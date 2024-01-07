import React from "react";
import SearchIcon from "@/app/assets/svg/SearchIcon.svg";
import { useState, ChangeEvent } from "react";
import Image from "next/image";
import { NeuePlakFont, NeuePlakFontBold } from "@/app/utils/NeuePlakFont";
import Profilepic from "@/app/assets/svg/profile.svg";
import { useUserContext } from "@/app/components/useUserContext";

import { AllUsersType } from "@/app/types/alluserstype";
import getAllUsers from "@/app/api/Profile/getAllUsers";
import { useRouter } from "next/navigation";
import ProfileImg from "@/app/assets/svg/profileimg.svg";


export default function LittleSearchBar({ onClick }: { onClick: (data: string) => void }) {
  const [openMapModal, setOpenMapMoadl] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [dataAllUsers, setdataAllUsers] = useState<Array<AllUsersType>>([]);
  const { userData } = useUserContext();
  async function handlChange(event: ChangeEvent<HTMLInputElement>) {
    setInputValue(event.target.value.toLowerCase());
    if (userData.id) {
      const result = await getAllUsers(userData.id);
      setdataAllUsers(
        result.filter((value: AllUsersType) => {
          return (
            event.target.value &&
            value &&
            value.nickName &&
            value.nickName.toLocaleLowerCase().includes(event.target.value.toLowerCase())
          );
        })
      );
    }
  }
  return (
    <div className=" w-full h-10 md:h-11 lg:h-14 xl:h-16 2xl:h-20 mt-2 lg:mt-3">
      <div className="flex justify-center items-center w-full h-full">
        <div className="flex justify-center items-center md:w-[80%] xl:w-[90%] h-[80%] bg-[#252134] rounded-[8px]">
          <Image
            draggable={false}
            className="mr-1 md:w-5 md:h-5 xl:w-7 xl:h-7 2xl:w-9 2xl:h-9"
            src={SearchIcon.src}
            width={14}
            height={12}
            alt="Search icon"
          />
          <input
            className={`w-[80%] ml-1 border-0 text-white ${NeuePlakFont.className} bg-transparent focus:outline-none focus:ring-0 focus:ring-transparent md:text-[18px] xl:text-[24px] 2xl:text-[30px]`}
            style={{ outline: "none" }}
            type="search"
            placeholder="Search"
            value={inputValue}
            onChange={handlChange}
            id="little-search-id"
          />
        </div>
      </div>
      <div className="w-full max-h-[260px] overflow-y-auto">
        {dataAllUsers.map((user, index) => {
          return (
            <div
              key={index}
              className="flex p-3 lg:p-4 xl:p-6 2xl:p-8 gap-1 md:gap-2 hover:bg-slate-500 cursor-pointer"
              //onClick={(user.id) => onClick(user.id)}
              onClick={() => onClick(user.id)}
            >
              <Image
                draggable={false}
                className="sm:w-6 sm:h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 xl:w-12 xl:h-12 2xl:w-16 2xl:h-16 rounded-full"
                src={user.photo_path === 'default_img' ? `${ProfileImg.src}` : user.photo_path}
                width={22}
                height={22}
                alt="profile pic"
              />
              <p
                className={`${NeuePlakFont.className} text-white sm:text-[18px] md:text-[22px] lg:text-[28px] xl:text-[35px] 2xl:text-[40px]`}
              >
                {user.nickName}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
