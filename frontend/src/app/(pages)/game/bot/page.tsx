"use client";

import Link from "next/link";
import React, { useEffect } from "react";
import { useState } from "react";
import { Header, SideBar } from "@/app/components";
import { useRef } from "react";
import Ball from "./botcode/Ball";
import Paddle from "./botcode/Paddle";
import { NeuePlakFont, NeuePlakFontBold } from "@/app/utils/NeuePlakFont";

export default function Chat() {
  const [isHumburgClicked, setisHumburgClicked] = useState(false);
  const marginbody = isHumburgClicked ? "ml-6" : "";

  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    function handlresize() {
      let table = canvasRef.current;
      console.log("client", table?.clientWidth, table?.clientHeight);
      if (!table) return;
      table.width = table.clientWidth;
      table.height = table.clientHeight;
      const context = table.getContext("2d");
      if (!context) return;
      const wallGap = (table.width < 400) ? 3 : 5;
      const paddleWidth = table.width / 3;
      const paddleHeight = (table.width < 400) ? 6 : 12;
      const xdownPaddle = table.width - paddleWidth - wallGap;
      const ydownPaddle = table.height - paddleHeight - wallGap;
      const xupPaddle = wallGap;
      const yupPaddle = wallGap;

      const ball = new Ball(context, {
        radius: table.width / 30,
        speed: (table.width < 400) ? 0.2 : 0.3,
        color: "#fff",
        gap: wallGap,
        tableWidth: table.width,
        tableHeight: table.height,
      });

      const downPaddle = new Paddle(context, {
        x: xdownPaddle,
        y: ydownPaddle,
        gap: wallGap,
        speed: 5,
        color: "#fff",
        width: paddleWidth,
        height: paddleHeight,
        tableWidth: table.width,
        tableHeight: table.height
      });

      const upPaddle = new Paddle(context, {
        x: xupPaddle,
        y: yupPaddle,
        gap: wallGap,
        speed: 5,
        color: "#fff",
        width: paddleWidth,
        height: paddleHeight,
        tableWidth: table.width,
        tableHeight: table.height
      });

      const resetAll = function () {
        ball.reset();
        downPaddle.reset(xdownPaddle, ydownPaddle);
        upPaddle.reset(xupPaddle, yupPaddle);
      };

      let lastTime: number;
      function update(time: number) {
        if (lastTime) {
          const delta = time - lastTime;
          const data = {
            xDown: downPaddle.x,
            yDown: downPaddle.y,
            xUp: upPaddle.x,
            yUp: upPaddle.y,
            width: paddleWidth,
            height: paddleHeight,
          };
          if (ball.checkLoss(data))
            resetAll();
          ball.updateBall(delta, data);
          downPaddle.updatePaddle();
          upPaddle.updateBotPaddle(ball.x);
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
      //document.addEventListener('visibilitychange', function() {
      //  if (document.hidden) {
      //    chk = false;
      //    window.requestAnimationFrame(update);
      //    console.log('bey');
      //  } else {
      //    chk = true;
      //    resetAll();
      //    window.requestAnimationFrame(update);
      //    console.log('hey');
      //  }
      //});

    }
    window.addEventListener('resize', handlresize);
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
          className={`ml-[10px] text-[20px] md:text-[30px] lg:text-[38px] xl:text-[44px] 2xl:text-[60px] ${NeuePlakFontBold.className} `}
        >
          Game
        </div>
        <div className="flex flex-col items-center w-full h-full">
          <div>Bot</div>
          <div
            className="relative w-[200px] h-[400px] sm:w-[300px] sm:h-[500px] md:w-[400px] md:h-[600px] lg:w-[500px] lg:h-[700px] xl:w-[600px] xl:h-[800px] 2xl:w-[700px] 2xl:h-[900px] bg-[#E95A3A] rounded-[8px] md:rounded-[12px] lg:rounded-[18px] xl:rounded-[25px] 2xl:rounded-[28px]"
            style={{
              background:
                "linear-gradient( to bottom, #E95A3A 0%,#E95A3A 50%, #F07559 50%, #F07559 100%);",
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
            <canvas
              className="w-full h-full absolute top-0 z-10"
              ref={canvasRef}
              id="table"
            ></canvas>
          </div>
        </div>
      </div>
    </main>
  );
}
