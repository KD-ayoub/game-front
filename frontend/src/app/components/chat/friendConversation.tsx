import "../../(pages)/chat/chat.css";
// import { io } from "socket.io-client";
import { useEffect, useState } from "react";

// const socket = io("");

export default function FriendConversation() {
  const [messages, setMessages] = useState("hi");
  const [receivedMessages, setReceivedMessages] = useState("");

  
//   const sendMessages = () => {
//     socket.emit("sendMessage", { messages });
//   };

//   useEffect(() => {
//     socket.on("receiveMessage", (data) => {
//         setReceivedMessages(data.message);
//     });
//   }, [socket]);

  return (
    <div className="friendConv ">
      <div className="bg-[#d6934fa4]">
        <input
          placeholder="Message..."
          className="bg-[#15131D] text-[#f8bebeda] w-80 h-7 rounded-md"
          // onChange={(e) => {
          //   setMessages(e.target.value);
          // }}
        />
        {/* <button onClick={sendMessages} className="bg-[#00000080]"> */}
        <button className="rounded-md bg-slate-600 text-white h-7 ">
          --Send
        </button>
      </div>
    </div>
  );
}
