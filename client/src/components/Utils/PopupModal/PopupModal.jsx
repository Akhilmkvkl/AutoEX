import { Button, Modal } from "antd";
import { useState } from "react";

export const showpopup = (msg) => {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
    // return {status:"ok"}
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <Modal title="" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
      <p>{msg}</p>
    </Modal>
  );
};
