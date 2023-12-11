
export default async function CheckUserStatus(cookie: string) {
    const response = await fetch('http://localhost:3001/auth/checkUserStatus', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Cookie': `connect.sid=${cookie}`,
        },
        credentials: 'include',
        mode: 'cors',
    })
    return await response;
}