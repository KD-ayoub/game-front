import { UserType } from "@/app/types/goodloginType";

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
  if (!response.ok) {
    if (response.status === 403)
      await console.log('err = ', response.status);
  }
  //.then(res => {
  //  console.log('wayli');
  //  //if (res.redirected)
  //  //  window.location.href = res.url;
  //  //else
  //  if (res.status === 403 /*here check the msg*/) {
  //    console.log(res.body);
  //    //logic of redirect to login 
  //  }
  //  return res.json();
  //})
  //.then(data => console.log('hey ', data.message))
  //.catch(err => console.log('Error: ', err));
  //.then(res => res.json())
  //await console.log(`ana ${response.ok}`);
  //if (!response.ok) {
  //  console.log("error puting data in goodlogin");
  //}
  return await response.json();
}
