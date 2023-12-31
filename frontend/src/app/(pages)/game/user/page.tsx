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
    //here socket
    const SocketClient = ioClient.getSocketClient();
    let table = canvasRef.current;
    console.log("client", table?.clientWidth, table?.clientHeight);
    if (!table) return;
    table.width = table.clientWidth;
    table.height = table.clientHeight;
    const context = table.getContext("2d");
    if (!context) return;
    const wallGap = table.width < 400 ? 3 : 5;
    const paddleWidth = table.width / 3;
    const paddleHeight = table.width < 400 ? 6 : 12;
    const xdownPaddle = table.width - paddleWidth - wallGap;
    const ydownPaddle = table.height - paddleHeight - wallGap;
    const xupPaddle = wallGap;
    const yupPaddle = wallGap;
    SocketClient.emit("setGameDefaultData", {
      room: SocketClient.room,
      tableWidth: table.width,
      tableHeight: table.height
    });
    SocketClient.on("playNow", (data: any) => {
      let lastTime: number;
      let firstTime: boolean = true;
          //SocketClient.emit("moveBall", {
          //  delta: 0,
          //  room: SocketClient.room,
          //  firstTime
          //});
          //firstTime = false;
          //SocketClient.on("drawBall", (payload: {
          //  data: [
          //    {sockt: string, x: number, y: number, radius: number},
          //    {sockt: string, x: number, y: number, radius: number}
          //  ],
          //}) => {
		      //  let i = payload.data[0].sockt == SocketClient.id ? 0 : 1;
          //  //data[i].x = data.x;
          //  //data[i].y = data.y;
          //  //ball.updateBall(delta, data);
          //  //console.log('drawBall = ', payload);
          //  //console.log('x = ', payload.data[i].x, ' y = ', payload.data[i].y);
          //  //context.clearRect(0, 0, table.width, table.height);
          //  console.log('i = ', i, ' ', payload);
          //  const circle = new Path2D();
          //  circle.arc(payload.data[i].x, payload.data[i].y, payload.data[i].radius, 0, 2 * Math.PI, false);
          //  context.fillStyle = '#fff';
          //  context.fill(circle);
          //})

      function update(time: number) {
        if (lastTime) {
          //console.log('update');
          const delta = time - lastTime;
          //const data = {
          //  //xDown: downPaddle.x,
          //  //yDown: downPaddle.y,
          //  //xUp: upPaddle.x,
          //  //yUp: upPaddle.y,
          //  width: paddleWidth,
          //  height: paddleHeight,
          //};

          //hona l3amal
          //SocketClient.emit("ana", "lol", "dude");
          SocketClient.emit("moveBall", {
            delta,
            room: SocketClient.room,
            firstTime
          });
          firstTime = false;
          SocketClient.on("drawBall", (data: {
            ball: [
              {sockt: string, x: number, y: number, radius: number},
              {sockt: string, x: number, y: number, radius: number}
            ],
            paddle: [
              {sockt: string, x: number},
              {sockt: string, x: number}
            ]
          }) => {
		        let i = data.ball[0].sockt == SocketClient.id ? 0 : 1;
            //data[i].x = data.x;
            //data[i].y = data.y;
            //ball.updateBall(delta, data);
            //console.log('drawBall = ', payload);
            //console.log('dddd');
            context.clearRect(0, 0, table.width, table.height);
            //draw ball
            const circle = new Path2D();
            circle.arc(data.ball[i].x, data.ball[i].y, data.ball[i].radius, 0, 2 * Math.PI, false);
            context.fillStyle = '#fff';
            context.fill(circle);

            //draw paddle
            //i = data.paddle[0].sockt == SocketClient.id ? 0 : 1;
            ////let y = data.paddle.sockt == SocketClient.id ? (table.height - paddleHeight - wallGap) : wallGap;
            //const paddle1 = new Path2D();
            //paddle1.roundRect(data.paddle[i].x,
            //                  (table.height - paddleHeight - wallGap), paddleWidth, paddleHeight, 4);
            //context.fillStyle = "#fff";
            //context.fill(paddle1);

            //i = data.paddle[0].sockt != SocketClient.id ? 0 : 1;
            //const paddle2 = new Path2D();
            //paddle1.roundRect(data.paddle[i].x, wallGap, paddleWidth, paddleHeight, 4);
            //context.fillStyle = "#fff";
            //context.fill(paddle2);

            for (let i = 0; i != 2; i++) {
              const paddle = new Path2D();
              let y = data.paddle[i].sockt == SocketClient.id ?
                (table.height - paddleHeight - wallGap) : wallGap;
              paddle.roundRect(data.paddle[i].x, y, paddleWidth, paddleHeight, 4);
              context.fillStyle = "#fff";
              context.fill(paddle);
            }
          })
        }
        lastTime = time;
        //if (!unmounted.current) {
        //  animationFrameRef.current = window.requestAnimationFrame(update);
        //}
        window.requestAnimationFrame(update);
      }
      window.requestAnimationFrame(update);

      //animationFrameRef.current = window.requestAnimationFrame(update);
    })
    //SocketClient.emit("moveBall", "");

    //const ball = new Ball(context, {
    //  radius: table.width / 30,
    //  // 0.3 easy - 10 paddle / 0.6 medium 15 paddle / 1.2 hard 17 paddle
    //  speed: table.width < 400 ? 0.2 : parseFloat(ballSpeed!),
    //  color: "#fff",
    //  gap: wallGap,
    //  tableWidth: table.width,
    //  tableHeight: table.height,
    //});

    //const downPaddle = new Paddle(context, {
    //  x: xdownPaddle,
    //  y: ydownPaddle,
    //  gap: wallGap,
    //  speed: parseFloat(paddleSpeed!),
    //  color: "#fff",
    //  width: paddleWidth,
    //  height: paddleHeight,
    //  tableWidth: table.width,
    //  tableHeight: table.height,
    //});

    //const upPaddle = new Paddle(context, {
    //  x: xupPaddle,
    //  y: yupPaddle,
    //  gap: wallGap,
    //  speed: 5,
    //  color: "#fff",
    //  width: paddleWidth,
    //  height: paddleHeight,
    //  tableWidth: table.width,
    //  tableHeight: table.height,
    //});

    //const resetAll = function () {
    //  //ball.reset();
    //  //downPaddle.reset(xdownPaddle, ydownPaddle);
    //  //upPaddle.reset(xupPaddle, yupPaddle);
    //};

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

    //    //hona l3amal
    //    //SocketClient.emit("moveBall", delta);
    //    //SocketClient.on("drawBall", (data: {x: number, y: number}) => {
    //    //  ball.x = data.x;
    //    //  ball.y = data.y;
    //    //  ball.updateBall(delta, data);
    //    //})

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
    //function handlresize() {
    //  ball.reset();
    //}
    //window.addEventListener("resize", handlresize);
    //return () => {
    //  window.removeEventListener("resize", handlresize);
    //  document.removeEventListener("keydown", handlKeyDown);
    //  window.cancelAnimationFrame(animationFrameRef.current);
    //  resetAll();
    //};
  }, [!openModal]);
  useEffect(() => {
    const timer = setTimeout(() => {
      setOpenMoadl(false);
    }, 5000);
    return () => {
      clearTimeout(timer);
    };
  }, [openModal]);
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
            {openModal && (
              <ModalGameComponent onClick={() => setOpenMoadl(false)} />
            )}
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
          >
            {/* <div
            className="relative top-[47%] left-0"
              style={{
                margin: "3px 0",
                height: "10px",
                background:
                  "repeating-linear-gradient(to right,transparent,transparent 10px,white 10px,white 20px);",
              }}
            ></div> dashed line  */}
            {!openModal && (
              <canvas
                className="w-full h-full absolute top-0 z-10"
                ref={canvasRef}
                id="table"
              ></canvas>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
