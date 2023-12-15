export default async function DeleteImage() {
    const response = await fetch('http://localhost:3001/settings/delete_image', {
        method: 'DELETE',
        credentials: 'include',
    })
    if (!response.ok) {
        console.log('Error in deleting image (settings)');
    }
    console.log('sucess deleting image');
    return response.json();
}