import { NeuePlakFontBold } from '@/app/utils/NeuePlakFont';
import React from 'react';
import Image from 'next/image';
import BlueAchiev from "@/app/assets/svg/blueachiev.svg";

export default function Achievements() {
  return (
    <div className='m-3 mt-2'>
        <div className={`${NeuePlakFontBold.className} md:text-[18px] lg:text-[24px] xl:text-[28px] 2xl:text-[45px]`}>Achievement</div>
        <div className='w-full flex gap-2 overflow-x-auto'>
            <Image className='md:w-[50px] md:h-[46px] lg:w-[60px] lg:h-[55px] xl:w-[65px] xl:h-[60px] 2xl:w-[90px] 2xl:h-[80px] ' src={BlueAchiev.src} width={45} height={41} alt='blue achievement' />
            <Image className='md:w-[50px] md:h-[46px] lg:w-[60px] lg:h-[55px] xl:w-[65px] xl:h-[60px] 2xl:w-[90px] 2xl:h-[80px]' src={BlueAchiev.src} width={45} height={41} alt='blue achievement' />
            <Image className='md:w-[50px] md:h-[46px] lg:w-[60px] lg:h-[55px] xl:w-[65px] xl:h-[60px] 2xl:w-[90px] 2xl:h-[80px]' src={BlueAchiev.src} width={45} height={41} alt='blue achievement' />
            <Image className='md:w-[50px] md:h-[46px] lg:w-[60px] lg:h-[55px] xl:w-[65px] xl:h-[60px] 2xl:w-[90px] 2xl:h-[80px]' src={BlueAchiev.src} width={45} height={41} alt='blue achievement' />
            <Image className='md:w-[50px] md:h-[46px] lg:w-[60px] lg:h-[55px] xl:w-[65px] xl:h-[60px] 2xl:w-[90px] 2xl:h-[80px]' src={BlueAchiev.src} width={45} height={41} alt='blue achievement' />
        </div>
    </div>
  );
}
