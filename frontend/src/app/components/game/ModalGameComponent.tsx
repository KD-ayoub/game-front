import React, { useState } from "react";
import { Button, Modal } from "flowbite-react";

export default function ModalGameComponent(props: any) {
  const [openModal, setOpenMoadl] = useState(true);
  return (
    <Modal
    className="bg-gray-600"
      show={openModal}
    >
      <Modal.Header>Rules of the game</Modal.Header>
      <Modal.Body>
        <div>
          you are the bottom, use the left and right keys
        </div>
      </Modal.Body>
    </Modal>
  );
}
