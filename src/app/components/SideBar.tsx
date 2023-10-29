"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import Dashboard from "@/app/utils/dashboard.svg";
import Gamecont from "@/app/utils/gamecont.svg";
import Messages from "@/app/utils/messages.svg";
import User from "@/app/utils/user.svg";
import Settings from "@/app/utils/settings.svg";
import Logout from "@/app/utils/logout.svg";
import Sideimg from "@/app/utils/sideimg.svg";

import NavbarIcons from "./NavbarIcons";

export default function SideBar() {
  const [ClickIndex, setClickIndex] = useState(-1);

  //   function handlClick(Index: number) {
  //     setClickIndex(Index);
  //     console.log(Index);
  //   }

  return (
    <section className="w-10 sm:w-11 md:w-14 lg:w-[72px] xl:w-24 2xl:w-32 h-screen bg-gradient-to-b from-[#110D1F] //hidden// sm:block relative shrink-0">
      <Image
        className="object-cover w-full h-full absolute"
        src={Sideimg.src}
        alt="Sideimg"
        width={0}
        height={0}
      />
      <div className="flex flex-col items-center gap-10 xl:gap-12 2xl:gap-20 pt-20 sm:pt-24 md:pt-24 lg:pt-32 xl:pt-40 2xl:pt-72">
        <div className="relative">
          <Link href="/dashboard">
            <NavbarIcons
              Srcfile={Dashboard.src}
              alt="Dashboard icon"
              path="/dashboard"
            />
          </Link>
          {/* need to be highlited when the user logs in 👆  */}
        </div>
        <div className="relative">
          <Link href="/game">
            <NavbarIcons
              Srcfile={Gamecont.src}
              alt="Game controller"
              path="/game"
            />
          </Link>
        </div>
        <div className="relative">
          <Link href="/chat">
            <NavbarIcons Srcfile={Messages.src} alt="Messages" path="/chat" />
          </Link>
        </div>
        <div className="relative">
          <Link href="/user">
            <NavbarIcons Srcfile={User.src} alt="User" path="/user" />
          </Link>
        </div>
        <div className="relative">
          <Link href="/settings">
            <NavbarIcons
              Srcfile={Settings.src}
              alt="Settings"
              path="/settings"
            />
          </Link>
        </div>
      </div>
      <div className="flex justify-center pt-40 sm:pt-36 md:pt-32 lg:pt-40 xl:pt-60 2xl:pt-96 brightness-200">
        <Image
          className="sm:w-5 md:w-6 lg:w-8 xl:w-10 2xl:w-14"
          src={Logout.src}
          width={18}
          height={18}
          alt="Logout"
        />
      </div>
    </section>
  );
}
