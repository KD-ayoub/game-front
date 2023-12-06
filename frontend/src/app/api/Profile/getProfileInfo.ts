
export default async function getProfileInfo() {
    const response = await fetch('http://localhost:3001/profile/9acbcd9e-6ad4-491b-a501-d1d1ca7cc652/main', {
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
