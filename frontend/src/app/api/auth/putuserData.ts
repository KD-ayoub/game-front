import { UserType } from "@/app/types/goodloginType";
import { loginStatus } from "@/app/utils/library/authEnum";

export default async function PutUserData(userData: {
  full_name: string;
  nickname: string;
}) {
  //console.log(JSON.stringify(userData));
  const response = await fetch("http://localhost:3001/auth/signup", {
    //mode: 'cors',
    //mode: 'no-cors',
    credentials: "include",
    method: "PUT",
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  })
    await console.log("here", response.status);
 
  if (!response.ok) {
    if (response.status === 403) {
      return await response.json();
      await console.log('err = ', response.status);
    }
  }
  return await response.status;
}
