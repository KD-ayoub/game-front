import Image from "next/image";
import RecImg from "../../utils/orangerec.svg";

export default function Navbar({ imgsource }: { imgsource: string }) {
  return (
    <>
      <div className="relative">
        <Image
          className="absolute top-[5px] left-[5px]"
          src={imgsource}
          width={18}
          height={18}
          alt="DashImg"
          style={{ filter: "brightness(2)" }}
        />
        <Image src={RecImg.src} width={30} height={30} alt="RecImg" />
      </div>
    </>
  );
}
