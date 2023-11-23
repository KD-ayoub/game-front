"use client";
import { useState, useEffect } from "react";

export default function goodOK() {
  const [data, setData] = useState({});
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function getInfoLogin() {
      const response = await fetch("http://localhost:3001/auth/status", {
        method: "GET",
        //mode: 'cors',
        headers: {
          //'Host':'http://localhost:3001',
          "Content-Type": "application/json",
          //'Access-Control-Allow-Origin': '*',
        },
        credentials: "include",
      });
      // const response = await fetch('./fakejson/mainprofile.json')
      if (!response.ok) {
        const ok = await response.json();
        setMessage(ok.message);
        console.log("error fetching data");
        return;
      }
      //await console.log(response);
    }
    getInfoLogin();
  }, []);

  return (
    <main className="h-screen bg-[#0B0813] relative w-full max-w-[5120px] flex">
      <div className="flex w-full h-screen items-center justify-center  flex-col bg-gradient-radial">
        <div className="w-514 h-601 bg-[#15131D] border border-rgb-129-87-98 rounded-3xl p-10 flex flex-col items-center justify-center">
            <input type="picture" />
        </div>
      </div>
    </main>
  );
}
