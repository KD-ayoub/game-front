
export default async function getProfileInfo(id: string) {
    const response = await fetch(`http://localhost:3001/profile/${id}/main`, {
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
        console.log("error fetching data in getProfileInfo");
    }
    //await console.log(response);
    const Profileinfo = await response.json();
    console.log('ll');
    await console.log('an ', Profileinfo);
  return Profileinfo;
}
