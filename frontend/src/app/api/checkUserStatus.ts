
export default async function CheckUserStatus() {
    const response = await fetch('http://localhost:3001/auth/checkUserStatus', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
    })
    return await response;
}