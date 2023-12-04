"use client";
import { useState, useEffect } from "react";
import default_avatar from "@/app/assets/svg/default_avatar.svg";
import { NeuePlakFontBold } from "@/app/utils/NeuePlakFont";
import { FieldErrors, useForm } from "@redwoodjs/forms";
import { ToastContainer, toast } from "react-toastify";

// sssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss
export default function Good_login() {
  const url = "http://localhost:3001/auth/signup";
  const [info, setInfo] = useState({
    full_name: "",
    nickname: "",
    // path_avatar: "",
  });

  function handleForm(e:any) {
    const { id, value } = e.target; // Destructure id and value from the event target
    const newInfo = { ...info, [id]: value }; // Update the newInfo object
    setInfo(newInfo); // Update the state
    console.log(newInfo);
  }

  // send data 
  function onSubmit(e:any) {
    e.preventDefault();

    // data.append("path_avatar", info.path_avatar);
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
  }


  return (
    <main className="h-screen bg-[#0B0813] relative w-full max-w-[5120px] flex">
      <div className="flex w-full h-screen items-center justify-center  flex-col bg-gradient-radial">
        <div
          className={`w-1/3 h-1/2 bg-[#15131D] border border-rgb-129-87-98 rounded-3xl  flex flex-col items-center justify-center ${NeuePlakFontBold.className} drop-shadow-2xl shadow-lg shadow-[#15131D]`}
        >
          <form
            className="flex  flex-col items-center space-6 p-12"
            onSubmit={(e) => onSubmit(e)}
          >
            <div className="Avatar flex flex-col justify-center items-center space-y-3">
              <img
                className="h-150 w-150 object-cover rounded-full"
                // hna ghadi i5asni ndir blast default_avatar ndir variable li mstori fih tswira
                src={default_avatar.src}
                alt="Current profile photo"
              />
              <div className="Avatar flex flex-col justify-center items-center pl-28 pb-6">
                <label className="block">
                  <span className="sr-only">Choose profile photo</span>
                  <input
                    onChange={(e) => handleForm(e)}
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
                    onChange={(e) => handleForm(e)}
                    value={info.full_name}
                    id="full_name"
                    name="full_name"
                    type="text"
                    maxLength={30}
                    className="border border-gray-300 rounded-md"
                  />
                </label>
              </div>
              <div className="flex justify-center">
                <label className="text-black pb-4">
                  <span className="text-white p-2">Nickname</span>
                  <input
                    onChange={(e) => handleForm(e)}
                    value={info.nickname}
                    id="nickname"
                    name="nickname"
                    type="text"
                    maxLength={8}
                    className="border border-gray-300 rounded-md"
                  />
                  
                </label>
              </div>
            </div>
            <div>
              <button
                className="border m-2 p-2 shadow-lg shadow-[#ff5555bb] rounded-xl hover:bg-[#ff5555bb]"
                type="submit"
              >
                Save
              </button>
               <ToastContainer />
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
