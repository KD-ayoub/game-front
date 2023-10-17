import { Fragment } from "react";

import Logo from "../../utils/logo.svg";
import Nav from "../../utils/Navbar.svg";
import RecNav from "../../utils/recnavbar.svg";
import DashImg from "../../utils/dashboardimg.svg";
import GameImg from "../../utils/gamecontrol.svg";
import ChatImg from "../../utils/chaticon.svg";
import UserImg from "../../utils/usericon.svg";
import SettingImg from "../../utils/settingsicon.svg";
import LogoutImg from "../../utils/logouticon.svg";
import RecImg from "../../utils/orangerec.svg";

import Navbar from "./navbar";
import Image from "next/image";

export default function GameLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Fragment>
      <div className="w-screen h-screen relative">
        <header className="flex bg-[#0B0813] justify-between h-10">
          <div className="flex gap-2 items-center relative z-10">
            <nav className="p-2">
              <img src={Logo.src} />
            </nav>
            <nav>
              <img src={Nav.src} />
            </nav>
          </div>
          <div className="flex">
            <nav>Nav bar</nav>
            <nav>Nav bar</nav>
          </div>
        </header>
        <div className="absolute pl-10 h-full w-full bg-[#0B0813]">
          {children}
        </div>
        <section
          className=" inset-0 -bottom-10 w-10 bg-gradient-to-b from-[#110D1F] to-[#0B0813] 
        stroke-black drop-shadow absolute "
        >
          <Image
            src={RecNav.src}
            alt="Recnav"
            fill={true}
            style={{ objectFit: "cover", stroke: "#000" }}
          />
          <div className="flex flex-col  items-center pt-[120px] gap-7 w-full h-full">
            <Navbar imgsource={DashImg.src} />
            <Navbar imgsource={GameImg.src} />
            <Navbar imgsource={ChatImg.src} />
            <Navbar imgsource={UserImg.src} />
            <Navbar imgsource={SettingImg.src} />
            <div className="pt-[120px]">
              <Image
                src={LogoutImg.src}
                width={18}
                height={18}
                alt="DashImg"
                style={{ filter: "brightness(2)" }}
              />
            </div>
          </div>
        </section>
      </div>
    </Fragment>
  );
}
