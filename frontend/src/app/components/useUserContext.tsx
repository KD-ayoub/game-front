"use client";

import React, { createContext, useState, useContext, ReactNode, useEffect } from "react";

type userType = {
  id: string;
  full_name: string;
  nickName: string;
};

export const UserContext = createContext<userType | null>(null);

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
  useEffect(() => {
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
    fetcher();
  }, [])
  console.log("user data", userData);
  return (
    <UserContext.Provider value={userData}>{children}</UserContext.Provider>
  );
}

export function useUserContext() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("Error in UserContext provider");
  }
  return context;
}
