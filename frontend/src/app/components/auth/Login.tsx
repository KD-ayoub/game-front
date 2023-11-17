import { NeuePlakFontBold } from '@/app/utils/NeuePlakFont';
import React from 'react';
import Image from 'next/image';
import BlueAchiev from "@/app/assets/svg/blueachiev.svg";
import intra_logo from "@/app/assets/svg/42_logo.svg";

export default function Login() {
  return (
    <div className='flex  w-1/2 h-screen items-center justify-center  flex-col bg-gradient-radial'>
        <div className='w-514 h-601 bg-[#15131D] border border-rgb-129-87-98 rounded-3xl p-10 text-center'>
             <p className={`${NeuePlakFontBold.className} text-[32px]`}>Welcome Back again!</p>
            <p className='text-[#8E86A5]'>We'are so excited to see you again!</p>
            <button className='border m-2 p-2 rounded-xl hover:bg-[#733d48]'>Log with Your <br /><img src={intra_logo.src} alt="42" className='inline' /> Intra</button>
        </div>
        
    </div>
  );
}
