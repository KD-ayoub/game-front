"use client";

import Image from "next/image";
import Dashboard from "@/app/utils/dashboard.svg";
import Gamecont from "@/app/utils/gamecont.svg";
import Messages from "@/app/utils/messages.svg";
import User from "@/app/utils/user.svg";
import Settings from "@/app/utils/settings.svg";
import Logout from "@/app/utils/logout.svg";
import Sideimg from "@/app/utils/sideimg.svg";
import { useState } from "react";
import NavbarIcons from "./NavbarIcons";

export default function SideBar() {

  const [ClickIndex, setClickIndex] = useState(-1);

  function handlClick(Index: number) {
    setClickIndex(Index);
  }
  
  return (
    <section className="w-10 sm:w-11 md:w-14 xl:w-20 2xl:w-32 h-screen bg-gradient-to-b from-[#110D1F] //hidden// sm:block relative">
      <Image
        className="object-cover w-full h-full absolute"
        src={Sideimg.src}
        alt="Sideimg"
        width={0}
        height={0}
      />
      <div className="flex flex-col items-center gap-10 xl:gap-12 2xl:gap-20 pt-20 sm:pt-24 md:pt-24 xl:pt-36 2xl:pt-72 brightness-200">
        <div className="relative" onClick={() => handlClick(0)}>
          <NavbarIcons Srcfile={Dashboard.src} isClicked={ClickIndex === 0} alt="Dashboard icon" />
        </div>
        <div className="relative" onClick={() => handlClick(1)}>
          <NavbarIcons Srcfile={Gamecont.src} isClicked={ClickIndex === 1} alt="Game controller" />
        </div>
        <div className="relative" onClick={() => handlClick(2)}>
          <NavbarIcons Srcfile={Messages.src} isClicked={ClickIndex === 2} alt="Messages" />
        </div>
        <div className="relative" onClick={() => handlClick(3)}>
          <NavbarIcons Srcfile={User.src} isClicked={ClickIndex === 3} alt="User" />
        </div>
        <div className="relative" onClick={() => handlClick(4)}>
          <NavbarIcons Srcfile={Settings.src} isClicked={ClickIndex === 4} alt="Settings" />
        </div>
      </div>
      <div className="flex justify-center pt-40 sm:pt-36 md:pt-32 xl:pt-60 2xl:pt-96 brightness-200">
        <Image
          className="sm:w-5 md:w-6 xl:w-8 2xl:w-14"
          src={Logout.src}
          width={18}
          height={18}
          alt="Logout"
        />
      </div>
    </section>
  );
}
