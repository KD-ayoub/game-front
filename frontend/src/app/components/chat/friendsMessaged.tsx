import { useEffect, useState } from "react";
// import io from "socket.io-client"
import { FriendConversation } from "..";
import fakeAvatar from "@/app/assets/svg/chat/fakeAvatar.svg";
import hic_avatar from "@/app/assets/svg/chat/hic_avatar.svg";
import mo_avatar from "@/app/assets/svg/chat/mo_avatar.svg";
import "../../(pages)/chat/chat.css";

export default function FriendsMessaged() {
  const [friends, setFriends] = useState([
    {
      name: "Hicham",
      picture: fakeAvatar.src,
      unread: 2,
    },
    { name: "Aissa", picture: hic_avatar.src, unread: 0 },
    { name: "Mimo", picture: fakeAvatar.src, unread: 3 },
    { name: "Akadi", picture: hic_avatar.src, unread: 1 },
  ]);

  // useEffect(() => {
  //   // Assuming you have an API endpoint that returns a list of friends with their online status, pictures, and names
  //   fetch('https:/friends')
  //     .then(res => res.json())
  //     .then(data => setFriends(data));
  // }, []);

  return (
    <div>
      <div className="friendsMessaged">
            <p className="text-black">masasdasdadok</p>
      </div>
      <FriendConversation />
    </div>
  );
}
