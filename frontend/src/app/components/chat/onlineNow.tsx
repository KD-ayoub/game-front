import { NeuePlakFont } from "@/app/utils/NeuePlakFont";
import { useEffect, useState } from "react";
import fakeAvatar from "@/app/assets/svg/chat/fakeAvatar.svg";
import hic_avatar from "@/app/assets/svg/chat/hic_avatar.svg";
import mo_avatar from "@/app/assets/svg/chat/mo_avatar.svg";
import "../../(pages)/chat/chat.css";
import Image from "next/image";

export default function OnlineNow() {
  const [friends, setFriends] = useState([
    { id: 1, name: "Johnoe", picture: fakeAvatar.src, isOnline: true },
    { id: 2, name: "Ausso", picture: hic_avatar.src, isOnline: true },
  ]);

  // useEffect(() => {
  //   // Assuming you have an API endpoint that returns a list of friends with their online status, pictures, and names
  //   fetch('https://api.example.com/friends')
  //     .then(res => res.json())
  //     .then(data => setFriends(data));
  // }, []);

  const onlineFriends = friends.filter((friend) => friend.isOnline);

  return (
    <div className="onlineNow">
      <h2>Online Friends</h2>
      <div className="onlineList">
        {onlineFriends.map((friend) => (
          <button className="btnOnlineNow" key={friend.id}>
            <div
              className="onlineUser text-[10px] text-center p-1 "
              key={friend.id}
            >
              <Image
                src={friend.picture}
                alt={friend.name}
                width={50}
                height={50}
                className="w-[50px] rounded-full"
              />
              <span>{friend.name}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}