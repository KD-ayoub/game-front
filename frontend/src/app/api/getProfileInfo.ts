
export default async function getProfileInfo() {
    const response = await fetch('http:/localhost:3001/profile/c9a8990f-079a-4da8-8f7a-87ccd9cbfbfa/main', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Cookie': 'connect.sid=s%3AX4zMDA5FS0BkTBlHWnNU62c8-Bi48ss0.KARCaUoWzh2VZnjoO86wKbvGL4eRsLuj7KyQIvkFsKQ'
        }
    })
    // const response = await fetch('./fakejson/mainprofile.json')
    if (!response.ok) {
        console.log("error fetching data");
    }
    const Profileinfo = await response.json();
  return Profileinfo;
}
