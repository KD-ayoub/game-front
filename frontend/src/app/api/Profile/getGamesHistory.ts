export default async function getGamesHistory(id: string) {
    const response = await fetch(`http://localhost:3001/profile/${id}/games_history`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })
    return await response.json();
}