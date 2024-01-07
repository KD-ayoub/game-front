import { NeuePlakFont } from "@/app/utils/NeuePlakFont";
import { useEffect, useState } from "react";
import fakeAvatar from "@/app/assets/svg/chat/fakeAvatar.svg";
import hic_avatar from "@/app/assets/svg/chat/hic_avatar.svg";
import mo_avatar from "@/app/assets/svg/chat/mo_avatar.svg";
import "../../(pages)/chat/chat.css";
import Image from "next/image";
import { isOnlineType } from "@/app/types/isOnlineType";

export default function OnlineNow({
  online_rf,
  friends_rf,
  channel_rf,
  channelSelected_rf,
  members_rf,
  aboutMe_rf,
}:
{
  online_rf: () => void;
  friends_rf: () => void;
  channel_rf: () => void;
  channelSelected_rf: () => void;
  members_rf: () => void;
  aboutMe_rf: () => void;
}) {
  const [friends, setFriends] = useState<isOnlineType[]>([
    {
      nickName: "mouha",
      photo_path: fakeAvatar.src,
      is_active: "offline",
      id: "12",
      // full_name: "zbi",
    },
    {
      nickName: "mouha",
      photo_path: fakeAvatar.src,
      is_active: "online",
      id: "13",
      // full_name: "zbi",
    },
    {
      nickName: "mouha",
      photo_path: fakeAvatar.src,
      is_active: "in-game",
      id: "14",
      // full_name: "zbi",
    },
  ]);

  //  useEffect( () => {
  //    	async function fetcher() {
  //    	  const getconv = await fetch(
  //    	    `http://localhost:3001/chat/friends_state/`,
  //    	    {
  //    	      method: "GET",
  //    	      headers: {
  //    	        "Content-Type": "application/json",
  //    	      },
  //    	      credentials: "include",
  //    	    }
  //    	  );
  //    	  if (!getconv.ok) {
  //    	    // throw new Error("Network response was not ok");
  //    	  }
	// 	  const data = await getconv.json();

  //    	  setFriends(data);
  //    	}
  //    	fetcher();
  //  }, []);

  const onlineFriends = (friends.filter(
    (friend) => friend.is_active !== "offline") 
  );

  return (
    <div className="onlineNow">
      <h2>Online Friends</h2>
      <div className="onlineList">
        {onlineFriends.length > 0 ? (
          onlineFriends.map((friend) => (
            <button className="btnOnlineNow" key={friend.id}>
              <div
                className="onlineUser text-[10px] text-center p-1 "
                key={friend.id}
              >
				 {friend.is_active==="online" && <span className="text-teal-500"> {friend.is_active} </span>}
				 {friend.is_active==="in-game" && <span className="text-teal-300"> {friend.is_active} </span>}
			 	 {friend.photo_path !== "default_img" ? (
			 	 <Image
			 	 src={friend.photo_path}
			 	 alt={friend.nickName}
			 	 width={50}
			 	 height={50}
			 	 className="w-[50px] rounded-full"
			 	 />
			 	 ) : (
			 	 <Image
			 	 src={fakeAvatar.src}
			 	 alt={friend.nickName}
			 	 width={50}
			 	 height={50}
			 	 className="w-[50px] rounded-full"
			 	 />
			 	 )}
				 <span> {friend.nickName} </span>
              </div>
            </button>
          ))
        ) : (
          <div className="noOnlineFriends">No one is online !</div>
        )}
      </div>
    </div>
  );
}
