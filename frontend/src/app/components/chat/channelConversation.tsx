import "../../(pages)/chat/chat.css";
// import { io } from "socket.io-client";
import { useEffect, useState, useRef, use } from "react";
import fakeAvatar from "@/app/assets/svg/chat/fakeAvatar.svg";
import "remixicon/fonts/remixicon.css";
import pointsOption from "@/app/assets/svg/chat/pointsOption.svg";
import { text } from "stream/consumers";
import submitBtn from "@/app/assets/svg/chat/submitBtn.svg";
import { GetChatConverssationType } from "@/app/types/getChatConverssation";
import { ChannelChatType } from "@/app/types/ChannelChatType";
import Image from "next/image";
import ioClient from "../../api/instance";
import moment from "moment";
import tilijo from "../../assets/svg/chat/tilijo.svg";
import { DataChannelConversationType } from "@/app/types/dataChannelConversationType";
import lwaghch from "../../assets/svg/chat/lwaghch.svg";
// const socket = io("");

export default function ChannelConversation({}: //   channelSelected,
{
  //   channelSelected: ChannelChatType;
}) {
  // const { channelSelected } = friend;
  const [dataConversation, setDataConversation] = useState<
    DataChannelConversationType[]
  >([
    {
      content: "hello",
      sended_at: "2021-09-01T15:00:00.000Z",
      mine: true,
      name: "Aissa",
    },
    {
      content:
        "nalssndlkanslkdnasl alsdlks ndalksndksnda sdd asshdbajshbdajhsbdaj",
      sended_at: "2021-09-01T15:00:00.000Z",
      mine: false,
      name: "Youness",
    },
    {
      content:
        "hellasd asd asldnlak snldakns laksnlndasdiahsdiuhiuqwbiubwieubiwuefwiue w f wefeo",
      sended_at: "2021-09-01T15:00:00.000Z",
      mine: false,
      name: "Akadi",
    },
    {
      content: "hels dfksdlf jsdlfsdlf sldf sldknldkn flkd fsldlfskndflsklo",
      sended_at: "2021-09-01T15:00:00.000Z",
      mine: false,
      name: "tibari",
    },
    {
      content: "hellasdsdso",
      sended_at: "2021-09-01T15:00:00.000Z",
      mine: true,
      name: "Aissa",
    },
    {
      content: "helasdasdsasdasdasdasdasdaslansdlkanslkdnalskdnnslkdnlaksndlkansdlkansdlknaslkdnalksndlkasndlka sndlkansdlknaslkdnalskndlaksdnlkasndlkasndlkasndlkansldknasldknaslkdnldalo",
      sended_at: "2021-09-01T15:00:00.000Z",
      mine: false,
      name: "Mimooo",
    },
    {
      content: "helasdddasdasdasdaslo",
      sended_at: "2021-09-01T15:00:00.000Z",
      mine: false,
      name: "Mimoo",
    },
    {
      content: "helasdddasdasdasdaslo",
      sended_at: "2021-09-01T15:00:00.000Z",
      mine: false,
      name: "Mimoo",
    },
    {
      content: "helasdddasdasdasdaslo",
      sended_at: "2021-09-01T15:00:00.000Z",
      mine: false,
      name: "Mimoo",
    },
    {
      content: "helasdddasdasdasdaslo",
      sended_at: "2021-09-01T15:00:00.000Z",
      mine: false,
      name: "Mimoo",
    },
    {
      content: "helasdddasdasdasdaslo",
      sended_at: "2021-09-01T15:00:00.000Z",
      mine: false,
      name: "Mimoo",
    },
  ]);

  const [channelSelected, setChannelSelected] = useState<ChannelChatType>({
    nameOfChannel: "Mimoo",
    id: "10",
    photo: lwaghch.src,
    isBlocked: false,
  });
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

  // Here we fetch the channel conversation :
  //   useEffect(() => {
  //     async function handlShowFriendConversation() {
  //       if (!channelSelected) {
  //         return;
  //       }
  //       const response = await fetch(
  //         `http://localhost:3001/chat/history/${channelSelected.id}`,
  //         {
  //           method: "GET",
  //           headers: {
  //             "Content-Type": "application/json",
  //           },
  //           credentials: "include",
  //         }
  //       );
  //       if (!response.ok) {
  //         console.log("error at handleShowFriendConversssation fetch");
  //       }
  //       setDataConversation(await response.json());
  //     }
  //     handlShowFriendConversation();
  //   }, [channelSelected]);

  console.log("dataConversation-->", dataConversation);
  console.log("channelSelected-->", channelSelected);

  return (
    <>
      {channelSelected && (
        // channelSelected.isBlocked === false && (
        <>
          <div className="channelConv">
            <div className="barInfo">
              <button className="btn-back">
                <i className="ri-arrow-left-line"></i>
              </button>
              <div className="UserInfo">
                <Image
                  src={
                    channelSelected.photo === "defautl_img"
                      ? fakeAvatar.src
                      : channelSelected.photo
                  }
                  alt=""
                  className="pictureUser"
                  width={50}
                  height={50}
                />
                <div className="UserStatus">
                  <span className="nameUser">
                    {channelSelected && channelSelected.nameOfChannel}
                  </span>
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
                    <option value="block">Block</option>
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
                            <span className="infoName pr-4">
                              {message.name}
                            </span>
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
          <div className="infoChannel">
            <div className="topSideOfChannel">
              <h2>Channel</h2>
              <Image
                src={lwaghch.src}
                alt="Channel overview"
                className="channelOverview"
                width={140}
                height={140}
              />
              <p className="channelName">{channelSelected.nameOfChannel}</p>
              {/* hna 5asni n3ref wessh ana admin wla owner bach n affichi select options wla bach n affichi ghi p "channel private or public or protected" */}
              <p className="channelType">Channel private</p>
            </div>
            <div className="infoMembersOfChannel">
              <p className="channelOwner">Owner</p>
              <div className="membersOfChannel">
                {/* should i fix it with the picture of owner */}
                <Image
                  src={fakeAvatar.src}
                  alt="memberPhoto"
                  className="imageMember"
                  width={30}
                  height={30}
                />
                <p className="memberName">Mouha</p>
              </div>
            </div>
            <div className="infoMembersOfChannel">
              <p className="channelOwner">Admin</p>
              <div className="listMembersOfChannel">
                {/* should i fix it with the picture of owner */}
                <div className="boxMember">
                  <Image
                    src={fakeAvatar.src}
                    alt="memberPhoto"
                    className="imageMember"
                    width={30}
                    height={30}
                  />
                  <p className="memberName">Ayoub</p>
                </div>
              </div>
            </div>
            <div className="infoMembersOfChannel">
              <p className="channelOwner">Members</p>
              <div className="listMembersOfChannel">
                {/* should i fix it with the picture of owner */}
                <div className="boxMember">
                  <Image
                    src={fakeAvatar.src}
                    alt="memberPhoto"
                    className="imageMember"
                    width={30}
                    height={30}
                  />
                  <p className="memberName">Aissa</p>
                </div>
                <div className="boxMember">
                  <Image
                    src={fakeAvatar.src}
                    alt="memberPhoto"
                    className="imageMember"
                    width={30}
                    height={30}
                  />
                  <p className="memberName">Younes</p>
                </div>
                <div className="boxMember">
                  <Image
                    src={fakeAvatar.src}
                    alt="memberPhoto"
                    className="imageMember"
                    width={30}
                    height={30}
                  />
                  <p className="memberName">hicham</p>
                </div>
                
              </div>
            </div>
          </div>
        </>
      )}
      {/* {!channelSelected && (
        <div className="noConversation">
          <p className="MessageDisplay" > Welcome to the chat with channels</p>
        </div>
      )} */}
    </>
  );
}
