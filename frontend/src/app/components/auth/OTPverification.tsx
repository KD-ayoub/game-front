import React, { ChangeEvent, useEffect, useRef, KeyboardEvent } from "react";
import { useState } from "react";
import "./otpstyle.css";
import { NeuePlakFont } from "@/app/utils/NeuePlakFont";

let currentOtpindex: number;
interface OTPVerificationProps {
  GetOTP: (otp: string) => void;
}
export default function OTPVerification({ GetOTP }: OTPVerificationProps) {
  const [otp, setOtp] = useState<string[]>(new Array(6).fill(""));
  const inputRef = useRef<HTMLInputElement>(null);
  const [activeInput, setActiveInput] = useState(0);

  function handlInputChange(event: ChangeEvent<HTMLInputElement>) {
    const newOtp: string[] = [...otp];
    newOtp[currentOtpindex] = event.target.value.substring(
      event.target.value.length - 1
    );
    setOtp(newOtp);
    if (!event.target.value) {
      setActiveInput(currentOtpindex - 1);
    } else {
      setActiveInput(currentOtpindex + 1);
    }
  }
  function handlKeyDown(event: KeyboardEvent<HTMLInputElement>, index: number) {
    if (isNaN(parseInt(event.key)) && event.key !== "Backspace") {
      event.preventDefault();
    }
    if (!otp[index - 1]) {
      const newOtp = [...otp];
      newOtp[index] = '';
      setOtp(newOtp);
    }
    currentOtpindex = index;
    if (event.key === "Backspace") {
      setActiveInput(currentOtpindex - 1);
      }
  }
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [activeInput, currentOtpindex]);

  useEffect(() => {
    const enteredOTP = otp.join('');
    GetOTP(enteredOTP);
  }, [otp, GetOTP]);

  return (
    <>
      <div className="flex gap-2">
        {otp.map((_, index) => {
          return (
            <input
              type="number"
              name="otp-verification"
              key={index}
              ref={index === activeInput ? inputRef : null}
              value={otp[index]}
              className={`${NeuePlakFont.className} text-white w-6 h-6 sm:w-8 sm:h-8 lg:w-12 lg:h-12 xl:w-16 xl:h-16 2xl:w-20 2xl:h-20 text-center sm:text-[20px] lg:text-[28px] xl:text-[33px] 2xl:text-[40px] bg-[#383546] rounded-[5px] xl:rounded-[10px] 2xl:rounded-[15px] spin-button-none`}
              onChange={(event) => handlInputChange(event)}
              onKeyDown={(event) => handlKeyDown(event, index)}
              style={{MozAppearance: "textfield"}}
            ></input>
          );
        })}
      </div>
    </>
  );
}
