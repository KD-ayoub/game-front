export default async function getFriends() {
    const response = await fetch('http://localhost:3001/profile/9acbcd9e-6ad4-491b-a501-d1d1ca7cc652/friends', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })
    return await response.json();
}