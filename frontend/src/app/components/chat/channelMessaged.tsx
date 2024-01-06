import { useEffect, useState } from "react";
// import io from "socket.io-client"
import FriendConversation from "./friendConversation";
import fakeAvatar from "@/app/assets/svg/chat/fakeAvatar.svg";
import hic_avatar from "@/app/assets/svg/chat/hic_avatar.svg";
import mo_avatar from "@/app/assets/svg/chat/mo_avatar.svg";
import "../../(pages)/chat/chat.css";
import { friendSelected } from "@/app/utils/library/friendsSelected";
import { FriendsType } from "@/app/types/friendstype";
import Image from "next/image";
import { ChannelChatType } from "@/app/types/ChannelChatType";
import { GetChatConverssationType } from "@/app/types/getChatConverssation";
import lwaghch from "../../assets/svg/chat/lwaghch.svg";
import { ioClient } from "@/app/api/instance";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
// import Modal from "./modalJoin/modal";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { Button, Modal } from "flowbite-react";

// type friendT = { nickname: string; picture: string; unread: number };

export default function ChannelMessaged({
  onSelectChannel,
}: //returnfromChannel,
{
  onSelectChannel: (id: ChannelChatType) => void;
  //returnfromChannel: ()
}) {
  const [channel, setChannel] = useState<ChannelChatType[]>([]);
  const [members_ref, setmembers_ref] = useState<boolean>(false);
  const [searching, setSearching] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [channelSelected, setChannelSelected] = useState<ChannelChatType>();
  // here we filterSearch the friends list:
  const filterSearch = () => {
    if (!searching) {
      return channel;
    }
    return channel.filter((item) =>
      item.nameOfChannel.toLowerCase().includes(searching.toLowerCase())
    );
  };

  const filter_Search = filterSearch();
  const younes = () => {
    console.log("younes---------------------------------------------");
  };

  
  // Here we fetch channels from server and set them to state:
  useEffect(() => {
    console.log("");
    const client = ioClient.getSocketClient();
    async function fetcher() {
      const getChannel = await fetch(
        "http://localhost:3001/chat/list_channels",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      if (!getChannel.ok) {
        throw new Error("Network response was not ok");
      }
      const channels: ChannelChatType[] = await getChannel.json();
      channels.forEach((channel) => {
        if (channel.isJoined) client.emit("join", { channel_id: channel.id });
      });
      setChannel(channels);
    }
    fetcher();
  }, [members_ref]);

  useEffect(() => {
    const client = ioClient.getSocketClient();
    client.on("members_refresh", (data) => {
      setmembers_ref(!members_ref);
    });
    return () => {
      client.off("members_refresh");
    };
  }, []);

  const joinPublicChannel = (channel_id: string) => {
    
};


  //  i need to list in sockets if i delete a channel or if i add a channel

  //console.log("Channel", channel);
  console.log("channel li klikit 3lih", channelSelected);

  return (
    <>
      <div className="friendsMessaged">
        <div className="searchBar ">
          <input
            type="text"
            placeholder="Search..."
            onChange={(e) => setSearching(e.target.value)}
            className="bg-[#383546] text-white w-[90%] h-[30px] rounded-md pl-2"
          />
        </div>
        <ul className="friendsscroll">
          {filterSearch().map((channel) => (
            <li className="friend" key={channel.nameOfChannel}>
              <button
                className="selectFriend w-[100%]"
                onClick={() => {
                  //console.log("channel.id", channel.id);
                  setChannelSelected(channel);
                  onSelectChannel(channel);
                  // props.onChange(false);
                }}
              >
                <div className="listFriends">
                  <Image
                    src={
                      channel.photo === "defautl_img"
                        ? fakeAvatar.src
                        : channel.photo
                    }
                    width={45}
                    height={45}
                    alt={channel.nameOfChannel}
                    className="rounded-full"
                  />
                  <h4 className="text-[14px] pl-2 pt-1">
                    {channel.nameOfChannel}
                  </h4>
                  {/* {channel.unread > 0 ? (
                    <span className="unread">
                      {channel.unread > 9 ? "+9" : channel.unread}
                    </span>
                  ) : null}{" "} */}
                  {channel.isJoined === false ? (
                    <>
                      <button
                        className="isJoined"
                        onClick={() => {
                          setOpenModal(true);
                        }}
                      >
                        Join
                      </button>
                      {channelSelected && channelSelected.type === "PUBLIC" && (<Modal
                        show={openModal}
                        size="md"
                        onClose={() => setOpenModal(false)}
                        popup
                      >
                        <Modal.Header />
                        <Modal.Body>
                          <div className="text-center">
                            {/* <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" /> */}
                            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                              Are you sure you want to join this channel?
                            </h3>
                            <div className="flex justify-center gap-4">
                              <Button
                                // color="failure"
                                className="bg-[#E95A3A]"
                                onClick={() => {
                                  joinPublicChannel(channelSelected.id);
                                  setOpenModal(false)
                                }}
                              >
                                {"Yes, I'm sure"}
                              </Button>
                              <Button
                                color="gray"
                                onClick={() => setOpenModal(false)}
                              >
                                No, cancel
                              </Button>
                            </div>
                          </div>
                        </Modal.Body>
                      </Modal>)}
                    </>
                  ) : null}
                </div>
              </button>
            </li>
          ))}
        </ul>
        <Popup
          trigger={
            <button className="bg-[#E95A3A] rounded-lg">
              {" "}
              Create a channel
            </button>
          }
          position="right center"
        >
          <div className="text-red-400">
            <h1>hello</h1>
          </div>
        </Popup>
      </div>
    </>
  );
}
