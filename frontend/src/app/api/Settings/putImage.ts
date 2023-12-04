export default async function PutImage(formData: FormData) {
    console.log("file sent", formData);
    const response = await fetch("http://localhost:3001/settings/update_image", {
        method: 'PUT',
        body: formData,
        credentials: 'include',
    })
    if (!response.ok) {
        console.log("Error ,response of put image ");
    } else {
        console.log("success put image");
    }
    return await response.json();
}