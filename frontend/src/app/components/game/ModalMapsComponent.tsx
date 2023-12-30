import React from "react";
import { Button, Modal } from "flowbite-react";
import Image from "next/image";
import { useState } from "react";
import { NeuePlakFont, NeuePlakFontBold } from "@/app/utils/NeuePlakFont";
import TableOrange from "@/app/assets/svg/game/TableOrange.svg";
import TableGreen from "@/app/assets/svg/game/TableGreen.svg";
import TableBlue from "@/app/assets/svg/game/TableBlue.svg";
import BTableGreen from "@/app/assets/svg/game/BTableGreen.svg";
import BTableBlue from "@/app/assets/svg/game/BTableBlue.svg";
import BTableOrange from "@/app/assets/svg/game/BTableOrange.svg";

export default function ModalMapsComponent({
  onClick,
  openModal,
}: {
  onClick: () => void;
  openModal: boolean;
}) {
  const [src, setSrc] = useState(false);
  return (
    <Modal className="bg-gray-600" show={openModal} onClose={onClick}>
      <Modal.Header className="bg-[#383546]">
        <h1 className={`${NeuePlakFontBold.className} text-white`}>
          Rules of the game
        </h1>
      </Modal.Header>
      <Modal.Body className="bg-[#383546]">
        <div className="w-auto h-[15rem] flex flex-col justify-around items-center">
          <div>
            <p className={`${NeuePlakFontBold.className} text-white`}>
              Choose a map
            </p>
          </div>
          <div className="flex gap-2">
            <Image
              src={src ? BTableOrange.src : TableOrange.src}
              width={66}
              height={74}
              alt="table orange"
              onClick={() => setSrc(true)}
            />
            <Image
              className={`${src ? "opacity-50" : ""}`}
              src={TableGreen.src}
              width={66}
              height={74}
              alt="table orange"
            />
            <Image
              className={`${src ? "opacity-50" : ""}`}
              src={TableBlue.src}
              width={66}
              height={74}
              alt="table orange"
            />
          </div>
          <div className="w-20 h-8 md:w-24 md:h-9 lg:w-28 lg:h-10 xl:w-36 xl:h-12 2xl:w-44 2xl:h-16 bg-[#E95A3A] rounded-[20px] xl:rounded-[24px] 2xl:rounded-[28px] flex justify-center items-center cursor-pointer">
            <p
              className={`${NeuePlakFont.className} text-white md:text-[20px] lg:text-[25px] xl:text-[30px] 2xl:text-[36px]`}
            >
              Next
            </p>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}
