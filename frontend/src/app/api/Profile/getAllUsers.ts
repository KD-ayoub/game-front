export default async function getAllUsers(id: string) {
    const response = await fetch(`http://localhost:3001/profile/${id}/get_all_users`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })
    return await response.json();
}