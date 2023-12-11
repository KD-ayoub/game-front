
export default async function CheckUserStatus(cookie: string) {
    try {
        const response = await fetch('http://localhost:3001/auth/checkUserStatus', {
            method: 'GET',
            headers: {
                'Cookie': `connect.sid=${cookie}`,
            },
            //credentials: 'include',
            //mode: 'cors',
        })
        return response;
    } catch(err) {
        console.log('hey = ', err);
        throw err;
    }
}
