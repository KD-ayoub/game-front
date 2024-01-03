import "../../(pages)/chat/chat.css";
// import { io } from "socket.io-client";
import { useEffect, useState, useRef, use } from "react";
import { friendSelected } from "@/app/utils/library/friendsSelected";
import fakeAvatar from "@/app/assets/svg/chat/fakeAvatar.svg";
import "remixicon/fonts/remixicon.css";
import pointsOption from "@/app/assets/svg/chat/pointsOption.svg";
import { text } from "stream/consumers";
import submitBtn from "@/app/assets/svg/chat/submitBtn.svg";
import { GetChatConverssationType } from "@/app/types/getChatConverssation";
import { FriendsChatType } from "@/app/types/friendsChatType";
import Image from "next/image";
import ioClient from "../../api/instance";
import moment from "moment";
import tilijo from "../../assets/svg/chat/tilijo.svg";

// const socket = io("");

export default function FriendConversation({
  friendSelected,
}: {
  friendSelected: FriendsChatType;
}) {
  // const { friendSelected } = friend;
  const [dataConversation, setDataConversation] = useState<
    GetChatConverssationType[]
  >([]);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleTextareaChange = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      const newHeight = `${textareaRef.current.scrollHeight}px`;
      textareaRef.current.style.height = newHeight;
    }
  };

  const handleClickBtnBack = () => {
    // showConv = false;
  };

  // handle send message
  const handleSendMessage = () => {
    fetch(`http://localhost:3001/chat/ansiftLkMsg`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ messageSent: textareaRef.current!.value }),
    });
    textareaRef.current!.value = "";
  };

  // Here we fetch the conversation with friend:
  useEffect(() => {
    async function handlShowFriendConversation() {
      if (!friendSelected) {
        return;
      }
      const response = await fetch(
        `http://localhost:3001/chat/history/${friendSelected.id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      if (!response.ok) {
        console.log("error at handleShowFriendConversssation fetch");
      }
      setDataConversation(await response.json());
    }
    handlShowFriendConversation();
  }, [friendSelected]);

  console.log("dataConversation-->", dataConversation);
  console.log("friendSelected-->", friendSelected);

  return (
    <>
      {friendSelected && (
        // friendSelected.isBlocked === false && (
        <div className="friendConv">
          <div className="barInfo">
            <button className="btn-back">
              <i className="ri-arrow-left-line"></i>
            </button>
            <div className="UserInfo">
              <Image
                src={
                  friendSelected.photo === "defautl_img"
                    ? fakeAvatar.src
                    : friendSelected.photo
                }
                alt=""
                className="pictureUser"
                width={50}
                height={50}
              />
              <div className="UserStatus">
                <span className="nameUser">
                  {friendSelected && friendSelected.nickname}
                </span>
                {/* here we gonna do a condition if the user is online or ingame or offline */}
                <span className="statusUser text-teal-400">Online</span>
              </div>
            </div>
            {/* setting optionss in bar info */}
            <div className="optionUserDiv">
              <button onClick={handleClickBtnBack}>
                <Image
                  src={pointsOption.src}
                  alt="."
                  width={5}
                  height={5}
                  className="btn-option"
                />
                <select
                  name="optionsChatUser"
                  id="optionsChatUser"
                  className="optionsUserSelect"
                >
                  <option value="profile">Profile</option>
                  <option value="block" >Block</option>
                  <option value="Challenge">Challenge</option>
                </select>
              </button>
            </div>
            {/* end of setting options in bar info */}
          </div>

          <div className="historyChat">
            {dataConversation.length > 0 &&
              dataConversation.map((message, index) => (
                <div className="message" key={index}>
                  <div className="message-content">
                    {message.mine === true ? (
                      <div className="send-msg">
                        <div className="message-details ">
                          <span className="infoTime">
                            {moment(message.sended_at).calendar()}
                          </span>
                          <span className="infoName pl-4">You</span>
                        </div>
                        <div className="message-text-sender">
                          {message.content}
                        </div>
                      </div>
                    ) : (
                      <div className="recieve-msg">
                        <div className="message-details ">
                          <span className="infoName pr-4">{message.name}</span>
                          <span className="infoTime">
                            {moment(message.sended_at).calendar()}
                          </span>
                        </div>
                        <div className="message-text-recieve">
                          {message.content}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
          </div>
          <div className="sendYourMsg">
            <div className="textAreaDiv">
              <textarea
                className="textArea"
                placeholder="Type here..."
                required
                ref={textareaRef}
                onKeyUp={handleTextareaChange}
                maxLength={300}
              ></textarea>
            </div>
            <button
              type="button"
              className=" submitMsg"
              onClick={handleSendMessage}
            >
              <Image
                src={submitBtn.src}
                alt="submit"
                className="submitBtn"
                width={60}
                height={60}
              />
            </button>
          </div>
        </div>
      )}
      {!friendSelected && (
        <div className="noConversation">
          <p className="MessageDisplay" > Welcome to the chat with friends</p>
        </div>
      )}
    </>
  );
}
