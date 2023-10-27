import Image from "next/image";
import Dashboard from "@/app/utils/dashboard.svg";
import Gamecont from "@/app/utils/gamecont.svg";
import Rectangle from "@/app/utils/rectangle.svg";
import Messages from "@/app/utils/messages.svg";
import User from "@/app/utils/user.svg";
import Settings from "@/app/utils/settings.svg";
import Logout from "@/app/utils/logout.svg";
import Sideimg from "@/app/utils/sideimg.svg";

export default function SideBar() {
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
        <div className="relative">
          <Image
            className="sm:w-5 md:w-6 xl:w-8 2xl:w-14 //absolute top-1.5 left-1.5 lg:top-2 lg:left-2 2xl:top-3.5 2xl:left-3.5//"
            src={Dashboard.src}
            width={18}
            height={18}
            alt="Dashboard icon"
          />
          {/* <Image className="w-[30px] h-[30px] sm:w-[32px] sm:h-[32px] md:w-[37px] md:h-[37px] lg:w-[40px] lg:h-[40px] xl:w-[48px] xl:h-[48px] 2xl:w-[85px] 2xl:h-[85px]"
            src={Rectangle.src} 
            width={30}
            height={30}
            alt="red square" /> */}
        </div>
        <div className="relative">
          <Image
            className="sm:w-5 md:w-6 xl:w-8 2xl:w-14 absolute top-1.5 left-1.5 lg:top-2 lg:left-2 2xl:top-3.5 2xl:left-3.5"
            src={Gamecont.src}
            width={18}
            height={18}
            alt="Game controller"
          />
          <Image
            className="w-[30px] h-[30px] sm:w-[32px] sm:h-[32px] md:w-[37px] md:h-[37px] lg:w-[40px] lg:h-[40px] xl:w-[48px] xl:h-[48px] 2xl:w-[85px] 2xl:h-[85px]"
            src={Rectangle.src}
            width={30}
            height={30}
            alt="red square"
          />
        </div>
        <div className="relative">
          <Image
            className="sm:w-5 md:w-6 xl:w-8 2xl:w-14 //absolute top-1.5 left-1.5 lg:top-2 lg:left-2 2xl:top-3.5 2xl:left-3.5//"
            src={Messages.src}
            width={18}
            height={18}
            alt="Messages"
          />
          {/* <Image className="w-[30px] h-[30px] sm:w-[32px] sm:h-[32px] md:w-[37px] md:h-[37px] lg:w-[40px] lg:h-[40px] xl:w-[48px] xl:h-[48px] 2xl:w-[85px] 2xl:h-[85px]"
            src={Rectangle.src} 
            width={30}
            height={30}
            alt="red square" /> */}
        </div>
        <div className="relative">
          <Image
            className="sm:w-5 md:w-6 xl:w-8 2xl:w-14 //absolute top-1.5 left-1.5 lg:top-2 lg:left-2 2xl:top-3.5 2xl:left-3.5//"
            src={User.src}
            width={18}
            height={18}
            alt="User"
          />
          {/* <Image className="w-[30px] h-[30px] sm:w-[32px] sm:h-[32px] md:w-[37px] md:h-[37px] lg:w-[40px] lg:h-[40px] xl:w-[48px] xl:h-[48px] 2xl:w-[85px] 2xl:h-[85px]"
            src={Rectangle.src} 
            width={30}
            height={30}
            alt="red square" /> */}
        </div>
        <div className="relative">
          <Image
            className="sm:w-5 md:w-6 xl:w-8 2xl:w-14 //absolute top-1.5 left-1.5 lg:top-2 lg:left-2 2xl:top-3.5 2xl:left-3.5//"
            src={Settings.src}
            width={18}
            height={18}
            alt="Settings"
          />
          {/* <Image className="w-[30px] h-[30px] sm:w-[32px] sm:h-[32px] md:w-[37px] md:h-[37px] lg:w-[40px] lg:h-[40px] xl:w-[48px] xl:h-[48px] 2xl:w-[85px] 2xl:h-[85px]"
            src={Rectangle.src} 
            width={30}
            height={30}
            alt="red square" /> */}
        </div>
      </div>
      <div className="flex justify-center pt-40 sm:pt-36 md:pt-32 xl:pt-60 2xl:pt-96 brightness-200">
        <Image className="sm:w-5 md:w-6 xl:w-8 2xl:w-14" src={Logout.src} width={18} height={18} alt="Logout" />
      </div>
    </section>
  );
}
