import "../../(pages)/chat/chat.css";
// import { io } from "socket.io-client";
import { useEffect, useState } from "react";
import { friendSelected } from "@/app/utils/library/friendsSelected";
import fakeAvatar from "@/app/assets/svg/chat/fakeAvatar.svg";
import "remixicon/fonts/remixicon.css";
import pointsOption from "@/app/assets/svg/chat/pointsOption.svg";

// const socket = io("");

interface FriendConversationProps {
  showConv: boolean;
  friend: {
    name: string;
    picture: string;
    isOnline: boolean;
  };
}

const FriendConversation: React.FC<FriendConversationProps> = ({ showConv }) => {
  // const { friendSelected } = friend;
  const [messages, setMessages] = useState([
    {fromMe: true, text:"Have a great day!", time:"12:30:"},
    {fromMe: false, text:"Thanks!", time:"12:31:"},
    {fromMe: true, text:"See you later!", time:"12:32:"},
    {fromMe: false, text:"Bye!", time:"12:33:"},
    {fromMe: true, text:"Weesh my brother!!", time:"19:30:"},
    {fromMe: false, text:"ghadi nji l3andek w ghadi nsla5 7abbak ghi sbaar !!", time:"19:31:"},

  ]);

  const handleClickBtnBack = () => {
    showConv = false;
  }

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
          <button onClick={handleClickBtnBack}>
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
