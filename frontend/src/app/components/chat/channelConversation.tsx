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
// import ioClient from "../../api/instance";
import moment from "moment";
import tilijo from "../../assets/svg/chat/tilijo.svg";
import { DataChannelConversationType } from "@/app/types/dataChannelConversationType";
import lwaghch from "../../assets/svg/chat/lwaghch.svg";
import { MemberListChannel, aboutMe } from "../../types/memberListChannel";

// const socket = io("");

export default function ChannelConversation({}: //   channelSelected,
{
  //   channelSelected: ChannelChatType;
}) {
  // const { channelSelected } = friend;
  // information about the channel conversation
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
      content:
        "helasdasdsasdasdasdasdasdaslansdlkanslkdnalskdnnslkdnlaksndlkansdlkansdlknaslkdnalksndlkasndlka sndlkansdlknaslkdnalskndlaksdnlkasndlkasndlkasndlkansldknasldknaslkdnldalo",
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
  // information about the channel selected
  const [channelSelected, setChannelSelected] = useState<ChannelChatType>({
    nameOfChannel: "Mimoo",
    id: "10",
    photo: lwaghch.src,
    isJoined: true,
    type: "private",
  });
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  // information about members of channel
  const [memberList, setMemberList] = useState<MemberListChannel[]>([
    {
      nickname: "Mouha",
      id: "12",
      photo: fakeAvatar.src,
      role: "owner",
    },
    {
      nickname: "said",
      id: "112",
      photo: fakeAvatar.src,
      role: "admin",
    },
    // {
    //   nickname: "abdo",
    //   id: "132",
    //   photo: fakeAvatar.src,
    //   role: "admin",
    // },
    // {
    //   nickname: "nasser",
    //   id: "102",
    //   photo: fakeAvatar.src,
    //   role: "admin",
    // },
    // {
    //   nickname: "yasser",
    //   id: "1211",
    //   photo: fakeAvatar.src,
    //   role: "admin",
    // },
    // {
    //   nickname: "Hicham",
    //   id: "12212",
    //   photo: fakeAvatar.src,
    //   role: "member",
    // },
    // {
    //   nickname: "frida",
    //   id: "12212",
    //   photo: fakeAvatar.src,
    //   role: "admin",
    // },
    // {
    //   nickname: "simo",
    //   id: "12212",
    //   photo: fakeAvatar.src,
    //   role: "member",
    // },
    // {
    //   nickname: "3bi9a",
    //   id: "12212",
    //   photo: fakeAvatar.src,
    //   role: "member",
    // },
    {
      nickname: "jilali",
      id: "12212",
      photo: fakeAvatar.src,
      role: "member",
    },
  ]);
  // information about me if im an owner or admin or member
  const [aboutMe, setAboutMe] = useState<aboutMe>({
    nickname: "Akouame",
    id: "12",
    role: "member",
  });

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

  const handleChallenge = () => {
    console.log("challenge");
  }

  const handleLeaveChannel = () => {
    // fetch(`http://localhost:3001/chat/${channelSelected.id}`, {
    //   method: "DELETE",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   credentials: "include",
    // });
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
              {/* <div className="optionUserDiv">
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
              </div> */}
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
          {/* right side of channel */}
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
              <p className="channelType">Channel {channelSelected.type}</p>
            </div>
            {/* start list members of channel with their roles */}
            <div className="infoMembersOfChannel">
              <h3 className="role">Owner</h3>
              {/* start owner of channel */}
              <div className="ownerBox">
                {memberList.map((member, index) => (
                  <div className="">
                    {member.role === "owner" && (
                      <div className="boxMember" key={index}>
                        <Image
                          src={member.photo}
                          alt="member"
                          className="memberPhoto"
                          width={35}
                          height={35}
                        />
                        <p className="memberName">{member.nickname}</p>
                        {/* if im just a member i cant see this select option */}
                        {(aboutMe.role === "member" && aboutMe.nickname !== member.nickname) && (
                          <div className="memberSee">
                            <button className="Challenge-btn" onClick={handleChallenge}><i className="ri-ping-pong-line"> Challenge</i></button>
                          </div>
                        )}
                        {/* if im an admin i can see this select option */}
                        {(aboutMe.role === "admin" && aboutMe.nickname !== member.nickname) && (
                          <div className="selectOwnerOptions">
                            <select name="" id="">
                              mok
                            </select>
                          </div>
                        )}
                        {/* if im an owner i can see this select option */}
                        {(aboutMe.role === "owner" && aboutMe.nickname !== member.nickname) && (
                          <div className="selectOwnerOptions">
                            <select name="" id="">
                              mok
                              <option value="mok">mok</option>
                              <option value="mok">bak</option>
                            </select>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
              {/* end owener of channel */}
              <h3 className="role">Admins</h3>
              {/* start admins of channel */}
              <div className="listMembersOfChannel">
                {memberList.map((member, index) => (
                  <div className="">
                    {member.role === "admin" && (
                      <div className="boxMember" key={index}>
                        <Image
                          src={member.photo}
                          alt="member"
                          className="memberPhoto"
                          width={35}
                          height={35}
                        />
                        <p className="memberName">{member.nickname}</p>
                        {/* if im just a member i cant see this select option */}
                        {(aboutMe.role === "member" && aboutMe.nickname !== member.nickname) && (
                          <div className="memberSee">
                            <button className="Challenge-btn"><i className="ri-ping-pong-line"> Challenge</i></button>
                          </div>
                        )}
                        {/* if im an admin i can see this select option */}
                        {(aboutMe.role === "admin" && aboutMe.nickname !== member.nickname) && (
                          <div className="selectOwnerOptions">
                            <select name="" id="">
                              mok
                            </select>
                          </div>
                        )}
                        {/* if im an owner i can see this select option */}
                        {(aboutMe.role === "owner" && aboutMe.nickname !== member.nickname) && (
                          <div className="selectOwnerOptions">
                            <select name="" id="">
                              mok
                              <option value="mok">mok</option>
                              <option value="mok">bak</option>
                            </select>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
              {/* end admins of channel */}
              <h3 className="role">Members</h3>
              {/* start members of channel */}
              <div className="listMembersOfChannel">
                {memberList.map((member, index) => (
                  <div className="">
                    {member.role === "member" && (
                      <div className="boxMember" key={index}>
                        <Image
                          src={member.photo}
                          alt="member"
                          className="memberPhoto"
                          width={35}
                          height={35}
                        />
                        <p className="memberName">{member.nickname}</p>
                        {/* if im just a member i cant see this select option */}
                        {(aboutMe.role === "member" && aboutMe.nickname !== member.nickname) && (
                          <div className="memberSee">
                            <button className="Challenge-btn"><i className="ri-ping-pong-line"> Challenge</i></button>
                          </div>
                        )}
                        {/* if im an admin i can see this select option */}
                        {(aboutMe.role === "admin" && aboutMe.nickname !== member.nickname) && (
                          <div className="selectOwnerOptions">
                            <select name="" id="">
                              mok
                            </select>
                          </div>
                        )}
                        {/* if im an owner i can see this select option */}
                        {(aboutMe.role === "owner" && aboutMe.nickname !== member.nickname) && (
                          <div className="selectOwnerOptions">
                            <select name="" id="">
                              mok
                              <option value="mok">mok</option>
                              <option value="mok">bak</option>
                            </select>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
            {/* end list members of channel with their roles */}
            <div className="leave-btn">
              <button className="leaveChannel" onClick={handleLeaveChannel}>
                Leave Channel
              </button>
            </div>
          </div>
          {/* end of right side of channel */}
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
