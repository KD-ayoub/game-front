export default async function getFriends() {
    const response = await fetch('http://localhost:3001/profile/0f78e2d1-2837-4c26-b831-0c0fa5224ab3/friends', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })
    return await response.json();
}