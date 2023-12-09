"use client";
import { useState, useEffect, useRef, RefObject } from "react";
import default_avatar from "@/app/assets/svg/default_avatar.svg";
import { NeuePlakFontBold, NeuePlakFont } from "@/app/utils/NeuePlakFont";
import { ChangeEvent } from "react";
import PutImage from "@/app/api/Settings/putImage";
import getUserData from "@/app/api/auth/getUserData";
import CheckInputFullName from "@/app/utils/library/checkInputFullName";
import Image from "next/image";
import ChangeImg from "@/app/assets/svg/settings/change.svg";
import { UserType } from "@/app/types/goodloginType";
import PutUserData from "@/app/api/auth/putuserData";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";

// sssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss
export default function GoodLogin() {
  const [userData, setUserData] = useState<UserType>({
    full_name: "",
    nickName: "",
    photo_user: `${default_avatar.src}`,
  });
  const [nickName, setNickname] = useState("");
  const [fullName, setFullname] = useState("");
  const fullNameRef = useRef<HTMLInputElement>(null);
  const nickNameRef = useRef<HTMLInputElement>(null);
  const [objectUrl, setObjectUrl] = useState(`${default_avatar.src}`);
  const [fileImage, setFileImage] = useState<File>();
  const router = useRouter();
  const searchParam = useSearchParams();

  function handlImageChange(event: ChangeEvent<HTMLInputElement>) {
    event.preventDefault();
    if (event.target.files) {
      if (event.target.files.length > 0) {
        setObjectUrl(URL.createObjectURL(event.target.files[0]));
        console.log(objectUrl);
        setFileImage(event.target.files[0]);
      } else {
        setObjectUrl(`${default_avatar.src}`); // neeed to change ?????
      }
    }
  }
  function handlFullNameError() {
    if (fullNameRef.current) {
      const fullNameRegex = /^(?!.*  )[A-Za-z][A-Za-z ]{4,28}[A-Za-z]$/;
      const old = `${NeuePlakFont.className} bg-[#383546] rounded-[5px] 2xl:rounded-[10px] h-8 w-[180px] sm:w-[240px] md:w-[260px] lg:w-[300px] xl:w-[400px] 2xl:w-[500px] lg:h-10 xl:h-12 2xl:h-16 pl-1`;
      fullNameRef.current.className = fullNameRegex.test(
        fullNameRef.current.value
      )
        ? old
        : fullNameRef.current.className.concat(" border border-red-600");
    }
  }
  function handlNickNameError() {
    if (nickNameRef.current) {
      const fullNameRegex = /^(?!.*\s)[a-zA-Z0-9_-]{2,8}$/;
      console.log(fullNameRegex.test(nickNameRef.current.value));
      const old = `${NeuePlakFont.className} bg-[#383546] rounded-[5px] 2xl:rounded-[10px] h-8 w-[180px] sm:w-[240px] md:w-[260px] lg:w-[300px] xl:w-[400px] 2xl:w-[500px] lg:h-10 xl:h-12 2xl:h-16 pl-1`;
      nickNameRef.current.className = fullNameRegex.test(
        nickNameRef.current.value
      )
        ? old
        : nickNameRef.current.className.concat(" border border-red-600");
    }
  }
  function handlNickNameChange(event: ChangeEvent<HTMLInputElement>) {
    const modifiedFullName = { ...userData, nickName: event.target.value };
    setUserData(modifiedFullName);
    setNickname(event.target.value);
  }
  function handlFullNameChange(event: ChangeEvent<HTMLInputElement>) {
    const modifiedFullName = { ...userData, full_name: event.target.value };
    setUserData(modifiedFullName);
    setFullname(event.target.value);
  }
  async function handlSubmit() {
    const fullNameRegex = /^(?!.*  )[A-Za-z][A-Za-z ]{4,28}[A-Za-z]$/;
    const nickNameRegex = /^(?!.*\s)[a-zA-Z0-9_-]{2,8}$/;
    if (fullNameRef.current && nickNameRef.current) {
      if (
        fullNameRegex.test(fullNameRef.current.value) &&
        nickNameRegex.test(nickNameRef.current.value)
      ) {
        // send put method
        console.log(userData);
        const body = {
          full_name: userData.full_name,
          nickname: userData.nickName,
        };
        const putData = await PutUserData(body);
        if (putData.status === 200) {
          // redirect to profile
          router.push("/profile?message=success");
        } else if (putData.status === 409) {
          toast.error("nickname already exists", {
            style: {
              backgroundColor: "#383546",
              color: "white",
            },
          });
        }
        await console.log("hona ", putData);
        console.log("save");
      } else {
        // make toast error
        toast.error("input error", {
          style: {
            backgroundColor: "#383546",
            color: "white",
          },
        });
        console.log("dont save");
      }
    }
  }
  useEffect(() => {
    async function fetcher() {
      setUserData(await getUserData());
    }
    fetcher();
  }, []);
  return (
    <>
      <Toaster />
      <main className="h-screen bg-[#0B0813] relative w-full max-w-[5120px] flex">
        <div className="flex w-full h-screen items-center justify-center  flex-col bg-gradient-radial">
          <div className="w-52 h-[400px] sm:w-72 sm:h-[450px] md:w-80 md:h-[480px] lg:w-[368px] lg:h-[550px] xl:w-[500px] xl:h-[650px] 2xl:w-[600px] 2xl:h-[850px] bg-[#15131D] border border-solid border-white rounded-[20px] flex flex-col justify-evenly items-center ">
            <div className="flex flex-col justify-center items-center gap-3 lg:gap-5 2xl:gap-7">
              <Image
                className="h-20 md:w-[100px] md:h-[100px] lg:w-[110px] lg:h-[110px] xl:w-[125px] xl:h-[125px] 2xl:w-[145px] 2xl:h-[145px] rounded-full"
                src={
                  userData.photo_user === `${default_avatar.src}`
                    ? objectUrl
                    : userData.photo_user
                }
                width={80}
                height={80}
                alt="avatar"
              />
              <label
                className={`${NeuePlakFont.className} text-[14px] lg:text-[20px] xl:text-[24px] 2xl:text-[34px] cursor-pointer`}
                htmlFor="profile-img"
              >
                <div className="w-[94px] sm:w-[96px] sm:h-[26px] md:h-8 md:w-[100px]  xl:w-[170px] lg:w-[140px] xl:h-12 2xl:w-[240px] lg:h-9 2xl:h-16 flex gap-1 lg:gap-2 xl:gap-3 2xl:gap-6 bg-[#E95A3A] rounded-[15px]  2xl:rounded-[30px] justify-center items-center">
                  <Image
                    className="lg:w-5 lg:h-5 xl:w-7 2xl:w-9 xl:h-7 2xl:h-9"
                    src={ChangeImg.src}
                    width={14}
                    height={14}
                    alt="trash icon"
                  />
                  Change
                  <input
                    className="hidden"
                    type="file"
                    accept="image/png, image/jpeg, image/jpg"
                    id="profile-img"
                    onChange={handlImageChange}
                  />
                </div>
              </label>
            </div>
            <div>
              <form>
                <p
                  className={`${NeuePlakFont.className} text-[16px] md:text-[18px] lg:text-[24px] xl:text-[27px] 2xl:text-[38px] `}
                >
                  Full name
                </p>
                <input
                  style={{ outline: "none" }}
                  className={`${NeuePlakFont.className} bg-[#383546] rounded-[5px] 2xl:rounded-[10px] h-8 w-[180px] sm:w-[240px] md:w-[260px] lg:w-[300px] xl:w-[400px] 2xl:w-[500px] lg:h-10 xl:h-12 2xl:h-16 pl-1`}
                  type="text"
                  id="full-name"
                  ref={fullNameRef}
                  value={userData.full_name}
                  onChange={handlFullNameChange}
                  onKeyUp={handlFullNameError}
                  maxLength={30}
                  required
                />
              </form>
              <form>
                <p
                  className={`${NeuePlakFont.className} text-[16px] md:text-[18px] lg:text-[24px] xl:text-[27px] 2xl:text-[38px]`}
                >
                  Nickname
                </p>
                <input
                  style={{ outline: "none" }}
                  className={`${NeuePlakFont.className} bg-[#383546] rounded-[5px] 2xl:rounded-[10px] h-8 w-[180px] sm:w-[240px] md:w-[260px] lg:w-[300px] xl:w-[400px] 2xl:w-[500px] lg:h-10 xl:h-12 2xl:h-16 pl-1`}
                  type="text"
                  id="nick-name"
                  ref={nickNameRef}
                  value={userData.nickName}
                  onChange={handlNickNameChange}
                  onKeyUp={handlNickNameError}
                  maxLength={8}
                  required
                />
              </form>
            </div>
            <div
              className="w-24 h-8 md:w-28 lg:w-32 lg:h-9 xl:w-36 xl:h-12 2xl:w-44 2xl:h-16 border border-solid border-gray-500 rounded-[8px] 2xl:rounded-[18px] flex justify-center"
              onClick={handlSubmit}
            >
              <button
                className={`${NeuePlakFont.className} text-[16px] md:text-[18px] lg:text-[20px] xl:text-[24px] 2xl:text-[28px]`}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
