"use client";

import { Header, PlayMode, SideBar, GameLevel } from "@/app/components";
import { useState } from "react";
import Image from "next/image";
import WithFriend from "@/app/assets/svg/game/withFriend.svg";
import WithRandom from "@/app/assets/svg/game/withRandom.svg";
import WithBot from "@/app/assets/svg/game/withBot.svg";
import { NeuePlakFont, NeuePlakFontBold } from "@/app/utils/NeuePlakFont";
import Profilepic from "@/app/assets/svg/profile.svg";
import { LittleSearchBar } from "@/app/components";
//import socket
import { type Socket, io } from "socket.io-client";
import { Manager } from "socket.io-client/debug";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import {useEffect} from "react";

//test redirect
//import { useRouter } from 'next/router';
import { useRouter, useSearchParams } from "next/navigation";
import ModalMapsComponent from "@/app/components/game/ModalMapsComponent";

import { ioClient, SocketClient } from "@/app/api/instance";

export default function Game() {
  const [openMapModal, setOpenMapMoadl] = useState(false);
  const [isHumburgClicked, setisHumburgClicked] = useState(false);
  const [friendCard, setFriendCard] = useState(false);
  const [randomCard, setRandomCard] = useState(false);
  const [botCard, setBotCard] = useState(false);
  const [orange, setOrange] = useState(false);
  const [blue, setBlue] = useState(false);
  const [green, setGreen] = useState(false);
  const [src, setSrc] = useState(false);

  const marginbody = isHumburgClicked ? "ml-6" : "";

  const router = useRouter();

  function handlFriendClick() {
    setFriendCard(true);
    setRandomCard(false);
    setBotCard(false);
  }

  function handlRandomClick() {
    setFriendCard(false);
    setRandomCard(true);
    setBotCard(false);
  }

  function handlBotClick() {
    setFriendCard(false);
    setRandomCard(false);
    setBotCard(true);
  }

  function handlUserClick(id: string) {
    console.log('id bb = ', id);
    const SocketClient = ioClient.getSocketClient();
    //SocketClient.emit("play", "40310425-c880-4890-9052-29fb2637dae7");
    SocketClient.emit("playWithFriend", {playerId: id, nickName: null});
    //SocketClient.on("popup", () => {
    //  console.log('zabiiiiiiiiiiiiiii');
    //})

    //playFriendTst();
    //setOpenMapMoadl(!openMapModal);
  }

  //useEffect(() => {
  //  const SocketClient = ioClient.getSocketClient();
  //  SocketClient.on("popup", () => {
  //    console.log('zabiiiiiiiiiiiiiii');
  //          Swal.fire({
  //            title: "You have lost",
  //            text: "",
  //            imageUrl: `${Profilepic.src}`,
  //            imageWidth: 400,
  //            imageHeight: 200,
  //            imageAlt: "Custom image",
  //            allowOutsideClick: false,
  //          }).then(res => {
  //            console.log('then = ', res);
  //            //router.push('/game')
  //          });
  //  })

  //}, []);
  
  console.log("div color", orange, blue, green);
  return (
    <main className="h-screen bg-[#0B0813] relative w-full max-w-[5120px] flex">
      <div className="h-[80px] w-[80px] sm:w-28 sm:h-28 md:w-64 md:h-64 lg:w-80 lg:h-80 xl:w-[480px] xl:h-[480px] 2xl:w-[550px] 2xl:h-[550px] rounded-full fixed -top-5 sm:-top-10 md:-top-32 lg:-top-40 xl:-top-64 right-0 opacity-70 sm:opacity-60 md:opacity-30 lg:opacity-25 xl:opacity-20 2xl:opacity-[0.19] bg-gradient-to-b from-[#323138] via-[#E95A3A] to-[#60C58D] blur-3xl "></div>
      <Header
        isHumburgClicked={isHumburgClicked}
        setisHumburgClicked={setisHumburgClicked}
      />
      <SideBar isHumburgClicked={isHumburgClicked} />
      <div
        className={`grow overflow-y-auto mt-[41px] sm:mt-11 md:mt-14 lg:mt-[72px] xl:mt-[96px] 2xl:mt-[128px] ${marginbody} //flex justify-center items-center//`}
      >
        <div
          className={`text-white ml-[10px] text-[20px] md:text-[30px] lg:text-[38px] xl:text-[44px] 2xl:text-[60px] ${NeuePlakFontBold.className} `}
        >
          Game
        </div>
        {openMapModal && (
          <ModalMapsComponent
            mapOrange={() => setOrange(true)}
            mapBlue={() => setBlue(true)}
            mapGreen={() => setGreen(true)}
            onClick={(data: string) => handlUserClick(data)}
            openModal={openMapModal}
          />
        )}
        <div className="flex justify-center relative w-full h-full">
          <div className="flex justify-center items-center flex-wrap lg:gap-[45px] xl:gap-[75px] 2xl:gap-[165px] absolute top-[5%] sm:top-[10%]">
            <div className="m-2 relative" onClick={handlFriendClick}>
              {!friendCard && (
                <PlayMode Picture={WithFriend.src} Mode="Play with a friend" />
              )}
              {friendCard && (
                <div className="w-[220px] h-[370px] md:w-[260px] md:h-[390px] lg:w-[300px] lg:h-[450px] xl:w-[370px] xl:h-[520px] 2xl:w-[550px] 2xl:h-[620px] bg-[#15131D] rounded-[15px]">
                  <div className="flex justify-center p-4 xl:p-5 2xl:p-7">
                    <p
                      className={`${NeuePlakFont.className} text-white md:text-[20px] lg:text-[25px] xl:text-[30px] 2xl:text-[38px]`}
                    >
                      Search for a friend
                    </p>
                  </div>
                  <LittleSearchBar onClick={(data: string) => handlUserClick(data)} />
                </div>
              )}
            </div>
            <div className="m-2 relative" onClick={handlRandomClick}>
              {!randomCard && (
                <PlayMode Picture={WithRandom.src} Mode="Play with a random" />
              )}
              {randomCard && (
                <div className="flex justify-around items-center flex-col w-[178px] h-[179px] sm:w-[220px] sm:h-[221px] lg:w-[320px] lg:h-[321px] xl:w-[420px] xl:h-[421px] 2xl:w-[620px] 2xl:h-[621px] bg-[#15131D] rounded-[10px] md:rounded-[13px] lg:rounded-[15px] xl:rounded-[20px] 2xl:rounded-[25px]">
                  <Image
                    draggable={false}
                    className="sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 xl:w-36 xl:h-36 2xl:w-44 2xl:h-44"
                    src={Profilepic.src}
                    width={80}
                    height={80}
                    alt="Profile pic"
                  />
                  <button
                    disabled={blue || green || orange ? true : false}
                    onClick={() => {
                      setOpenMapMoadl(true);
                        console.log('entered hereeeeee', blue, green, orange);
                        // playRandom();
                    }}
                  >
                    {/* TODO: when map is choosen need to hide modal and disable button  */}
                    <div
                      className="w-[8rem] h-8 md:w-[9rem] md:h-9 lg:w-[12rem] lg:h-11 xl:w-[14rem] xl:h-14 2xl:w-[16rem] 2xl:h-16 bg-[#E95A3A] rounded-[20px] xl:rounded-[24px] 2xl:rounded-[28px] flex justify-center items-center cursor-pointer"
                      //onClick={() => setOpenMapMoadl(true)}
                    >
                      <p
                        className={`${NeuePlakFont.className} text-white md:text-[20px] lg:text-[25px] xl:text-[30px] 2xl:text-[36px]`}
                      >
                        Play Random
                      </p>
                    </div>
                  </button>
                </div>
              )}
            </div>
            <div className="m-2 relative" onClick={handlBotClick}>
              {!botCard && (
                <PlayMode Picture={WithBot.src} Mode="Play with a Bot" />
              )}
              {/* <div className="w-[220px] h-[370px] bg-[#15131D]"></div> this is for back of card */}
              {botCard && <GameLevel />}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
