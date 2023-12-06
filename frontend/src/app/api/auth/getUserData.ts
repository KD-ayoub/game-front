export default async function getUserData() {
    const response = await fetch('http://localhost:3001/auth/status', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })
    if (!response.ok) {
        console.log("Error fetching userData data");
    }
    return await response.json();
}