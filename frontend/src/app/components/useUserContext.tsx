"use client";

import React, { createContext, useState, useContext, ReactNode, useEffect } from "react";

//import socket
import { ioClient, SocketClient } from "@/app/api/instance";
import { type Socket, io } from "socket.io-client";
import { Manager } from "socket.io-client/debug";
import { useRouter } from 'next/navigation';

import Profilepic from "@/app/assets/svg/profile.svg";
import Swal from "sweetalert2";
type userType = {
  id: string;
  full_name: string;
  nickName: string;
};

// export const UserContext = createContext<userType | null>(null);
type UserContextType = {
  userData: userType;
  setUserData: React.Dispatch<React.SetStateAction<userType>>;
  fetcher: () => Promise<void>;
};

export const UserContext = createContext<UserContextType | null>(null);

export default function UserContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [userData, setUserData] = useState<userType>({
    id: "",
    full_name: '',
    nickName: '',
  });

    const router = useRouter();
  async function fetcher() {
    const response = await fetch('http://localhost:3001/auth/getUserStatus', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    })
    if (!response.ok) {
      console.log("response error in context");
      return;
    }
    setUserData(await response.json());
  }

  //take off
  useEffect(() => {
    console.log('************* profile');
    ioClient;
    const SocketClient = ioClient.getSocketClient();
    SocketClient.on("inviteThePlayer", (data: {playerNickname: string, playerId: string, opponentId: string}) => {
      console.log('llllllllll');
      Swal.fire({
        title: `${data.playerNickname} invite you to play with him`,
        text: "",
        imageUrl: `${Profilepic.src}`,
        imageWidth: 400,
        imageHeight: 200,
        imageAlt: "Custom image",
        allowOutsideClick: false,
        showCancelButton: true,
        confirmButtonText: 'this confirm',
        cancelButtonText: 'this cancel',
      })
      .then(res => {
        //console.log('then = ', res);
        if (res.hasOwnProperty('isConfirmed') && res.isConfirmed) {
          SocketClient.emit("joinPlayerGameRoom", data);
          console.log('heee');
          // play game
        }
        else if (res.hasOwnProperty('isConfirmed') && !res.isConfirmed) {
          SocketClient.emit('didNotAcceptInvite');
          //sed socket , mayetra walo
        }
        //router.push('/game')
      });
    });

    SocketClient.on("ana", (data: { room: string }) => {
      ioClient.room = data.room;
      console.log("****** ", ioClient.room);
      let color = "";
      let colorbg = "";
      color = "E95A3A";
      colorbg = "F07559";
      console.log('colooooor', color, colorbg);
      router.push(`/game/user?color=${color}&colorbg=${colorbg}`);
      //window.history.pushState("", "", "/game/user");
      //window.location.href = "/game/user";
    });

    //SocketClient.on('ana', () => {
    //  console.log('cooooool');
    //  router.push('/game/user');
    //  //router.push(`/game/user?color=${color}&colorbg=${colorbg}`);
    //})

    // async function fetcher() {
    //   const response = await fetch('http://localhost:3001/auth/getUserStatus', {
    //     method: 'GET',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     credentials: 'include',
    //   })
    //   if (!response.ok) {
    //     console.log("response error in context");
    //     return;
    //   }
    //   setUserData(await response.json());
    // }
    fetcher();
  }, []);
  console.log("user data", userData);
  return (
    <UserContext.Provider value={{ userData, setUserData, fetcher }}>{children}</UserContext.Provider>
  );
}

export function useUserContext() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("Error in UserContext provider");
  }
  return context;
}
