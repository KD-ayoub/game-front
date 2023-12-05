export default async function DeleteImage() {
    const response = await fetch("http://localhost:3001/settings/delete_image", {
        method: 'DELETE',
        credentials: 'include',
    })
    if (!response.ok) {
        console.log("error in putEmpty");
    }
    return await response.json();
}