"use client";

import Link from "next/link";
import React, { useEffect } from "react";
import { useState } from "react";
import { Header, SideBar, ModalGameComponent } from "@/app/components";
import { useRef } from "react";
import Ball from "./botcode/Ball";
import Paddle from "./botcode/Paddle";
import { NeuePlakFont, NeuePlakFontBold } from "@/app/utils/NeuePlakFont";
import ProfileImg from "@/app/assets/svg/game/withBot.svg";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { SettingsType } from "@/app/types/settingsType";
import getSettings from "@/app/api/Settings/getSettings";
import Swal from "sweetalert2";
import './styles.css';

//import socket
import { ioClient, SocketClient } from "@/app/api/instance";
import { type Socket, io } from "socket.io-client";
import { Manager } from "socket.io-client/debug";

export default function Bot() {
  const [dataSettings, setDataSettings] = useState<SettingsType>({
    id: "",
    full_name: "",
    nickName: "",
    fac_auth: false,
    photo_path: `${ProfileImg.src}`,
  });
  const [isHumburgClicked, setisHumburgClicked] = useState(false);
  const marginbody = isHumburgClicked ? "ml-6" : "";
  const [openModal, setOpenMoadl] = useState(true);
  const searchParams = useSearchParams();
  const paddleSpeed = searchParams.get("paddle")
    ? searchParams.get("paddle")
    : "10";
  const ballSpeed = searchParams.get("ball") ? searchParams.get("ball") : "0.3";
  console.log(
    "paddle\nspeed",
    parseFloat(paddleSpeed!),
    parseFloat(ballSpeed!)
  );
  const router = useRouter();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const playerRef = useRef<HTMLParagraphElement>(null);
  const unmounted = useRef(false);
  const animationFrameRef = useRef(-1);
   useEffect(() => {
     //let table = canvasRef.current;
     //console.log("client", table?.clientWidth, table?.clientHeight);
     //if (!table) return;
     //table.width = table.clientWidth;
     //table.height = table.clientHeight;
     //const context = table.getContext("2d");
     //if (!context) return;
     //const wallGap = table.width < 400 ? 3 : 5;
     //const paddleWidth = table.width / 3;
     //const paddleHeight = table.width < 400 ? 6 : 12;
     //const xdownPaddle = table.width - paddleWidth - wallGap;
     //const ydownPaddle = table.height - paddleHeight - wallGap;
     //const xupPaddle = wallGap;
     //const yupPaddle = wallGap;
     //here socket
       let ballObj: Ball;
       let paddlePlayer: Paddle;
       let paddleOpponent: Paddle;
       //give this one a type to work with
     const SocketClient = ioClient.getSocketClient();
     console.log('allllll');
     const ballData = document.getElementById('ball');
     const ballElem = document.getElementById('ball');
     const tst = document.getElementById('tst');
     const paddleTop = document.getElementById('paddle-top');
     const paddleBottom = document.getElementById('paddle-bottom');
     //console.log('paddle up width = ',
     //document.getElementById('paddle-top').offsetWidth,
     //'paddle up height = ', document.getElementById('paddle-top').offsetHeight);
     //console.log('paddle bottom width = ',
     //document.getElementById('paddle-bottom').offsetWidth,
     //'paddle bottom height = ', document.getElementById('paddle-bottom').offsetHeight);
     console.log(ballData?.offsetWidth)
     SocketClient.emit("setGameDefaultData", {
       room: ioClient.room, //here and other use SocketClient
       ballWidth: ballData?.offsetWidth,
       ballHeight: ballData?.offsetHeight,
       tableWidth: document.getElementById('game').offsetWidth,
       tableHeight: document.getElementById('game').offsetHeight
     });

     //SocketClient.on("setGameDefaultRender", (
     //  ballData: [
     //    {socket: string, radius: number, speed: number, xpos: number, ypos: number, dx: number, dy: number},
     //    {socket: string, radius: number, speed: number, xpos: number, ypos: number, dx: number, dy: number}
     //  ],
     //  paddleData: [
     //    {socket: string, speed: number, xpos: number, ypos: number},
     //    {socket: string, speed: number, xpos: number, ypos: number}
     //  ]
     //) => {
     //  //console.log('ballData = ', ballData);
     //  //console.log('paddleData = ', paddleData);
     //  let i = (ballData[0].socket === SocketClient.id) ? 0 : 1;
     //  ballObj = new Ball(context, {
     //    radius: ballData[i].radius,
     //    speed: ballData[i].speed,
     //    color: "#fff",
     //    gap: wallGap,
     //    dx: ballData[i].dx,
     //    dy: ballData[i].dy,
     //    xpos: ballData[i].xpos,
     //    ypos: ballData[i].ypos,
     //    tableWidth: table?.width,
     //    tableHeight: table?.height,
     //  });

     //  if (paddleData[i].ypos === wallGap) {
     //    //console.log('************ GGGGGGGG');
     //    table?.classList.add('rotate-180');
     //    table?.classList.add('-scale-x-100');
     //    //console.log();
     //  //  table?.className.concat('rotate-180');
     //  }
     //    //table?.className.concat('rotate-180');
     //  //i = (paddleData[0].socket === SocketClient.id) ? 0 : 1;
     //  paddlePlayer = new Paddle(context, {
     //    x: paddleData[i].xpos,
     //    y: paddleData[i].ypos,
     //    gap: wallGap,
     //    speed: paddleData[i].speed,
     //    color: "#fff",
     //    width: paddleWidth,
     //    height: paddleHeight,
     //    tableWidth: table?.width ?? 0,
     //    tableHeight: table?.height ?? 0,
     //  });

     //  i = (paddleData[0].socket !== SocketClient.id) ? 0 : 1;
     //  paddleOpponent = new Paddle(context, {
     //    x: paddleData[i].xpos,
     //    y: paddleData[i].ypos,
     //    gap: wallGap,
     //    speed: paddleData[i].speed,
     //    color: "#fff",
     //    width: paddleWidth,
     //    height: paddleHeight,
     //    tableWidth: table?.width ?? 0,
     //    tableHeight: table?.height ?? 0,
     //  });
     //});

     //const resetAll = function () {
     //  //ball.reset();
     //  //downPaddle.reset(xdownPaddle, ydownPaddle);
     //  //upPaddle.reset(xupPaddle, yupPaddle);
     //};
     let chk = true;
     SocketClient.on("playNow", (data: any) => {
       //console.log('f play now');
       let lastTime: number;
       let firstTime: boolean = true;
       SocketClient.on("drawGameAssets", (
        ball: [
          {socket: string, xpos: number, ypos: number, radius: number},
          {socket: string, xpos: number, ypos: number, radius: number}
        ],
        paddle: [
          {socket: string, pos: number, sight: string, speed: number},
          {socket: string, pos: number, sight: string, speed: number}
          //{socket: string, xpos: number, ypos: number},
          //{socket: string, xpos: number, ypos: number}
        ]
      ) => {
        let i = (ball[0].socket === SocketClient.id) ? 0 : 1;
        //const ballElem = document.getElementById('ball');
        //ballElem?.style.setProperty("--y", "50");
        //ballElem?.style.setProperty("--x", "50");
        ballElem?.style.setProperty("--y", ball[i].ypos.toString());
        ballElem?.style.setProperty("--x", ball[i].xpos.toString());

        tst?.style.setProperty("--y", "87");
        tst?.style.setProperty("--x", "50");
           //paddleTop?.style.setProperty("--position", "15");
           if (paddle[i].sight === "BOTTOM") {
             const j = (paddle[0].socket !== SocketClient.id) ? 0 : 1;
             paddleBottom?.style.setProperty("--position", paddle[i].pos.toString());
             paddleTop?.style.setProperty("--position", paddle[j].pos.toString());
           }
           else {
             if (chk) {
              const a = document.getElementById('game');
              a?.classList.add('rotate-180');
              a?.classList.add('-scale-x-100');
              chk = false;
             }
             const j = (paddle[0].socket !== SocketClient.id) ? 0 : 1;
             paddleTop?.style.setProperty("--position", paddle[i].pos.toString());
             paddleBottom?.style.setProperty("--position", paddle[j].pos.toString());
           }
           //ballElem?.style.setProperty("--x", ball[i].xpos.toString());


           //********later
           //if (paddle[i].xpos) {
           //  const a = document.getElementById('game');
           //  a?.classList.add('rotate-180');
           //  //a?.classList.add('-scale-x-100');
           //  //table?.classList.add('-scale-x-100');
           //}

         //if (i === 0) {
         //  ballElem?.style.setProperty("--y", ball[i].ypos.toString());
         //  ballElem?.style.setProperty("--x", ball[i].xpos.toString());
         //} else {
         //  ballElem?.style.setProperty("--y", (ball[i].ypos).toString());
         //  ballElem?.style.setProperty("--x", ball[i].xpos.toString());
         //}

         //const paddleElem = document.getElementById('paddle-top');
         //const tableElem = document.getElementById('table');
         //document.addEventListener('keydown', (e) => {
         //  if (e.code === 'ArrowLeft') {
         //    // 16 -> 700 left right 83
         //    // x -> 200
         //    paddleElem?.style.setProperty("--position", "16");
         //    ballElem?.style.setProperty("--y", "16");
         //    ballElem?.style.setProperty("--x", "20");
         //    console.log('paddle position ', getComputedStyle(paddleElem!).getPropertyValue('--position'));
         //  }
         //  if (e.code === 'ArrowRight') {
         //    paddleElem?.style.setProperty("--position", "83");
         //    console.log('paddle position ', getComputedStyle(paddleElem!).getPropertyValue('--position'));
         //  }
         //  console.log(e.code)
         //})
         //ballObj.updateBall(ball[i]);
         //paddlePlayer.updatePaddle(paddle[i]);
          //i = (ball[0].sockt !== SocketClient.id) ? 0 : 1;
         //paddleOpponent.updatePaddle(paddle[i]);
      })
       function update(time: number) {
         if (lastTime) {
           const delta = time - lastTime;
           //hona l3amal
           SocketClient.emit("moveBall", {
             delta,
             room: ioClient.room,
             firstTime
           });
           firstTime = false;
           
         }
         lastTime = time;
         if (!unmounted.current) {
          animationFrameRef.current = window.requestAnimationFrame(update);
         }
         // window.requestAnimationFrame(update);
       }
      //  window.requestAnimationFrame(update);
       animationFrameRef.current = window.requestAnimationFrame(update);
     })
     function handlKeyDown(e: KeyboardEvent) {
       switch (e.code) {
         case "ArrowRight":
           SocketClient.emit("movePaddle", {room: ioClient.room, move: "right"});
           break;
         case "ArrowLeft":
           SocketClient.emit("movePaddle", {room: ioClient.room, move: "left"});
           break;
       }
     }
     document.addEventListener("keydown", handlKeyDown);
     // function handlresize() {
     //  ballObj.reset();
     // }
     // window.addEventListener("resize", handlresize);
     // return () => {
     //  window.removeEventListener("resize", handlresize);
     //  document.removeEventListener("keydown", handlKeyDown);
     //  window.cancelAnimationFrame(animationFrameRef.current);
     //  resetAll();
     // };
     //let lastTime: number;
     //function update(time: number) {
     //  if (lastTime) {
     //    const delta = time - lastTime;
     //    const data = {
     //      //xDown: downPaddle.x,
     //      //yDown: downPaddle.y,
     //      //xUp: upPaddle.x,
     //      //yUp: upPaddle.y,
     //      width: paddleWidth,
     //      height: paddleHeight,
     //    };
     //    //if (ball.checkLoss(data)) {
     //    //  resetAll();
     //    //  playerRef.current!.innerHTML = (
     //    //    parseInt(playerRef.current!.innerHTML) + 1
     //    //  ).toString();
     //    //  if (playerRef.current!.innerHTML === "7") {
     //    //    //show modal
     //    //    // redirect to profile
     //    //    Swal.fire({
     //    //      title: "You have lost",
     //    //      text: "",
     //    //      imageUrl: `${ProfileImg.src}`,
     //    //      imageWidth: 400,
     //    //      imageHeight: 200,
     //    //      imageAlt: "Custom image",
     //    //      allowOutsideClick: false,
     //    //    }).then(res => {
     //    //      router.push('/game')
     //    //    });
     //    //    return () => {
     //    //      window.removeEventListener("resize", handlresize);
     //    //      document.removeEventListener("keydown", handlKeyDown);
     //    //      window.cancelAnimationFrame(animationFrameRef.current);
     //    //      resetAll();
     //    //    }
     //    //  }
     //    //}
     //    //ball.updateBall(delta, data);
     //    //downPaddle.updatePaddle();
     //    //upPaddle.updateBotPaddle(ball.x);
     //  }
     //  lastTime = time;
     //  if (!unmounted.current) {
     //    animationFrameRef.current = window.requestAnimationFrame(update);
     //  }
     //}
     //animationFrameRef.current = window.requestAnimationFrame(update);
     //function handlKeyDown(e: KeyboardEvent) {
     //  switch (e.code) {
     //    case "ArrowRight":
     //      if (!downPaddle.checkRightWall()) downPaddle.movePaddle(e.code);
     //      break;
     //    case "ArrowLeft":
     //      if (!downPaddle.checkLeftWall()) downPaddle.movePaddle(e.code);
     //      break;
     //  }
     //}
     //document.addEventListener("keydown", handlKeyDown);
  
   }, []);
  // useEffect(() => {
  //   //const ballElem = document.getElementById('ball');
  //   //const paddleElem = document.getElementById('paddle-top');
  //   //const tableElem = document.getElementById('table');
  //   //document.addEventListener('keydown', (e) => {
  //   //  if (e.code === 'ArrowLeft') {
  //   //    // 16 -> 700 left right 83
  //   //    // x -> 200
  //   //    paddleElem?.style.setProperty("--position", "16");
  //   //    ballElem?.style.setProperty("--y", "16");
  //   //    ballElem?.style.setProperty("--x", "20");
  //   //    console.log('paddle position ', getComputedStyle(paddleElem!).getPropertyValue('--position'));
  //   //  }
  //   //  if (e.code === 'ArrowRight') {
  //   //    paddleElem?.style.setProperty("--position", "83");
  //   //    console.log('paddle position ', getComputedStyle(paddleElem!).getPropertyValue('--position'));
  //   //  }
  //   //  console.log(e.code)
  //   //})
  //   //console.log('window inner', tableElem?.offsetHeight);
  //   //console.log('paddle position ', getComputedStyle(paddleElem!).getPropertyValue('--position'));
  //   const timer = setTimeout(() => {
  //     setOpenMoadl(false);
  //   }, 5000);
  //   return () => {
  //     clearTimeout(timer);
  //   };
  // }, [openModal]);
  useEffect(() => {
    async function fetcher() {
      setDataSettings(await getSettings());
    }
    fetcher();
  }, []);
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
        <div className="flex flex-col items-center w-full h-full gap-2 mt-20">
          <div className="w-[200px] h-12 sm:w-[300px] sm:h-14 md:w-[400px] md:h-16 lg:w-[500px] lg:h-[70px] xl:w-[600px] xl:h-[75px] 2xl:w-[700px] 2xl:h-[100px] p-2 flex justify-between">
            {/* {openModal && (
              <ModalGameComponent onClick={() => setOpenMoadl(false)} />
            )} */}
            <div className="flex justify-center">
              <div className="flex flex-col justify-center items-center">
                <Image
                  draggable={false}
                  className="sm:w-[25px] sm:h-[25px] md:w-8 md:h-8 lg:w-10 lg:h-10 xl:w-12 xl:h-12 2xl:w-16 2xl:h-16 rounded-full"
                  src={dataSettings.photo_path}
                  width={20}
                  height={20}
                  alt="profile pic"
                />
                <p
                  className={`${NeuePlakFont.className} text-white text-[12px] sm:text-[14px] md:text-[18px] lg:text-[22px] xl:text-[28px] 2xl:text-[35px]`}
                >
                  {dataSettings.nickName}
                </p>
              </div>
            </div>
            <div className="flex gap-2 items-center">
              <p
                ref={playerRef}
                className={`${NeuePlakFont.className} text-white sm:text-[18px] md:text-[22px] lg:text-[30px] xl:text-[38px] 2xl:text-[45px]`}
              >
                0
              </p>
              <p
                className={`${NeuePlakFont.className} text-white sm:text-[18px] md:text-[22px] lg:text-[30px] xl:text-[38px] 2xl:text-[45px]`}
              >
                :
              </p>
              <p
                className={`${NeuePlakFont.className} text-white sm:text-[18px] md:text-[22px] lg:text-[30px] xl:text-[38px] 2xl:text-[45px]`}
              >
                0
              </p>
            </div>
            <div className="flex justify-center">
              <div className="flex flex-col justify-center items-center">
                <Image
                  draggable={false}
                  className="sm:w-[25px] sm:h-[25px] md:w-8 md:h-8 lg:w-10 lg:h-10 xl:w-12 xl:h-12 2xl:w-16 2xl:h-16 rounded-full"
                  src={ProfileImg.src}
                  width={20}
                  height={20}
                  alt="profile pic"
                />
                <p
                  className={`${NeuePlakFont.className} text-white text-[12px] sm:text-[14px] md:text-[18px] lg:text-[22px] xl:text-[28px] 2xl:text-[35px]`}
                >
                  PongBot
                </p>
              </div>
            </div>
          </div>
          <div
            className="relative w-[200px] h-[400px] sm:w-[300px] sm:h-[500px] md:w-[400px] md:h-[600px] lg:w-[500px] lg:h-[700px] xl:w-[600px] xl:h-[800px] 2xl:w-[700px] 2xl:h-[900px] bg-[#E95A3A] rounded-[8px] md:rounded-[12px] lg:rounded-[18px] xl:rounded-[25px] 2xl:rounded-[28px]"
            style={{
              background:
                "linear-gradient( to bottom, #E95A3A 0%,#E95A3A 50%, #F07559 50%, #F07559 100%)",
            }}
            id="table"
          >
            <div className="h-full w-full" id="game">
              <div className="ball" id="ball"></div>
              <div className="ball" id="tst"></div>
              <div className="paddle top" id="paddle-top"></div>
              <div className="paddle bottom" id="paddle-bottom"></div>
              <div className="middle-line"></div>
            </div>

            {/* {!openModal && (
              <canvas
                className="w-full h-full absolute top-0 z-10 aspect-video"
                ref={canvasRef}
                id="table"
              ></canvas>
            )} */}
          </div>
        </div>
      </div>
    </main>
  );
}
