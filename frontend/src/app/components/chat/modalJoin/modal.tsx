import React from "react";
import { useState } from "react";
import "./modal.css";
import { ChannelChatType } from "@/app/types/ChannelChatType";

type propType = {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  channel: ChannelChatType;
};

const Modal: React.FC<propType> = ({ open, onClose, children, channel }) => {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <div
      className={`headerDiv fixed inset-0 flex justify-center items-center transition-colors ${
        open ? "visible bg-black/20" : "invisible"
      }`}
      onClick={onClose}
    >
      {/* close modal */}
      <div
        className={`bg-white rounded-lg shadow p-6   ${
          open ? "scale-100 opacity-100" : "scale-110 opacity-0"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* main modal */}
        <div className="mainDiv">
          {channel.type === "public" &&
          (<div className="publicStyle">
            <h2>Are you sure, you want join this channel ?</h2>
          </div>)}
        </div>
        {/* end main modal */}
        <button className="btn-close text-[#E95A3A]" onClick={onClose}>
          Close
        </button>
      </div>
      {/* end close modal */}
    </div>
  );
};

export default Modal;
