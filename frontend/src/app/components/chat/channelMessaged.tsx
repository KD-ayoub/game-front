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

// type friendT = { nickname: string; picture: string; unread: number };

export default function ChannelMessaged({
  onSelect,
}: {
  onSelect: (id: ChannelChatType) => void;
}) {
  const [channel, setChannel] = useState<ChannelChatType[]>([]);
  const [searching, setSearching] = useState("");

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

  // Here we fetch channels from server and set them to state:
  useEffect(() => {
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
        console.log("error fetcher");
        throw new Error("Network response was not ok");
      }
      setChannel(await getChannel.json());
    }
    fetcher();
  }, [channel]);

  console.log("Channel", channel);

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
                  console.log("channel.id", channel.id);
                  onSelect(channel);
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
                    <button className="isJoined">Join</button>
                  ) : null}
                </div>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
