"use client";
import { useState, useEffect, useRef, RefObject } from "react";
import default_avatar from "@/app/assets/svg/default_avatar.svg";
import { NeuePlakFontBold } from "@/app/utils/NeuePlakFont";
import { ToastContainer, toast } from "react-toastify";
import { ChangeEvent } from "react";
import PutImage from "@/app/api/Settings/putImage";
import getUserData from "@/app/api/auth/getUserData";
import CheckInputFullName from "@/app/utils/library/checkInputFullName";

// sssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss
export default function Good_login() {
  const url = "http://localhost:3001/auth/signup";
  const [full_name, setFullName] = useState("");
  const [nickname, setNickname] = useState("");
  const [avatar, setAvatar] = useState(default_avatar.src);
  const [image, setImage] = useState<File>();
  const RefFullname = useRef<HTMLInputElement>(null);
  const [ErrorFullname, setErrorFullname] = useState(false);

  function handleAvatar(e: ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    setAvatar(e.target.value); // Update the state
    if (e.target.files) {
      setAvatar(URL.createObjectURL(e.target.files[0]));
      setImage(e.target.files[0]);
    }

    console.log(e.target.value);
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData();
    const info = { full_name, nickname };

    if (full_name.length < 3 || full_name.length > 30) {
      setErrorFullname(true);
      toast.error("Error input full name");
      return;
    }
    data.append("file", image ?? "");
    info.full_name = full_name;
    info.nickname = nickname;
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(info),
      credentials: "include",
    })
      .then((res) => res.json())
      .then((res) => console.log(res))
      .catch((error) => console.error("Error:", error));
    PutImage(data);

    console.log("hadi fhandleSbmit\n");
    console.log(full_name, nickname, avatar);
  }

  return (
    <main className="h-screen bg-[#0B0813] relative w-full max-w-[5120px] flex">
      <div className="flex w-full h-screen items-center justify-center  flex-col bg-gradient-radial">
        <div
          className={`w-1/3 h-1/2 bg-[#15131D] border border-rgb-129-87-98 rounded-3xl  flex flex-col items-center justify-center ${NeuePlakFontBold.className} drop-shadow-2xl shadow-lg shadow-[#15131D]`}
        >
          <form
            className="flex  flex-col items-center space-6 p-12"
            onSubmit={handleSubmit}
          >
            <div className="Avatar flex flex-col justify-center items-center space-y-3">
              <img
                className="h-50 w-50 object-cover m-4 md:m-8 2xl:m-16 md:w-20 md:h-20 lg:w-28 lg:h-28 xl:w-36 xl:h-36 2xl:w-44 2xl:h-44 rounded-full"
                // hna ghadi i5asni ndir blast default_avatar ndir variable li mstori fih tswira
                src={avatar}
                alt="Current profile photo"
              />
              <div className="Avatar flex flex-col justify-center items-center pl-28 pb-6">
                <label className="block">
                  <span className="sr-only">Choose profile photo</span>
                  <input
                    onChange={(e) => handleAvatar(e)}
                    // value={info.path_avatar}
                    id="path_avatar"
                    type="file"
                    name="path_avatar"
                    accept="image/png, image/jpeg, image/jpg"
                    className="block w-full text-sm text-slate-500
                      file:mr-4 file:py-2 file:px-4
                      file:rounded-full file:border-0
                      file:text-sm file:font-semibold
                      file:bg-violet-50 file:text-[#c9c8ca]
                      hover:file:bg-[#ff5555bb]
                      "
                  />
                </label>
              </div>
            </div>
            <div className="flex flex-col justify-center items-center space-y-1">
              <div className="flex justify-center">
                <label className="text-black pb-4">
                  <span className="text-white p-2">Full_Name</span>
                  <input
                    onChange={(e) => setFullName(e.target.value)}
                    value={full_name}
                    id="full_name"
                    name="full_name"
                    type="text"
                    // placeholder="Full Name"
                    maxLength={30}
                    className="border border-gray-300 rounded-md pl-1"
                    style={{ outline: "none" }}
                  />
                </label>
              </div>
              {/* {ErrorFullname ?
                <label className="text-red-500 text-center">
                  Error input full name
                </label>: ""} */}
              <div className="flex justify-center">
                <label className="text-black pb-4">
                  <span className="text-white p-2">Nickname</span>
                  <input
                    onChange={(e) => setNickname(e.target.value)}
                    value={nickname}
                    id="nickname"
                    name="nickname"
                    // placeholder="Nickname"
                    type="text"
                    maxLength={8}
                    className="border border-gray-300 rounded-md pl-1"
                  />
                </label>
              </div>
              {/* <label className="text-red-500 text-center hidden">
                Error input nickname
              </label> */}
            </div>
            <div>
              <button
                className="border m-2 p-2 shadow-lg shadow-[#ff5555bb] rounded-xl hover:bg-[#ff5555bb]"
                // onClick={on_Submit}
              >
                Submit
              </button>
              <ToastContainer />
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
