import Image from "next/image";
import Rectangle from "@/app/utils/rectangle.svg";

export default function NavbarIcons({
  Srcfile,
  isClicked,
  alt,
}: {
  Srcfile: string;
  isClicked: boolean;
  alt: string;
}) {
  const className = isClicked
    ? "absolute top-1.5 left-1.5 lg:top-2 lg:left-2 2xl:top-3.5 2xl:left-3.5"
    : "";
  return (
    <>
      <Image
        className={`sm:w-5 md:w-6 xl:w-8 2xl:w-14 ${className}`}
        src={Srcfile}
        width={18}
        height={18}
        alt={alt}
      />
      {isClicked && (
        <Image
          className="w-[30px] h-[30px] sm:w-[32px] sm:h-[32px] md:w-[37px] md:h-[37px] lg:w-[40px] lg:h-[40px] xl:w-[48px] xl:h-[48px] 2xl:w-[85px] 2xl:h-[85px]"
          src={Rectangle.src}
          width={30}
          height={30}
          alt="red square"
        />
      )}
    </>
  );
}
