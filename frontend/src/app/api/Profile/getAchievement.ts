export default async function getAchievement(id:string) {
    const response = await fetch(`http://localhost:3001/profile/${id}/achievement`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })
    return await response.json();
}