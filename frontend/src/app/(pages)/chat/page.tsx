"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import {
  Header,
  SideBar,
  OnlineNow,
  ChannelMessaged,
  FriendsMessaged,
  FriendConversation,
} from "@/app/components";
import "./chat.css";
import { NeuePlakFont } from "@/app/utils/NeuePlakFont";
import io from "socket.io-client";

const socket = io("http://localhost:3001/chat/conv");

export default function Chat() {
  const [isHumburgClicked, setisHumburgClicked] = useState(false);
  const marginbody = isHumburgClicked ? "ml-6" : "";
  const [option, setOption] = useState("Friends");
  const [messages, setMessages] = useState<string[]>([]);
  const [messageText, setMessageText] = useState<string>("");
  const [showConv, setShowConv] = useState(false); // set initial value to false

  useEffect(() => {
    socket.on("message", (message: string) => {
      setMessages([...messages, message]);
    });
  }, [messages]);

  const sendMessage = () => {
    socket.emit("sendMessage", { text: messageText });
    setMessageText("");
  };

  return (
    <main className="h-screen bg-[#0B0813] relative w-full max-w-[5120px] flex">
      <div
        className="h-[80px] w-[80px] sm:w-28 sm:h-28 md:w-64 md:h-64 lg:w-80 lg:h-80 xl:w-[480px] 
      xl:h-[480px] 2xl:w-[550px] 2xl:h-[550px] rounded-full fixed -top-5 sm:-top-10 md:-top-32 lg:-top-40 
      xl:-top-64 right-0 opacity-70 sm:opacity-60 md:opacity-30 lg:opacity-25 xl:opacity-20 2xl:opacity-[0.19] 
      bg-gradient-to-b from-[#323138] via-[#E95A3A] to-[#60C58D] blur-3xl "
      ></div>
      <Header
        isHumburgClicked={isHumburgClicked}
        setisHumburgClicked={setisHumburgClicked}
      />
      <SideBar isHumburgClicked={isHumburgClicked} />
      <div
        className={`grow overflow-y-auto mt-[41px] sm:mt-11 md:mt-14 lg:mt-[72px] xl:mt-[96px] 2xl:mt-[128px] ${marginbody} flex justify-center items-center`}
        >
        <div
          className={`chat ${NeuePlakFont.className}`}
        >
          <div className="chat-left-side">
            {!showConv && <OnlineNow />} {/* only render if !showConv */}
            {!showConv && (
              <div className="msgSelect">
                <select
                  name="Messages"
                  className="bg-[#15131D] text-center w-32 h-7 rounded-md "
                  value={option}
                  onChange={(e) => setOption(e.target.value)}
                >
                  <option value="Friends">Friends</option>
                  <option value="Channels">Channels</option>
                </select>
              </div>
            )}
            {option === "Friends" && !showConv && (
              <FriendsMessaged
                onChange={(value: boolean) => setShowConv(value)}
              />
            )}
            {option === "Channels" && !showConv && (
              <ChannelMessaged
                onChange={(value: boolean) => setShowConv(value)}
              />
            )}
          </div>
          {/* {showConv && <FriendConversation />} only render if showConv */}
          <FriendConversation />
        </div>
      </div>
    </main>
  );
}
