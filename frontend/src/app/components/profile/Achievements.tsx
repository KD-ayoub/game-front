import { NeuePlakFontBold } from '@/app/utils/NeuePlakFont';
import React from 'react';
import Image from 'next/image';
import BlueAchiev from "@/app/assets/svg/blueachiev.svg";

export default function Achievements() {
  return (
    <div className='ml-4 mt-2'>
        <div className={`${NeuePlakFontBold.className}`}>Achievement</div>
        <div className='w-full flex gap-2 overflow-x-auto'>
            <Image src={BlueAchiev.src} width={45} height={41} alt='blue achievement' />
            <Image src={BlueAchiev.src} width={45} height={41} alt='blue achievement' />
            <Image src={BlueAchiev.src} width={45} height={41} alt='blue achievement' />
            <Image src={BlueAchiev.src} width={45} height={41} alt='blue achievement' />
            <Image src={BlueAchiev.src} width={45} height={41} alt='blue achievement' />
            <Image src={BlueAchiev.src} width={45} height={41} alt='blue achievement' />
        </div>
    </div>
  );
}
