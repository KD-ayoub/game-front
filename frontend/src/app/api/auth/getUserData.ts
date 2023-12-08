export default async function getUserData() {
    const response = await fetch('http://localhost:3001/auth/goodlogin', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
    })
    if (!response.ok) {
        console.log("Error fetching userData data in goodlogin");
    }
    return await response.json();
}