"use client";

import { NeuePlakFont, NeuePlakFontBold } from "../utils/NeuePlakFont";
import Image from "next/image";
import DropdownMenu from "./DropdownMenu";

import Logo from "@/app/assets/svg/logo.svg";
import Nav from "@/app/assets/svg/Navbar.svg";
import Bell from "@/app/assets/svg/bell.svg";
import Profilepic from "@/app/assets/svg/profile.svg";
import Polygon from "@/app/assets/svg/polygon.svg";
import ProfileDropNotif from "@/app/assets/svg/profilenotif.svg";
import SettingsDropNotif from "@/app/assets/svg/settingsNotif.svg";
import LogoutDropNotif from "@/app/assets/svg/LogoutNotif.svg";
import SearchBar from "./SearchBar";
import { SettingsType } from "../types/settingsType";
import getSettings from "../api/Settings/getSettings";
import ProfileImg from "@/app/assets/svg/profileimg.svg";
import Link from "next/link";

import { Humburgtype } from "../types/humburgtype";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

// this is only for testing need to merge with backend

///////

export default function Header({
  isHumburgClicked,
  setisHumburgClicked,
}: Humburgtype) {
  const router = useRouter();
  const [showDropdownProfile, setshowDropdownProfile] = useState(false);
  const [dataSettings, setDataSettings] = useState<SettingsType>({
    id: "",
    full_name: "",
    nickName: "",
    fac_auth: false,
    photo_path: `${ProfileImg.src}`,
  });
  function handlClick() {
    setisHumburgClicked(!isHumburgClicked);
  }

  function handlDropdownProfile() {
    setshowDropdownProfile(!showDropdownProfile);
  }
  async function handlLogout() {
    const response = await fetch('http://localhost:3001/auth/logout', {
      method: 'GET',
      credentials: 'include',
    });
    if (response.ok) {
      router.push('/auth');
    }
    //// if error need to be handled
  }
  const dropProfileRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    async function fetchheader() {
      setDataSettings(await getSettings());
    }
    fetchheader();
    function handlclick(e: MouseEvent) {
      const target = e.target as HTMLElement;
      if (dropProfileRef.current && !dropProfileRef.current.contains(target)) {
        setshowDropdownProfile(false);
      }
    }
    document.addEventListener('click', handlclick);
    return () => document.removeEventListener('click', handlclick);
  }, []);

  return (
    <>
      <header className="text-white flex justify-stretch w-full absolute z-10 items-center">
        <nav className="flex sm:w-11 sm:h-11 md:w-14 md:h-14 lg:w-[72px] lg:h-[72px] xl:w-[88px] xl:h-[88px] 2xl:w-32 2xl:h-32 relative">
          <img src={Logo.src} className="p-2 2xl:p-4" draggable='false' />
          <img src={Nav.src} className="p-2 sm:hidden" onClick={handlClick} draggable='false' />
        </nav>
        <SearchBar />
        <nav className="flex items-center justify-end gap-2 sm:w-[170px] sm:h-11 md:w-48 md:h-14 lg:h-[72px] lg:w-72 xl:h-[88px] xl:w-80 2xl:h-32 2xl:w-[480px]">
          <div
            className="w-[29.6px] h-[29.6px] sm:w-32 sm:h-[33.6px] md:w-36 md:h-10 lg:h-14 lg:w-56 xl:h-16 xl:w-64 2xl:h-24 2xl:w-96 bg-[#110D1F] rounded-full  relative"
            onClick={handlDropdownProfile}
            ref={dropProfileRef}
          >
            <div className="flex absolute top-[1px] md:top-[3px] lg:top-[5px] xl:top-[6px] 2xl:top-[9px] left-[1px] md:left-1 lg:left-[5px] 2xl:left-[9px] gap-1 lg:gap-4 items-center">
              <Image
                draggable={false}
                className="sm:w-[32px] sm:h-[32px] md:w-[34px] md:h-[34px] lg:w-[46px] lg:h-[46px] xl:w-[52px] xl:h-[52px] 2xl:w-[75px] 2xl:h-[75px] rounded-full"
                width={29}
                height={29}
                src={dataSettings.photo_path === 'default_img' ? `${ProfileImg.src}`: dataSettings.photo_path}
                alt="profile image"
              />
              <div className="hidden sm:block">
                <p
                  className={`flex items-center gap-1 lg:gap-3 2xl:gap-5 ${NeuePlakFont.className} text-[17px] lg:text-[23px] xl:text-[28px] 2xl:text-[42px] `}
                >
                  {dataSettings.nickName}
                  <Image
                    draggable={false}
                    className="lg:w-3 lg:h-3 xl:w-4 xl:h-4 2xl:w-6 2xl:h-6"
                    src={Polygon.src}
                    width={10}
                    height={10}
                    alt="Polygon"
                  />
                </p>
              </div>
            </div>
          </div>
          {showDropdownProfile && (
            <div className="absolute w-24 sm:w-32 md:w-[136px] lg:w-[217px] xl:w-[242px] 2xl:w-[365px] bg-[#252134] top-[43px] md:top-[52px] lg:top-[70px] xl:top-20 2xl:top-32 right-[10px] sm:right-1 rounded-xl">
              <ul>
                <Link href={"/profile"}>
                  <DropdownMenu
                    ImageSource={ProfileDropNotif.src}
                    Item="Profile"
                  />
                </Link>
                <Link href={"/settings"}>
                  <DropdownMenu
                    ImageSource={SettingsDropNotif.src}
                    Item="Settings"
                  />
                </Link>
                {/* need to do logout */}
                <div onClick={handlLogout}>
                  <DropdownMenu
                    ImageSource={LogoutDropNotif.src}
                    Item="Logout"
                  />
                </div>
              </ul>
            </div>
          )}
        </nav>
      </header>
    </>
  );
}
