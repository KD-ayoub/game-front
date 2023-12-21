import "../../(pages)/chat/chat.css";
// import { io } from "socket.io-client";
import { useEffect, useState } from "react";
import { friendSelected } from "@/app/utils/library/friendsSelected";
import fakeAvatar from "@/app/assets/svg/chat/fakeAvatar.svg";
import "remixicon/fonts/remixicon.css";
import pointsOption from "@/app/assets/svg/chat/pointsOption.svg";

// const socket = io("");

const FriendConversation = (friend: any) => {
  const { friendSelected } = friend;

  return (
    <div className="friendConv">
      <div className="barInfo">
        <button className="btn-back">
          <i className="ri-arrow-left-line"></i>
        </button>
        <div className="UserInfo">
          <img src={fakeAvatar.src} alt="" className="pictureUser" />
          <div className="UserStatus">
            <span className="nameUser">Jaafar</span>
            {/* here we gonna do a condition if the user is online or ingame or offline */}
            <span className="statusUser text-teal-400">Online</span>
          </div>
        </div>
        <div className="optionUser">
          <button>
            <img src={pointsOption.src} alt="." />
            {/* hna 7ta nchuf wesh ghadi n9ad les options wla blach  */}
          </button>
        </div>
      </div>
      <div className="historyChat">
        
      </div>
    </div>
  );
};

export default FriendConversation;
