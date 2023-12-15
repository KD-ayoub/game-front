import { NeuePlakFont } from "@/app/utils/NeuePlakFont";
import { useEffect, useState } from "react";
import fakeAvatar from "@/app/assets/svg/chat/fakeAvatar.svg";
import hic_avatar from "@/app/assets/svg/chat/hic_avatar.svg";
import mo_avatar from "@/app/assets/svg/chat/mo_avatar.svg";
import "../../(pages)/chat/chat.css";

export default function OnlineNow() {
  const [friends, setFriends] = useState([
    { id: 1, name: "Johnoe", picture: fakeAvatar.src, isOnline: true },
    { id: 2, name: "Ausso", picture: hic_avatar.src, isOnline: true },
    { id: 3, name: "Moka", picture: mo_avatar.src, isOnline: true },
    { id: 4, name: "Aissa", picture: hic_avatar.src, isOnline: true },
    { id: 5, name: "Mimo", picture: fakeAvatar.src, isOnline: true },
    { id: 6, name: "Mortelle", picture: hic_avatar.src, isOnline: false },
    { id: 7, name: "HICHAM", picture: fakeAvatar.src, isOnline: true },
    { id: 8, name: "youness", picture: hic_avatar.src, isOnline: true },
    { id: 9, name: "hicham", picture: fakeAvatar.src, isOnline: true },
    { id: 10, name: "ido", picture: mo_avatar.src, isOnline: true },
    { id: 11, name: "AKADI", picture: mo_avatar.src, isOnline: true },
    { id: 12, name: "master", picture: fakeAvatar.src, isOnline: true },
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
      <div className="onlineList flex">
        {onlineFriends.map((friend) => (
          <button className="btnOnlineNow">
            <div
              className="onlineUser text-[10px] text-center p-1 "
              key={friend.id}
            >
              <img
                src={friend.picture}
                alt={friend.name}
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
