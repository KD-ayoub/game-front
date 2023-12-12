
export default async function getStatusGame(id: string) {
    const response = await fetch(`http://localhost:3001/profile/${id}/status_game`, {
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