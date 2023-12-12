import "../../(pages)/chat/chat.css";
import { io } from "socket.io-client";
import { useEffect, useState } from "react";

const socket = io("");

export default function FriendConversation() {
  const [messages, setMessages] = useState("");
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
    <div className="friendConv flex justify-center items-center">
      <div className="bg-[#f0861c11]">
        <input
          placeholder="Message..."
          onChange={(e) => {
            setMessages(e.target.value);
          }}
        />
        {/* <button onClick={sendMessages} className="bg-[#00000080]"> */}
        <button className="bg-[#00000080]">
          --Send
        </button>
      </div>
    </div>
  );
}
