import { useEffect, useState } from "react";
// import io from "socket.io-client"
import { FriendConversation } from "..";
import fakeAvatar from "@/app/assets/svg/chat/fakeAvatar.svg";
import hic_avatar from "@/app/assets/svg/chat/hic_avatar.svg";
import mo_avatar from "@/app/assets/svg/chat/mo_avatar.svg";
import "../../(pages)/chat/chat.css";
import { friendSelected } from "@/app/utils/library/friendsSelected";

export default function FriendsMessaged(props: any) {
  const [friends, setFriends] = useState([
    { name: "Hicham", picture: fakeAvatar.src, unread: 2 },
    { name: "Aissa", picture: hic_avatar.src, unread: 0 },
    // { name: "JAAFAR", picture: hic_avatar.src, unread: 0 },
    // { name: "AISSA", picture: hic_avatar.src, unread: 0 },
    // { name: "AKOUAME", picture: hic_avatar.src, unread: 20 },
    // { name: "HKADDOUR", picture: hic_avatar.src, unread: 10 },
    // { name: "LEONA", picture: hic_avatar.src, unread: 0 },
    // { name: "DOG", picture: hic_avatar.src, unread: 30 },
    // { name: "EKKO", picture: hic_avatar.src, unread: 0 },
    // { name: "MASTER", picture: hic_avatar.src, unread: 0 },
    // { name: "younes", picture: fakeAvatar.src, unread: 3 },
    // { name: "smart", picture: fakeAvatar.src, unread: 3 },
    // { name: "ido", picture: fakeAvatar.src, unread: 3 },
    // { name: "Akadi", picture: hic_avatar.src, unread: 1 },
  ]);
  const [searching, setSearching] = useState("");
  const [selectedFriend, setSelectedFriend] = useState(null);

  function handlShowFriendConversation(friend: any) {
    setSelectedFriend(friend);
  }

  const filterSearch = () => {
    if (!searching) {
      return friends;
    }
    return friends.filter((item) =>
      item.name.toLowerCase().includes(searching.toLowerCase())
    );
  };

  const filter_Search = filterSearch();

  // useEffect(() => {
  //   // Assuming you have an API endpoint that returns a list of friends with their online status, pictures, and names
  //   fetch('https:/friends')
  //     .then(res => res.json())
  //     .then(data => setFriends(data));
  // }, []);

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
            <li className="friend" key={friend.name}>
              <button
                className="selectFriend w-[100%]"
                onClick={() => {handlShowFriendConversation(friend); props.onChange(false)}}
              >
                <div className="listFriends">
                  <img
                    src={friend.picture}
                    alt={friend.name}
                    className="w-[45px] rounded-full"
                  />
                  <h4 className="text-[14px] pl-2 pt-1">{friend.name}</h4>
                  {friend.unread > 0 ? (
                    <span className="unread">
                      {friend.unread > 9 ? "+9" : friend.unread}
                    </span>
                  ) : null}{" "}
                </div>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
