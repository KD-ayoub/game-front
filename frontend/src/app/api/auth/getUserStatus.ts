export default async function getUserStatus() {
    const response = await fetch('http://localhost:3001/auth/getUserStatus', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      })
      if (!response.ok) {
        console.log("response error in context");
        return response.json();
      }
      return await response.json();
}