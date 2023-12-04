
export default async function getStatusGame() {
    const response = await fetch('http://localhost:3001/profile/0f78e2d1-2837-4c26-b831-0c0fa5224ab3/status_game', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })
    if (!response.ok) {
        console.log("Error fetching statusGame data");
    }
    return await response.json();
}