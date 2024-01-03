"use client";

import React, { createContext, useState, useContext, ReactNode, useEffect } from "react";

//import socket
import { ioClient, SocketClient } from "@/app/api/instance";
import { type Socket, io } from "socket.io-client";
import { Manager } from "socket.io-client/debug";

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

  useEffect(() => {
    console.log('************* profile');
    ioClient;
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
  }, [])
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
