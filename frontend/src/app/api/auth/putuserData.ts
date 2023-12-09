import { UserType } from "@/app/types/goodloginType";
import { loginStatus } from "@/app/utils/library/authEnum";

export default async function PutUserData(userData: {
  full_name: string;
  nickname: string;
}) {
  //console.log(JSON.stringify(userData));
  try {
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
    await console.log("ana: ", response.status);
    if (!response.ok) {
      if (response.status === 403) {
        await console.log('err = ', response.status);
        return await response.json();
      }
    }
    //return await response.status;
    return response.json();
  } catch(err) {
    console.log('dd ', err);
  }
}
