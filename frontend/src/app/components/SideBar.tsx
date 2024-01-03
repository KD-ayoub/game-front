"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import Dashboard from "@/app/assets/svg/dashboard.svg";
import Gamecont from "@/app/assets/svg/gamecont.svg";
import Messages from "@/app/assets/svg/messages.svg";
import User from "@/app/assets/svg/user.svg";
import Settings from "@/app/assets/svg/settings.svg";
import Logout from "@/app/assets/svg/logout.svg";
import Sideimg from "@/app/assets/svg/sideimg.svg";

import NavbarIcons from "./NavbarIcons";
import { useRouter } from "next/navigation";

export default function SideBar({
  isHumburgClicked,
}: {
  isHumburgClicked: boolean;
}) {
  const hidden = isHumburgClicked ? "hidden" : "";
  const router = useRouter();
  async function handlLogout() {
    const response = await fetch("http://localhost:3001/auth/logout", {
      method: "GET",
      credentials: "include",
    });
    if (response.ok) {
      router.push("/auth");
    }
    //// if error need to be handled
  }
  return (
    <section
      className={`w-10 sm:w-11 md:w-14 lg:w-[72px] xl:w-24 2xl:w-32 h-screen bg-gradient-to-b from-[#110D1F] ${hidden} sm:block relative shrink-0`}
    >
      <Image
        draggable={false}
        className="object-cover w-full h-full absolute"
        src={Sideimg.src}
        alt="Sideimg"
        width={0}
        height={0}
        priority={true}
      />
      <div className="flex flex-col h-full justify-between">
        <div className="flex flex-col items-center gap-10 xl:gap-20 2xl:gap-36 pt-32 sm:pt-40 md:pt-44 lg:pt-52 xl:pt-56 2xl:pt-72">
          <div className="relative">
            <Link href="/profile">
              <NavbarIcons Srcfile={User.src} alt="User" path="/profile" />
            </Link>
          </div>
          <div className="relative">
            <Link href="/chat">
              <NavbarIcons Srcfile={Messages.src} alt="Messages" path="/chat" />
            </Link>
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
            <Link href="/settings">
              <NavbarIcons
                Srcfile={Settings.src}
                alt="Settings"
                path="/settings"
              />
            </Link>
          </div>
        </div>
        <div
          className="flex justify-center pb-4 brightness-200"
          onClick={handlLogout}
        >
          <Image
            draggable={false}
            className="sm:w-5 md:w-6 lg:w-8 xl:w-10 2xl:w-14"
            src={Logout.src}
            width={18}
            height={18}
            alt="Logout"
          />
        </div>
      </div>
    </section>
  );
}
