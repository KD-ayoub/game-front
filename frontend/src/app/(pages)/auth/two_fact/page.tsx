"use client";
import { useState, useEffect } from "react";
import default_avatar from "@/app/assets/svg/default_avatar.svg";
import { NeuePlakFontBold } from "@/app/utils/NeuePlakFont";
import { ToastContainer, toast } from "react-toastify";

// sssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss
export default function Good_login() {
  const url = "http://localhost:3001/auth/2fa";
  const [info, setInfo] = useState({
    code_two_fact: "",
  });
  
  const notify = () => {
    toast.success('🦄 Wow so easy!', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      });
  };

  function handleSubmit(e:any) {
    const { id, value } = e.target; // Destructure id and value from the event target
    const newInfo = { ...info, [id]: value }; // Update the newInfo object
    setInfo(newInfo); // Update the state
    console.log(newInfo);
  }

  // send data 
  function onSubmit(e:any) {
    e.preventDefault();
    const data = new FormData();
    data.append("code_two_fact", info.code_two_fact);
    // data.append("path_avatar", info.path_avatar);
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
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
              <div className="flex justify-center">
                <label className="text-black pb-4">
                  <span className="text-white p-2">Code</span>
                  <input
                    onChange={(e) => handleSubmit(e)}
                    value={info.code_two_fact}
                    id="code_two_fact"
                    name="code_two_fact"
                    type="text"
                    maxLength={10}
                    className="border border-gray-300 rounded-md"
                  />
                </label>
              </div>
            <div>
              <button
                onClick={notify}
                className="border m-2 p-2 shadow-lg shadow-[#ff5555bb] rounded-xl hover:bg-[#ff5555bb]"
                type="submit"
              >
                Enter the code
              </button>
              <ToastContainer />
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
