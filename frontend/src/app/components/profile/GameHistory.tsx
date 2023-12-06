import React from "react";
import { NeuePlakFont, NeuePlakFontBold } from "@/app/utils/NeuePlakFont";
import ProfileImg from "@/app/assets/svg/profileimg.svg";
import Image from "next/image";
import { GamesHistoryType } from "@/app/types/gameshistorytype";
import moment from "moment";

export default function GameHistory({
  Isloaded,
  dataGamesHistory,
}: {
  Isloaded: boolean;
  dataGamesHistory: GamesHistoryType[];
}) {
  return (
    <div className="m-3 mt-2 md:ml-5 lg:ml-10 2xl:ml-16 lg:mr-[60px] lg:basis-1/2">
      <div
        className={`${NeuePlakFontBold.className} md:text-[18px] lg:text-[24px] xl:text-[28px] 2xl:text-[45px]`}
      >
        Game History
      </div>
      <div className="w-auto h-[280px] lg:h-[350px] xl:h-[500px] 2xl:h-[800px] bg-gradient-to-b from-[#110D1F] via-[#110D1F] to-[#2d2a38] rounded-[25px] pl-1 ">
        {Isloaded && (
          <div className="w-full h-9 flex justify-between border-b-[1px] animate-pulse">
            <div className="w-10 sm:w-20 md:w-28 h-full bg-[#302B43] rounded-[10px]"></div>
            <div className="w-10 sm:w-20 md:w-28 h-full bg-[#302B43] rounded-[10px]"></div>
            <div className="w-10 sm:w-20 md:w-28 h-full bg-[#302B43] rounded-[10px]"></div>
            <div className="w-10 sm:w-20 md:w-28 h-full bg-[#302B43] rounded-[10px]"></div>
          </div>
        )}
        {!Isloaded && (
          <div className="overflow-x-auto overflow-y-auto max-h-[280px] lg:max-h-[350px] xl:max-h-[500px] 2xl:max-h-[800px]">
            <table className="w-full">
              <thead className="border-b-[1px]">
                <tr>
                  <th
                    className={`${NeuePlakFont.className} text-[14px] md:text-[16px] lg:text-[20px] xl:text-[24px] 2xl:text-[35px] pl-3 `}
                  >
                    Player
                  </th>
                  <th
                    className={`${NeuePlakFont.className} text-[14px] md:text-[16px] lg:text-[20px] xl:text-[24px] 2xl:text-[35px] pl-5`}
                  >
                    Result
                  </th>
                  <th
                    className={`${NeuePlakFont.className} text-[14px] md:text-[16px] lg:text-[20px] xl:text-[24px] 2xl:text-[35px] pl-5`}
                  >
                    Level xp
                  </th>
                  <th
                    className={`${NeuePlakFont.className} text-[14px] md:text-[16px] lg:text-[20px] xl:text-[24px] 2xl:text-[35px] pl-5`}
                  >
                    Time
                  </th>
                </tr>
              </thead>
              <tbody>
                {dataGamesHistory.map((data) => {
                  const Isimage = data.opponent_data.photo_path === 'defautl_img' ? `${ProfileImg.src}` : data.opponent_data.photo_path;
                  const result = data.result ? "Win" : "Loss";
                  const color = data.result ? "text-[#0CFFBB]" : "text-[#EF443B]";
                  const level = data.xp_level < 0 ? `${data.xp_level}xp` : `+${data.xp_level}xp`;
                  const date = moment(data.date);
                  return (
                    <tr key={data.id} className="text-center even:bg-[#0C0914] ">
                      <td
                        className={`flex ${NeuePlakFont.className} text-[14px] sm:text-[18px] lg:text-[22px] xl:text-[24px] 2xl:text-[35px] p-2 xl:p-3 2xl:p-5 gap-1 md:gap-5 items-center`}
                      >
                        <Image
                          className="sm:w-[20px] sm:h-[20px] md:w-[30px] md:h-[30px] lg:w-[36px] lg:h-[36px] xl:w-10 xl:h-10 2xl:w-14 2xl:h-14"
                          src={Isimage}
                          width={15}
                          height={15}
                          alt="img of a user"
                        />
                        {data.opponent_data.nickName}
                      </td>
                      <td
                        className={`${NeuePlakFont.className} text-[9px] sm:text-[11px] md:text-[14px] lg:text-[18px] xl:text-[22px] 2xl:text-[30px] pl-5 ${color}`}
                      >
                        {result}
                      </td>
                      <td
                        className={`${NeuePlakFont.className} text-[9px] sm:text-[11px] md:text-[14px] lg:text-[18px] xl:text-[22px] 2xl:text-[30px] pl-5 ${color}`}
                      >
                        {level}
                      </td>
                      <td
                        className={`${NeuePlakFont.className} text-[9px] sm:text-[11px] md:text-[14px] lg:text-[18px] xl:text-[22px] 2xl:text-[30px] pl-5 text-[#717273]`}
                      >
                        {date.fromNow()}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
        {/* <div>
          <p>No games available</p>
        </div> */}
      </div>
    </div>
  );
}
