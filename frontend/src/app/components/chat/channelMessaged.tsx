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
import {
  Button,
  Modal,
  Label,
  TextInput,
  Spinner,
  FloatingLabel,
  FileInput,
  Select,
  Dropdown,
} from "flowbite-react";
import { join_protected_channel } from "@/app/types/join_protected_channelType";
import { create_channel } from "@/app/types/createChannelType";
import toast, { Toaster } from "react-hot-toast";
import { on } from "events";
import { error } from "console";

// type friendT = { nickname: string; picture: string; unread: number };

export default function ChannelMessaged({
  onSelectChannel,
  online_rf,
  friends_rf,
  channel_rf,
  channelSelected_rf,
  members_rf,
  aboutMe_rf,
}: //returnfromChannel,
{
  onSelectChannel: (id: ChannelChatType) => void;
  online_rf: () => void;
  friends_rf: () => void;
  channel_rf: () => void;
  channelSelected_rf: () => void;
  members_rf: () => void;
  aboutMe_rf: () => void;
  //returnfromChannel: ()
}) {
  const [channel, setChannel] = useState<ChannelChatType[]>([]);
  const [searching, setSearching] = useState("");
  const [openModalPublic, setOpenModalPublic] = useState(false);
  const [openModalProtected, setOpenModalProtected] = useState(false);
  const [openModalCreateChannel, setOpenModalCreacteChannel] = useState(false);
  const [channelSelected, setChannelSelected] = useState<ChannelChatType>();
  const [join_protected_channel, setJoin_protected_channel] =
    useState<join_protected_channel>();
  const [statuspwd, setStatuspwd] = useState<boolean>(false);
  const [statusCreateChannel, setStatusCreateChannel] =
    useState<boolean>(false);
  const [newChannel, setNewChannel] = useState<create_channel>({
    name: "",
    password: "",
    type: "",
  });
  const [new_nameChannel, setNew_nameChannel] = useState<string>("");
  const [new_passwordChannel, setNew_passwordChannel] = useState<string>("");
  const [new_typeChannel, setNew_typeChannel] = useState<string>("");
  const [new_photoChannel, setNew_photoChannel] = useState<string>("");
  const [selectedImage, setSelectedImage] = useState<File>();

  // here we filterSearch the friends list:
  const filterSearch = () => {
    if (!searching) {
      return channel;
    }
    return channel.filter((item) =>
      item.nameOfChannel.toLowerCase().includes(searching.toLowerCase())
    );
  };

  useEffect(() => {
    console.log(openModalProtected);
  }, ["mok protcd", openModalProtected]);

  const filter_Search = filterSearch();

  // Here we fetch channels from server and set them to state:
  useEffect(() => {
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
  }, [channel_rf]);

  const joinPublicChannel = async (channel_id: string) => {
    const getChannel = await fetch(
      `http://localhost:3001/chat/join_public/${channel_id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      }
    );
    if (!getChannel.ok) {
      setStatuspwd(false);
    }
    if (getChannel.ok) {
      setStatuspwd(true);
    }
    //setChannelSelected(channel_id);
  };

  const checkPassword = async (channel_protected: join_protected_channel) => {
    const getChannel = await fetch(
      `http://localhost:3001/chat/join_protected`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          id: channel_protected.id,
          password: channel_protected.password,
        }),
      }
    );
    if (!getChannel.ok) {
      console.log(getChannel.status);
      console.log(channel_protected.password);
      // throw new Error("Network response was not ok");
    }
    if (getChannel.ok) {
      setStatuspwd(true);
      setJoin_protected_channel({
        id: "",
        password: "",
      });
      setOpenModalProtected(false);
      setOpenModalProtected(false);
    }

    console.log("check password ", getChannel);
  };

  const handleCreateChannel = async (newChannel: create_channel) => {
    console.log("before", newChannel);
    const getChannel = await fetch(
      `http://localhost:3001/chat/create_channel`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(newChannel),
      }
    );
    if (!getChannel.ok) {
      setStatusCreateChannel(false);
    }
    if (getChannel.ok) {
      setNew_passwordChannel("");
      setNew_typeChannel("");
      setNew_photoChannel("");
      setNew_nameChannel("");
      setNewChannel({ name: "", password: "", type: "" });
      setOpenModalCreacteChannel(false);
      setStatusCreateChannel(true);
    }
    console.log("after", newChannel);
    console.log("Create Channel", getChannel);
  };

  async function handlImageChange() {
    const formData = new FormData();
    let checkItem: string = "";
    formData.append("file", selectedImage ?? "https://placehold.co/400");
    formData.forEach((item) => (checkItem = item.toString()));
    console.log("checkItem", checkItem);
    if (selectedImage) {
      console.log("shoul not enter");
      const toastId = toast.loading("Saving changes", {
        style: {
          backgroundColor: "#383546",
          color: "white",
        },
      });
      const putted = await PutImage(formData);
      toast.success("Saved", {
        id: toastId,
        style: {
          backgroundColor: "#383546",
          color: "white",
        },
      });
      console.log("putted", putted);
    }
  }

  async function PutImage(formData: FormData) {
    console.log("file sent", formData);
    const response = await fetch(
      `http://localhost:3001/chat/channel_photo/${new_nameChannel}`,
      {
        method: "POST",
        body: formData,
        credentials: "include",
      }
    );
    if (!response.ok) {
      console.log("Error ,response of put image ");
    } else {
      console.log("success put image");
    }
    
  }

  const handleNewChannel = (newchnl: create_channel) => {
    setNewChannel(newchnl);
  };

  // useEffect(() => {
  // }, [channelSelected, channel]);

  //  i need to list in sockets if i delete a channel or if i add a channel

  //console.log("Channel", channel);
  // console.log("channel li klikit 3lih", channelSelected);
  // console.log("password li dkhalt", join_protected_channel?.password);
  // console.log(channelSelected?.isJoined);
  console.log(
    new_nameChannel,
    new_passwordChannel,
    new_typeChannel,
    new_photoChannel
  );

  return (
    <>
      <div className="channelMessaged">
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
              <div
                className="selectFriend w-[100%]"
                onClick={() => {
                  // setChannelSelected(channel);
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
                      {/* join public channel */}
                      <button
                        className="isJoined"
                        onClick={() => {
                          {
                            if (channel.type === "PUBLIC")
                              setOpenModalPublic(true);
                            else if (channel.type === "PROTECTED")
                              setOpenModalProtected(true);
                          }
                          onSelectChannel(channel);
                        }}
                      >
                        Join
                      </button>
                      {channel && channel.type === "PUBLIC" && (
                        <Modal
                          show={openModalPublic}
                          size="md"
                          onClose={() => setOpenModalPublic(false)}
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
                                    joinPublicChannel(channel.id);
                                    setOpenModalPublic(false);
                                    onSelectChannel(channel);
                                    // onSelectChannel(channel);
                                  }}
                                >
                                  {"Yes, I'm sure"}
                                </Button>
                                <Button
                                  color="gray"
                                  onClick={() => setOpenModalPublic(false)}
                                >
                                  No, cancel
                                </Button>
                              </div>
                            </div>
                          </Modal.Body>
                        </Modal>
                      )}
                      {/* join protected channel */}
                      {channel && channel.type === "PROTECTED" && (
                        <Modal
                          show={openModalProtected}
                          size="md"
                          onClose={() => setOpenModalProtected(false)}
                          popup
                        >
                          <Modal.Header />
                          <Modal.Body>
                            <div className="text-center">
                              <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                                This channel is protected, please enter the
                                password
                              </h3>
                              {/* <div className="flex flex-col justify-center gap-4"> */}
                              <div>
                                <div className="mb-2 block">
                                  <Label
                                    htmlFor="password"
                                    color="default"
                                    value="Password"
                                  />
                                </div>
                                <TextInput
                                  id="password"
                                  placeholder="password"
                                  required
                                  className="text-[#000]"
                                  onChange={(event) =>
                                    setJoin_protected_channel({
                                      id: channel.id,
                                      password: event.target.value,
                                    })
                                  }
                                  // helperText={
                                  //   <>
                                  //     <span className="font-medium">
                                  //       Alright!
                                  //     </span>{" "}
                                  //     Password available!
                                  //   </>
                                  // }
                                />
                              </div>
                              <div>
                                <div className="checkPwd">
                                  <Button
                                    // color="failure"
                                    className="bg-[#E95A3A] mr-4"
                                    onClick={() => {
                                      join_protected_channel &&
                                        checkPassword(join_protected_channel);
                                      // setOpenModal(false);
                                    }}
                                  >
                                    {"Validate"}
                                  </Button>
                                  <Button
                                    color="gray"
                                    className="ml-4"
                                    onClick={() => setOpenModalProtected(false)}
                                  >
                                    cancel
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </Modal.Body>
                        </Modal>
                      )}
                    </>
                  ) : null}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="createChannel">
        <Button
          onClick={() => setOpenModalCreacteChannel(true)}
          className="bg-[#E95A3A]"
        >
          Create a channel
        </Button>
        <Modal
          show={openModalCreateChannel}
          size="4xl"
          onClose={() => setOpenModalCreacteChannel(false)}
          popup
        >
          <Modal.Header />
          <Modal.Body>
            <div className="text-center">
              <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                Complete the form to create your channel
              </h3>
              <div className="grid grid-flow-col justify-stretch space-x-4">
                <FloatingLabel
                  variant="outlined"
                  label="Name of channel"
                  color="default"
                  onChange={(event) => {
                    setNew_nameChannel(event.target.value);
                    handleNewChannel({
                      name: new_nameChannel,
                      password: new_passwordChannel,
                      type: new_typeChannel,
                    });
                  }}
                />

                <div>
                  <FileInput
                    // className="hidden"
                    // type="file"
                    accept="image/png, image/jpeg, image/jpg"
                    id="profile-img"
                    // ref={fileinputRef}
                    onChange={(e) => {
                      e.preventDefault();
                      if (e.target.files) {
                        const file = e.target.files[0];
                        if (e.target.files.length > 0) {
                          // setCreateObjectURL(URL.createObjectURL(file));
                          // setDataSettings({
                          //   ...dataSettings,
                          //   photo_path: ${ProfileImg.src},
                          // });
                          // console.log("imagechange:", createObjectURL);
                          setSelectedImage(file);
                        }
                      }
                    }}
                  />
                </div>
              </div>
              <div className="max-w-md lastInput ">
                {/* <Label htmlFor="TypeChannel" value="Select type of channel" /> */}
                <Dropdown
                  className=""
                  label={`Type of Channel: ${new_typeChannel}`}
                  dismissOnClick={false}
                >
                  <Dropdown.Item
                    className="typeChannelSelect"
                    onClick={() => {
                      setNew_typeChannel("PUBLIC");
                      handleNewChannel({
                        name: new_nameChannel,
                        password: new_passwordChannel,
                        type: "PUBLIC",
                      });
                    }}
                  >
                    Public
                  </Dropdown.Item>
                  <Dropdown.Item
                    className="typeChannelSelect"
                    onClick={() => {
                      setNew_typeChannel("PRIVATE");
                      handleNewChannel({
                        name: new_nameChannel,
                        password: new_passwordChannel,
                        type: "PRIVATE",
                      });
                    }}
                  >
                    Private
                  </Dropdown.Item>
                  <Dropdown.Item
                    className="typeChannelSelect"
                    onClick={() => {
                      setNew_typeChannel("PROTECTED");
                      handleNewChannel({
                        name: new_nameChannel,
                        password: new_passwordChannel,
                        type: "PROTECTED",
                      });
                    }}
                  >
                    Protected
                  </Dropdown.Item>
                </Dropdown>
                {new_typeChannel && new_typeChannel === "PROTECTED" && (
                  <div className="mb-2 mt-2">
                    <FloatingLabel
                      className="pswdInput"
                      variant="outlined"
                      label="Password"
                      color="default"
                      onChange={(pwd) => {
                        setNew_passwordChannel(pwd.target.value);
                        handleNewChannel({
                          name: new_nameChannel,
                          password: new_passwordChannel,
                          type: new_typeChannel,
                        });
                      }}
                    />
                  </div>
                )}
              </div>
              <div className="flex justify-center gap-10 mt-5">
                <Button
                  className="bg-[#E95A3A]"
                  onClick={() => {
                    // console.log("newChannel", newChannel);

                    handleCreateChannel({name: new_nameChannel, password:new_passwordChannel, type:new_typeChannel});
                    handlImageChange();
                  }}
                >
                  {"Create"}
                </Button>
                <Button
                  color="gray"
                  onClick={() => {
                    setOpenModalCreacteChannel(false);
                    setNew_passwordChannel("");
                    setNew_typeChannel("");
                    setNew_photoChannel("");
                    setNewChannel({ name: "", password: "", type: "" });
                    setNew_nameChannel("");
                  }}
                >
                  No, cancel
                </Button>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    </>
  );
}
