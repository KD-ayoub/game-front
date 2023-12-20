"use client";

import Link from "next/link";
import React, { useEffect } from "react";
import { useState } from "react";
import { Header, SideBar } from "@/app/components";
import { useRef } from "react";
import Ball from "./botcode/Ball";
import Paddle from "./botcode/Paddle";

export default function Chat() {
  const [isHumburgClicked, setisHumburgClicked] = useState(false);
  const marginbody = isHumburgClicked ? "ml-6" : "";

  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    let table = canvasRef.current;
    if (!table) return;
    table.width = 200;
    table.height = 400;

    const context = table.getContext("2d");
    if (!context) return;
    const ball = new Ball(context, {
      radius: 10,
      speed: 0.3,
      color: "#fff",
    });
    const paddleWidth = table.width / 3;
    const paddleHeight = 10;
    const xdownPaddle = table.width - paddleWidth - 3;
    const ydownPaddle = table.height - paddleHeight - 3;
    const xupPaddle = 3;
    const yupPaddle = 3;

    const downPaddle = new Paddle(context, {
      x: xdownPaddle,
      y: ydownPaddle,
      speed: 0.4,
      color: "#fff",
    });

    const upPaddle = new Paddle(context, {
      x: xupPaddle,
      y: yupPaddle,
      speed: 0.4,
      color: "#fff",
    });

    const resetAll = function () {
      ball.reset();
      downPaddle.reset(xdownPaddle, ydownPaddle);
      upPaddle.reset(xupPaddle, yupPaddle);
    };
    let lastTime:number;
    function update(time: number) {
      if (lastTime) {
        const delta = time - lastTime;
        //if (ball.checkLoss()) resetAll();
        ball.updateBall(delta, {
          xDown: downPaddle.x,
          xUp: upPaddle.x,
          yDown: downPaddle.x,
          yUp: upPaddle.y,
          width: paddleWidth,
          height: paddleHeight,
        });
        //downPaddle.updatePaddle();
        //upPaddle.updateBotPaddle(ball.x);
      }
      lastTime = time;
      window.requestAnimationFrame(update);
    }

    window.requestAnimationFrame(update);

    document.addEventListener("keydown", (e) => {
      switch (e.code) {
        case "ArrowRight":
          if (!downPaddle.checkRightWall()) downPaddle.movePaddle(e.code);
          break;
        case "ArrowLeft":
          if (!downPaddle.checkLeftWall()) downPaddle.movePaddle(e.code);
          break;
      }
    });

    console.log("dim", table.width, table.height);
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
        <div className="flex justify-center m-5">
          <canvas
            className=" bg-[#E95A3A] rounded-[8px]"
            ref={canvasRef}
            id="table"
          ></canvas>
        </div>
      </div>
    </main>
  );
}
