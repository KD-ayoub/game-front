
export default async function getProfileInfo() {
    const response = await fetch('http://localhost:3001/profile/0f78e2d1-2837-4c26-b831-0c0fa5224ab3/main', {
        method: 'GET',
        //mode: 'cors',
        headers: {
            //'Host':'http://localhost:3001',
            'Content-Type': 'application/json',
            //'Access-Control-Allow-Origin': '*',
        },
        credentials: 'include'
    })
    // const response = await fetch('./fakejson/mainprofile.json')
    if (!response.ok) {
        console.log("error fetching data");
    }
    //await console.log(response);
    const Profileinfo = await response.json();
    console.log('ll');
    await console.log('an ', Profileinfo);
  return Profileinfo;
}
