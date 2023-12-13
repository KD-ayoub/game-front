"use client";

import {
  Header,
  SideBar,
  ProfileInfo,
  StatusGame,
  Achievements,
  GameHistory,
  Friends,
} from "@/app/components";
import { NeuePlakFont, NeuePlakFontBold } from "../../../utils/NeuePlakFont";
import { useState, useEffect } from "react";
import getProfileInfo from "@/app/api/Profile/getProfileInfo";
import { MainProfileType } from "@/app/types/mainprofiletype";
import { StatusGameType } from "@/app/types/statusGameType";
import { AchievementType } from "@/app/types/achievementtype";
import { FriendsType } from "@/app/types/friendstype";
import { GamesHistoryType } from "@/app/types/gameshistorytype";
import { AllUsersType } from "@/app/types/alluserstype";
import getStatusGame from "@/app/api/Profile/getStatusGame";
import getAchievement from "@/app/api/Profile/getAchievement";
import getFriends from "@/app/api/Profile/getFriends";
import getGamesHistory from "@/app/api/Profile/getGamesHistory";
import { usePathname, useRouter } from "next/navigation";
import getAllUsers from "@/app/api/Profile/getAllUsers";
import { useUserContext } from "@/app/components/useUserContext";

export default function ProfileUser({
  params,
}: {
  params: { nickname: string };
}) {
  const [isHumburgClicked, setisHumburgClicked] = useState(false);
  const marginbody = isHumburgClicked ? "ml-6" : "";
  // check the nickname
  const [dataAllUsers, setdataAllUsers] = useState<Array<AllUsersType>>([]);
  let userid: string = "";

  const [Isloaded, setIsloaded] = useState(true);
  const [dataprofile, setdataProfile] = useState<MainProfileType>({
    id: "",
    full_name: "",
    nickName: "",
    is_active: "",
    last_activity: "",
    photo_path: "",
    friend_number: 0,
    level: 0,
  });
  const [dataStatusGame, setdataStatusGame] = useState<StatusGameType>({
    games: 0,
    win: 0,
    lose: 0,
  });
  const [dataAchievement, setdataAchievement] = useState<AchievementType>({
    id: "",
    user_id: "",
    kickstart: false,
    social: false,
    first_game: false,
    level_1: false,
    level_5: false,
  });
  const [dataFriends, setdataFriends] = useState<Array<FriendsType>>([]);
  const [dataGamesHistory, setdataGamesHistory] = useState<
    Array<GamesHistoryType>
  >([]);
  const context = useUserContext();
  const router = useRouter();
  console.log("context in [nick]", context.id);
  useEffect(() => {
    async function fetchallusers() {
      if (context.id) {
        console.log("entered here", params.nickname);
        if (context.nickName === params.nickname) {
          router.push('/profile');
          return;
        }
        const allusers: AllUsersType[] = await getAllUsers(context.id);
        for (let data = 0; data < allusers.length; data++) {
          if (allusers[data].nickName === params.nickname) {
            console.log("found id of ", params.nickname);
            userid = allusers[data].id;
            console.log(userid);
            setdataProfile(await getProfileInfo(userid));
            setdataStatusGame(await getStatusGame(userid));
            setdataAchievement(await getAchievement(userid));
            setdataFriends(await getFriends(userid));
            setdataGamesHistory(await getGamesHistory(userid));
            setIsloaded(false);
            setdataAllUsers(allusers);
            return;
          }
        }
        // error user does not exist, return to main profile
      }
      setdataAllUsers([]);
    }
    fetchallusers();
  }, [context.id]);
  // useEffect(() => {
  //   async function fetchdata() {
  //     if (dataAllUsers.length !== 0 && userid) {
  //       // pass userid as param
  //       setdataProfile(await getProfileInfo(userid));
  //       setdataStatusGame(await getStatusGame(userid));
  //       setdataAchievement(await getAchievement(userid));
  //       setdataFriends(await getFriends(userid));
  //       setdataGamesHistory(await getGamesHistory(userid));
  //       setIsloaded(false);
  //     }
  //   }
  //   fetchdata();
  // }, [context.id]);
  console.log("full name", dataprofile.full_name);
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
        <div className="w-full h-full">
          <div
            className={`ml-[10px] text-[20px] md:text-[30px] lg:text-[38px] xl:text-[44px] 2xl:text-[60px] ${NeuePlakFontBold.className} `}
          >
            Profile
          </div>
          <div className="md:w-full md:h-full">
            <div className="md:flex md:items-center">
              <ProfileInfo Isloaded={Isloaded} dataprofile={dataprofile} />
              <div className="md:flex md:flex-col md:h-1/2 md:basis-1/2 lg:gap-5">
                <StatusGame
                  Isloaded={Isloaded}
                  dataStatusGame={dataStatusGame}
                />
                <Achievements
                  Isloaded={Isloaded}
                  dataAchievement={dataAchievement}
                />
              </div>
            </div>
            <div className="lg:flex">
              <GameHistory
                Isloaded={Isloaded}
                dataGamesHistory={dataGamesHistory}
              />
              <Friends Isloaded={Isloaded} dataFriends={dataFriends} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
