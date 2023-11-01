
export default async function getData() {
    try {
        const response = await fetch("./notification.json");
        const mydata = response.json();
        console.log("resss ",response);
        return mydata;
    } catch(error) {
        console.error("the error is",error);
    }
}