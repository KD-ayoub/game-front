export default async function PutEmpty() {
    const response = await fetch("http://localhost:3001/settings/update_image", {
        method: 'PUT',
        body: JSON.stringify({}),
        credentials: 'include',
    })
    if (!response.ok) {
        console.log("error in putEmpty");
    }
    return await response.json();
}