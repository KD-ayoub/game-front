import Image from "next/image";
import { usePathname } from "next/navigation";
import Rectangle from "@/app/assets/svg/rectangle.svg";

export default function NavbarIcons({
  Srcfile,
  alt,
  path,
}: {
  Srcfile: string;
  alt: string;
  path: string;
}) {
    const pathname = usePathname();
  const className = pathname === path
    ? "absolute top-1.5 left-1.5 lg:top-2 lg:left-2 2xl:top-3.5 2xl:left-3.5"
    : "";
  return (
    <>
        <Image
          className={`sm:w-5 md:w-6 lg:w-8 xl:w-10 2xl:w-14 brightness-200 ${className}`}
          src={Srcfile}
          width={18}
          height={18}
          alt={alt}
        />
        {pathname === path && (
          <Image
            className="w-[30px] h-[30px] sm:w-[32px] sm:h-[32px] md:w-[37px] md:h-[37px] lg:w-[50px] lg:h-[50px] xl:w-[56px] xl:h-[56px] 2xl:w-[85px] 2xl:h-[85px]"
            src={Rectangle.src}
            width={30}
            height={30}
            alt="red square"
          />
        )}
    </>
  );
}
