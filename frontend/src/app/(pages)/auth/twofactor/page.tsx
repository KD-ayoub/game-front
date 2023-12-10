"use client";
import { useState, useEffect } from "react";
import { NeuePlakFontBold, NeuePlakFont } from "@/app/utils/NeuePlakFont";
import Image from "next/image";
import Qrimage from "@/app/assets/images/qrcodeee.jpeg";
import OTPVerification from "@/app/components/auth/OTPverification";
import CheckUserStatus from "@/app/api/checkUserStatus";
import { loginStatus } from "@/app/utils/library/authEnum";
import { useRouter } from "next/navigation";

// sssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss
export default function TwoFactor() {
  const router = useRouter();

  const [enteredOTP, setEnteredOTP] = useState('');

  function handleGetOTP(otp: string) {
    setEnteredOTP(otp);
  }

  useEffect(() => {
    async function fetcher() {
      const responseStatus = await CheckUserStatus();
      if (responseStatus.status === 403) {
        const body = await responseStatus.json();
        if (body.message === loginStatus.FirstTime) {
          //redirect to first time
          console.log("first time");
          router.push('/auth/goodlogin');
        } else if (body.message === loginStatus.NotLogged) {
          //redirect to auth
          console.log("not logged");
          router.push('/auth');
        } else if (body.message === loginStatus.TwoFactor) {
          console.log("two factor");
        }
        await console.log("bbbbbb", body);
      } else {
        console.log("you are alrady logged");
        router.push("/profile");
        return null;
      }
      ///////send to backend 
      const response = await fetch('http://localhost:3001/...', {
        method: 'POST',
        body: JSON.stringify(enteredOTP),
        credentials: 'include',
      })
      await console.log(response);
      //////////////////////////:
    }
    fetcher();
  }, []);
  console.log('OTP', enteredOTP);
  return (
    <main className="h-screen bg-[#0B0813] relative w-full max-w-[5120px] flex">
      <div className="flex w-full h-screen items-center justify-center  flex-col bg-gradient-radial">
        <div className="w-52 h-[400px] sm:w-72 sm:h-[450px] md:w-80 md:h-[480px] lg:w-[368px] lg:h-[550px] xl:w-[500px] xl:h-[650px] 2xl:w-[600px] 2xl:h-[850px] bg-[#15131D] border border-solid border-white rounded-[20px] flex flex-col justify-evenly items-center ">
          <div className="flex flex-col justify-center items-center gap-3 lg:gap-5 2xl:gap-7">
            <Image
              className="sm:w-44 sm:h-44 lg:w-52 lg:h-52 xl:w-60 xl:h-60 2xl:w-[272px] 2xl:h-[272px]"
              src={Qrimage.src}
              width={100}
              height={100}
              alt="qr image scan"
            />
            <p className={`${NeuePlakFont.className} text-[16px] sm:text-[20px] lg:text-[23px] xl:text-[28px] 2xl:text-[33px]`}>
              Enter the code
            </p>
            <OTPVerification GetOTP={handleGetOTP}/>
            <div className="w-24 h-8 sm:w-28 sm:h-9 md:w-28 lg:w-36 lg:h-12 xl:w-40 xl:h-[56px] 2xl:w-48 2xl:h-[72px] border border-solid border-gray-500 rounded-[8px] 2xl:rounded-[18px] flex justify-center">
            <button
              className={`${NeuePlakFont.className} text-[16px] sm:text-[18px] lg:text-[23px] xl:text-[28px] 2xl:text-[33px]`}
            >
              Login
            </button>
          </div>
          </div>
        </div>
      </div>
    </main>
  );
}
