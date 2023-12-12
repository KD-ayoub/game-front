
export default async function PutUserData(userData: {
  full_name: string;
  nickname: string;
}) {
  try {
    const response = await fetch("http://localhost:3001/auth/signup", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
      credentials: "include",
    });
    if (!response.ok) {
      if (response.status === 403) {
        await console.log("err 403 here = ", response.status);
        return await response.json();
      } else {
        await console.log("other error her", response.status);
        return response;
      }
    }
    return response;
  } catch (err) {
    console.log("catching error in putuserdata", err);
  }
}
