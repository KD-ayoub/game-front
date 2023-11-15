
export default async function getData() {
    try {
        const response = await fetch("./fakejson/notification.json");
        const mydata = response.json();
        // console.log("resss ",mydata);
        return mydata;
    } catch(error) {
        console.error("the error is",error);
    }
}