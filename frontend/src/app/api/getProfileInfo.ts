import 'cross-fetch/polyfill';
export default async function getProfileInfo() {
    const response = await fetch('http://localhost:3001/profile/cc23cdbd-3319-48c2-8e2b-9923c495cad3/main', {
        method: 'GET',
        //mode: 'cors',
        headers: {
            //'Host':'http://localhost:3001',
            'Content-Type': 'application/json',
            //'Access-Control-Allow-Origin': '*',
            'Cookie': 'connect.sid=s%3AGUhDS0XPoC0Cuaifki23z4YlQkDauunV.YAXPFSu90OJK243fsZUIO5inhiBIC%2BLFO5b4c684jU8'
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
