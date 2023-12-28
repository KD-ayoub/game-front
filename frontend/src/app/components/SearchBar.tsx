import React, { ChangeEvent, useState } from "react";
import SearchIcon from "@/app/assets/svg/SearchIcon.svg";
import Image from "next/image";
import { NeuePlakFont } from "../utils/NeuePlakFont";
import Profilepic from "@/app/assets/svg/profile.svg";
import { useUserContext } from "./useUserContext";



import { AllUsersType } from "../types/alluserstype";
import getAllUsers from "../api/Profile/getAllUsers";
import { useRouter } from "next/navigation";

export default function SearchBar() {
  const [inputValue, setInputValue] = useState("");
  const router = useRouter();
  const inputStyle = {
    outline: "none",
  };
  const plceholderStyle = {
    ...inputStyle,
    color: "#383546",
  };
  
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
  function handlClick(user: AllUsersType) {
    if (user.nickName === userData.nickName) {
      router.push("/profile");
      return;
    }
    router.push(`/profile/${user.nickName}`);
  }
  console.log("done here", dataAllUsers);
  return (
    <div className="h-[29.6px] sm:h-[33.6px] md:h-10 lg:h-14 xl:h-16 2xl:h-24 w-1/3 bg-[#252134] rounded-full  flex-grow mx-[5px] xl:mx-5 flex items-center relative">
      <div className="flex  gap-1 sm:gap-2 justify-start items-center w-full h-full">
        <Image
          className="ml-3 sm:w-[17px] sm:h-[15px] md:w-5 md:h-4 lg:w-9 lg:h-6 xl:w-[3.25rem] xl:h-8 2xl:w-[5.25rem] 2xl:h-[2.5rem]"
          src={SearchIcon.src}
          width={14}
          height={12}
          alt="Search icon"
        />
        <input
          className={`h-full w-[90%] bg-transparent border-0 focus:outline-none focus:ring-0 focus:ring-transparent text-white mr-1 ${NeuePlakFont.className} md:text-[18px] lg:text-[25px] xl:text-[30px] 2xl:text-[38px]`}
          style={inputValue ? inputStyle : plceholderStyle}
          type="search"
          placeholder="Search"
          value={inputValue}
          onChange={handlChange}
          id="search-id"
        />
      </div>
      {/* need to work on tomorrow  */}
      {dataAllUsers.length > 0 && (
        <div className="w-full h-28 md:h-72 max-w-[700px] bg-[#252134] absolute top-[2.5rem] md:top-[3rem] lg:top-16 lg:left-3 xl:top-[4.75rem] 2xl:top-[6.75rem] rounded-[10px] overflow-y-auto">
          {dataAllUsers.map((user, index) => {
            return (
              <div
                key={index}
                className="flex p-3 lg:p-4 xl:p-6 2xl:p-8 gap-1 md:gap-2 hover:bg-slate-500 cursor-pointer"
                onClick={() => handlClick(user)}
              >
                <Image
                  className="sm:w-6 sm:h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 xl:w-12 xl:h-12 2xl:w-16 2xl:h-16 rounded-full"
                  src={user.photo_path}
                  width={22}
                  height={22}
                  alt="profile pic"
                />
                <p
                  className={`${NeuePlakFont.className} sm:text-[18px] md:text-[22px] lg:text-[28px] xl:text-[35px] 2xl:text-[40px]`}
                >
                  {user.nickName}
                </p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
