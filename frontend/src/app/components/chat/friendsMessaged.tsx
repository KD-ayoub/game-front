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
import { FriendsChatType } from "@/app/types/friendsChatType";
import { GetChatConverssationType } from "@/app/types/getChatConverssation";
// type friendT = { nickname: string; picture: string; unread: number };

export default function FriendsMessaged({onSelect}: {onSelect: (id:FriendsChatType) => void}) {
  
  const [friends, setFriends] = useState<FriendsChatType[]>([]);
  const [searching, setSearching] = useState("");
  

  // here we filterSearch the friends list:
  const filterSearch = () => {
    if (!searching) {
      return friends;
    }
    return friends.filter((item) =>
      item.nickname.toLowerCase().includes(searching.toLowerCase())
    );
  };

  const filter_Search = filterSearch();
  // Here we fetch friends from server and set them to state:
  useEffect(() => {
    async function fetcher() {
      const getFriends = await fetch("http://localhost:3001/chat/conv", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      if (!getFriends.ok) {
        throw new Error("Network response was not ok");
      }
      setFriends(await getFriends.json());
    }
    fetcher();
  }, []);



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
          {filterSearch().map((friend) => (
            <li className="friend" key={friend.nickname}>
              <button
                className="selectFriend w-[100%]"
                onClick={() => {
                  //console.log("friend.id", friend.id);
                  onSelect(friend);
                  // props.onChange(false);
                }}
              >
                <div className="listFriends">
                  <Image
                    src={
                      friend.photo === "defautl_img"
                        ? fakeAvatar.src
                        : friend.photo
                    }
                    width={45}
                    height={45}
                    alt={friend.nickname}
                    className="rounded-full"
                  />
                  <h4 className="text-[14px] pl-2 pt-1">{friend.nickname}</h4>
                  {/* {friend.unread > 0 ? (
                    <span className="unread">
                      {friend.unread > 9 ? "+9" : friend.unread}
                    </span>
                  ) : null}{" "} */}
                </div>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
