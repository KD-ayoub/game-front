export default async function PutImage(formData: FormData) {
    const response = await fetch("http://localhost:3001/settings/update_image", {
        method: 'PUT',
        headers: {
            'Content-Type': 'multipart/form-data',
        },
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