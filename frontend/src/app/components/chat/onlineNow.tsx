import { NeuePlakFont } from "@/app/utils/NeuePlakFont";
import { useEffect, useState } from "react";
import fakeAvatar from "@/app/assets/svg/chat/fakeAvatar.svg";
import hic_avatar from "@/app/assets/svg/chat/hic_avatar.svg";
import mo_avatar from "@/app/assets/svg/chat/mo_avatar.svg";
import "../../(pages)/chat/chat.css";
import Image from "next/image";
import { isOnlineType } from "@/app/types/isOnlineType";

export default function OnlineNow() {
  const [friends, setFriends] = useState<isOnlineType[]>([
  ]);

	useEffect( () => {
    	async function fetcher() {
    	  const getconv = await fetch(
    	    `http://localhost:3001/chat/friends_state/`,
    	    {
    	      method: "GET",
    	      headers: {
    	        "Content-Type": "application/json",
    	      },
    	      credentials: "include",
    	    }
    	  );
    	  if (!getconv.ok) {
    	    throw new Error("Network response was not ok");
    	  }
    	  setFriends(await getconv.json());
    	}
    	fetcher();
	}, []);

  const onlineFriends = friends.filter(
    (friend) => friend.is_active !== "offline"
  );

  return (
    <div className="onlineNow">
      <h2>Online Friends</h2>
      <div className="onlineList">
        {onlineFriends.length>0 ? onlineFriends.map((friend) => (
          <button className="btnOnlineNow" key={friend.id}>
            <div
              className="onlineUser text-[10px] text-center p-1 "
              key={friend.id}
            >
              <Image
                src={friend.photo_path}
                alt={friend.nickName}
                width={50}
                height={50}
                className="w-[50px] rounded-full"
              />
              <span>{friend.nickName}</span>
            </div>
          </button>
        )) : <div className="noOnlineFriends">No one is online !</div>}
      </div>
    </div>
  );
}
