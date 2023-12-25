import "../../(pages)/chat/chat.css";
// import { io } from "socket.io-client";
import { useEffect, useState, useRef } from "react";
import { friendSelected } from "@/app/utils/library/friendsSelected";
import fakeAvatar from "@/app/assets/svg/chat/fakeAvatar.svg";
import "remixicon/fonts/remixicon.css";
import pointsOption from "@/app/assets/svg/chat/pointsOption.svg";
import { text } from "stream/consumers";
import submitBtn from "@/app/assets/svg/chat/submitBtn.svg";
// const socket = io("");

interface FriendConversationProps {
  showConv: boolean;
  friend: {
    name: string;
    picture: string;
    isOnline: boolean;
  };
}

const FriendConversation: React.FC<FriendConversationProps> = ({
  showConv,
}) => {
  // const { friendSelected } = friend;
  const [messages, setMessages] = useState([
    { fromMe: true, text: "Have a great day!", time: "12:30", name: "Aissa" },
    { fromMe: false, text: "Thanks!", time: "12:31", name: "Younesss" },
    {
      fromMe: true,
      text: "ghadi nji l3andek w ghadi nsla5 7abbak ghi sbaar !! wa5a 3la slamtek malkas dasndlaksndaskd laskdlasndlkansl dnl ghadi nji l3andek w ghadi nsla5 7abbak ghi sbaar !! wa5a 3la slamtek malkas dasndlaksndaskd laskdlasndlkansl dnlghadi nji l3andek w ghadi nsla5 7abbak ghi sbaar !! wa5a 3la slamtek malkas dasndlaksndaskd laskdlasndlkansl dnlghadi nji l3andek w ghadi nsla5 7abbak ghi sbaar !! wa5a 3la slamtek malkas dasndlaksndaskd laskdlasndlkansl dnlghadi nji l3andek w ghadi nsla5 7abbak ghi sbaar !! wa5a 3la slamtek malkas dasndlaksndaskd laskdlasndlkansl dnlghadi nji l3andek w ghadi nsla5 7abbak ghi sbaar !! wa5a 3la slamtek malkas dasndlaksndaskd laskdlasndlkansl dnlghadi nji l3andek w ghadi nsla5 7abbak ghi sbaar !! wa5a 3la slamtek malkas dasndlaksndaskd laskdlasndlkansl dnlghadi nji l3andek w ghadi nsla5 7abbak ghi sbaar !! wa5a 3la slamtek malkas dasndlaksndaskd laskdlasndlkansl dnlghadi nji l3andek w ghadi nsla5 7abbak ghi sbaar !! wa5a 3la slamtek malkas dasndlaksndaskd laskdlasndlkansl dnlghadi nji l3andek w ghadi nsla5 7abbak ghi sbaar !! wa5a 3la slamtek malkas dasndlaksndaskd laskdlasndlkansl dnl",
      time: "12:32",
      name: "Aissa",
    },
    {
      fromMe: false,
      text: "Bye! ghadi nji l3andek w ghadi nsla5 7abbak ghi sbaar !! wa5a 3la slamtek malkas dasndlaksndaskd laskdlasndlkansl dnlghadi nji l3andek w ghadi nsla5 7abbak ghi sbaar !! wa5a 3la slamtek malkas dasndlaksndaskd laskdlasndlkansl dnlghadi nji l3andek w ghadi nsla5 7abbak ghi sbaar !! wa5a 3la slamtek malkas dasndlaksndaskd laskdlasndlkansl dnlghadi nji l3andek w ghadi nsla5 7abbak ghi sbaar !! wa5a 3la slamtek malkas dasndlaksndaskd laskdlasndlkansl dnlghadi nji l3andek w ghadi nsla5 7abbak ghi sbaar !! wa5a 3la slamtek malkas dasndlaksndaskd laskdlasndlkansl dnlghadi nji l3andek w ghadi nsla5 7abbak ghi sbaar !! wa5a 3la slamtek malkas dasndlaksndaskd laskdlasndlkansl dnlghadi nji l3andek w ghadi nsla5 7abbak ghi sbaar !! wa5a 3la slamtek malkas dasndlaksndaskd laskdlasndlkansl dnlghadi nji l3andek w ghadi nsla5 7abbak ghi sbaar !! wa5a 3la slamtek malkas dasndlaksndaskd laskdlasndlkansl dnlghadi nji l3andek w ghadi nsla5 7abbak ghi sbaar !! wa5a 3la slamtek malkas dasndlaksndaskd laskdlasndlkansl dnlghadi nji l3andek w ghadi nsla5 7abbak ghi sbaar !! wa5a 3la slamtek malkas dasndlaksndaskd laskdlasndlkansl dnlghadi nji l3andek w ghadi nsla5 7abbak ghi sbaar !! wa5a 3la slamtek malkas dasndlaksndaskd laskdlasndlkansl dnlghadi nji l3andek w ghadi nsla5 7abbak ghi sbaar !! wa5a 3la slamtek malkas dasndlaksndaskd laskdlasndlkansl dnlghadi nji l3andek w ghadi nsla5 7abbak ghi sbaar !! wa5a 3la slamtek malkas dasndlaksndaskd laskdlasndlkansl dnlghadi nji l3andek w ghadi nsla5 7abbak ghi sbaar !! wa5a 3la slamtek malkas dasndlaksndaskd laskdlasndlkansl dnlghadi nji l3andek w ghadi nsla5 7abbak ghi sbaar !! wa5a 3la slamtek malkas dasndlaksndaskd laskdlasndlkansl dnl",
      time: "12:33",
      name: "Youness",
    },
    { fromMe: true, text: "Weesh my brother!!", time: "19:30", name: "Aissa" },
    {
      fromMe: false,
      text: "ghadi nji l3andek w ghadi nsla5 7abbak ghi sbaar !! wa5a 3la slamtek malkas dasndlaksndaskd laskdlasndlkansl dnl",
      time: "19:31",
      name: "Youness",
    },
  ]);

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleTextareaChange = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      const newHeight = `${textareaRef.current.scrollHeight}px`;
      textareaRef.current.style.height = newHeight;
    }
  };
  

  const handleClickBtnBack = () => {
    showConv = false;
  };

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
        {messages.map((message, index) => (
          <div className="message" key={index}>
            <div className="message-content">
              {message.fromMe === true ? (
                <div className="send-msg">
                  <div className="message-details ">
                    <span className="infoTime">{message.time}</span>
                    <span className="infoName pl-4">You</span>
                  </div>
                  <div className="message-text-sender">{message.text}</div>
                </div>
              ) : (
                <div className="recieve-msg">
                  <div className="message-details ">
                    <span className="infoName pr-4">{message.name}</span>
                    <span className="infoTime">{message.time}</span>
                  </div>
                  <div className="message-text-recieve">{message.text}</div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="sendYourMsg">
        <div>
          <textarea
            className="textArea"
            placeholder="Type here..."
            required
            ref={textareaRef}
            onKeyUp={handleTextareaChange}
          ></textarea>
        </div>
        <button
          type="button"
          className=" submitMsg"
        >
          <img src={submitBtn.src} alt="submit" className="submitBtn" />
        </button>
      </div>
    </div>
  );
};

export default FriendConversation;
