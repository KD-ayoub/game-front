import Image from "next/image";
import Logo from "@/app/assets/svg/logo.svg";
import Nav from "@/app/assets/svg/Navbar.svg";

export default function Header() {
  return (
    <header className="text-white flex justify-between w-full absolute z-10">
      <nav className="flex sm:w-11 sm:h-11 md:w-14 md:h-14 lg:w-[72px] lg:h-[72px] xl:w-[88px] xl:h-[88px] 2xl:w-32 2xl:h-32 relative">
        {/* <Image className="p-2 2xl:p-4" src={Logo.src} fill={true} alt="Logo"/>
        <Image className="p-2 sm:hidden" src={Nav.src} fill={true} alt="Humburg"/> */}
        <img src={Logo.src} className="p-2 2xl:p-4" />
        <img src={Nav.src} className="p-2 sm:hidden" />
      </nav>
      {/* <nav
          className="flex sm:w-[89px] sm:h-11 md:w-28 md:h-14 xl:h-20 xl:w-40 2xl:h-32 2xl:w-64"
        >
          <div className="flex items-center relative">
            <img src={Logo.src}className="w-[21px]"/>
            <div
              className="w-[6px] h-[6px] bg-[#E95A3A] rounded-full absolute top-[10px] left-[12px]"
            ></div>
          </div>
          <img src="notif.svg" className="p-2 2xl:p-4" />
          <img src={Logo.src} className="p-2 2xl:p-4" />
        </nav>  */}
    </header>
  );
}
