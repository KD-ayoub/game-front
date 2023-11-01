"use client";

import Image from "next/image";
import Logo from "@/app/assets/svg/logo.svg";
import Nav from "@/app/assets/svg/Navbar.svg";
import Bell from "@/app/assets/svg/bell.svg";
import { Humburgtype } from "../types/humburgtype";
import { useEffect, useState } from "react";

// this is only for testing need to merge with backend
import getData from "./getData";
import { Notification } from "../types/notificationtype";
///////

export default function Header({
  isHumburgClicked,
  setisHumburgClicked,
}: Humburgtype) {
  const [showDropdownNotif, setshowDropdownNotif] = useState(false);
  const [notificationData, setnotificationData] = useState<Array<Notification>>(
    []
  ); /// this need to be merged with backend

  function handlClick() {
    setisHumburgClicked(!isHumburgClicked);
  }

  function handlDropdownNotif() {
    console.log(showDropdownNotif);
    setshowDropdownNotif(!showDropdownNotif);
  }

  useEffect(() => {
    async function fetchdata() {
      setnotificationData(await getData());
    }
    fetchdata();
  }, []);

  const unreadNotif = notificationData.some((data) => !data.read);
  function markNotifAsRead(notifId: number) {
    setnotificationData(
      notificationData.map((obj) => {
        if (obj.id === notifId) {
          return { ...obj, read: true };
        }
        return obj;
      })
    );
  }

  return (
    <>
      <header className="text-white flex justify-between w-full absolute z-10">
        <nav className="flex sm:w-11 sm:h-11 md:w-14 md:h-14 lg:w-[72px] lg:h-[72px] xl:w-[88px] xl:h-[88px] 2xl:w-32 2xl:h-32 relative">
          <img src={Logo.src} className="p-2 2xl:p-4" />
          <img src={Nav.src} className="p-2 sm:hidden" onClick={handlClick} />
        </nav>
        <nav className="flex items-center gap-1 sm:w-[170px] sm:h-11 md:w-48 md:h-14 lg:h-[72px] lg:w-72 xl:h-[88px] xl:w-80 2xl:h-32 2xl:w-[480px]">
          <div
            className="w-[29.6px] h-[29.6px] sm:w-[33.6px] sm:h-[33.6px] md:w-10 md:h-10 lg:w-14 lg:h-14 xl:w-16 xl:h-16 2xl:w-24 2xl:h-24 bg-[#11F] rounded-full flex justify-center items-center relative "
            onClick={handlDropdownNotif}
          >
            <Image
              className="sm:w-[22px] sm:h-[22px] lg:w-[30px] lg:h-[30px] xl:w-[35px] xl:h-[35px] 2xl:w-[50px] 2xl:h-[50px] "
              src={Bell.src}
              width={20}
              height={20}
              alt="Bell logo"
            />
            {unreadNotif && (
              <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 lg:w-3 lg:h-3 xl:h-3.5 xl:w-3.5 2xl:w-4 2xl:h-4 bg-[#E95A3A] rounded-full absolute top-[5px] md:top-[8px] lg:top-[11px] xl:top-3 2xl:top-6 left-[16px] sm:left-[18px] md:left-[22px] lg:left-[30px] xl:left-[34px] 2xl:left-[50px]"></span>
            )}
          </div>
          {showDropdownNotif && (
            <div className="absolute top-[43px] md:top-[52px] lg:top-[72px] xl:top-[85px] 2xl:top-32 right-6 sm:right-[104px] md:right-32 lg:right-56 xl:right-60 2xl:right-[352px] w-52 md:w-64 lg:w-80 xl:w-[400px] 2xl:w-[500px] bg-[#15131D] rounded-xl //before:absolute before:bg-[#15131D] before:content-[''] before:w-4 before:h-4 before:-top-1 before:right-3 before:rotate-45//">
              <ul className="flex flex-col gap-1 pl-2 ">
                {notificationData.map((data) => {
                  return (
                    <li key={data.id} onClick={() => markNotifAsRead(data.id)}>
                      {data.message}
                    </li>
                  ); //read more in /utils/needwork.md
                })}
              </ul>
            </div>
          )}
          <div>ergrgsg</div>
        </nav>
      </header>
    </>
  );
}
