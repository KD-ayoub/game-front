import "../../(pages)/chat/chat.css";
// import { io } from "socket.io-client";
import { useEffect, useState } from "react";
import { friendSelected } from "@/app/utils/library/friendsSelected";
import fakeAvatar from "@/app/assets/svg/chat/fakeAvatar.svg";

// const socket = io("");



const FriendConversation = () => {
  return (
    <div className="friendConv">
      {/* <p className="friendConv-username">{username}</p>
      <p className="friendConv-text">{text}</p> */}
      <p>Conversation !</p>
    </div>
  );
};

export default FriendConversation;
