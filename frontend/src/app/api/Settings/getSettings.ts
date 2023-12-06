
export default async function getSettings() {
    const response = await fetch("http://localhost:3001/settings", {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
    })
    if (!response.ok) {
        console.log("error getting settings data");
    }
    return await response.json();
}