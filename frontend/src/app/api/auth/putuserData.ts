import { UserType } from "@/app/types/goodloginType";

export default async function PutUserData(userData: {
  full_name: string;
  nickName: string;
}) {
  const response = await fetch("http://localhost:3001/auth/signup", {
    method: "PUT",
    body: JSON.stringify(userData),
    credentials: "include",
  });
  if (!response.ok) {
    console.log("error puting data in goodlogin");
  }
}
