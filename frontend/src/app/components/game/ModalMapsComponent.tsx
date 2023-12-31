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
  const [srcOrange, setSrcOrange] = useState(false);
  const [srcGreen, setSrcGreen] = useState(false);
  const [srcBlue, setSrcBlue] = useState(false);
  return (
    <Modal className="bg-gray-600" show={openModal} onClose={onClick}>
      <Modal.Header className="bg-[#383546]">
        <p className={`${NeuePlakFontBold.className} text-white`}>
          Rules of the game
        </p>
      </Modal.Header>
      <Modal.Body className="bg-[#383546]">
        <div className="w-auto h-[15rem] sm:h-[18rem] md:h-[25rem] flex flex-col justify-around items-center">
          <div>
            <p
              className={`${NeuePlakFontBold.className} text-white sm:text-[20px] md:text-[24px]`}
            >
              Choose a map
            </p>
          </div>
          <div className="flex gap-2">
            <Image
              className={`${
                srcBlue || srcGreen ? "opacity-50" : ""
              } sm:w-[8rem] sm:h-[10rem] md:w-[10rem] md:h-[13rem]`}
              src={srcOrange ? BTableOrange.src : TableOrange.src}
              width={66}
              height={74}
              alt="table orange"
              onClick={() => {
                setSrcOrange(true);
                setSrcBlue(false);
                setSrcGreen(false);
              }}
            />
            <Image
              className={`${
                srcOrange || srcBlue ? "opacity-50" : ""
              } sm:w-[8rem] sm:h-[10rem] md:w-[10rem] md:h-[13rem]`}
              src={srcGreen ? BTableGreen : TableGreen.src}
              width={66}
              height={74}
              alt="table orange"
              onClick={() => {
                setSrcOrange(false);
                setSrcBlue(false);
                setSrcGreen(true);
              }}
            />
            <Image
              className={`${
                srcGreen || srcOrange ? "opacity-50" : ""
              } sm:w-[8rem] sm:h-[10rem] md:w-[10rem] md:h-[13rem]`}
              src={srcBlue ? BTableBlue : TableBlue.src}
              width={66}
              height={74}
              alt="table orange"
              onClick={() => {
                setSrcOrange(false);
                setSrcBlue(true);
                setSrcGreen(false);
              }}
            />
          </div>
          <button disabled={(srcBlue || srcGreen || srcOrange) ? false : true}>
            <div
              className="w-20 h-8 md:w-24 md:h-9 lg:w-28 lg:h-10 xl:w-36 xl:h-12 2xl:w-44 2xl:h-16 bg-[#E95A3A] rounded-[20px] xl:rounded-[24px] 2xl:rounded-[28px] flex justify-center items-center cursor-pointer"
              onClick={() => console.log("clicked div", srcOrange, srcGreen, srcBlue)}
            >
              <p
                className={`${NeuePlakFont.className} text-white md:text-[20px] lg:text-[25px] xl:text-[30px] 2xl:text-[36px]`}
              >
                Next
              </p>
            </div>
          </button>
        </div>
      </Modal.Body>
    </Modal>
  );
}
