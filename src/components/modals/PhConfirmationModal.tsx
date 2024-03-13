import { Modal } from "antd";
import React, { ReactNode } from "react";

interface IPHConfirmationModalProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleOk: () => void;
  children: ReactNode;
  title: string;
  width?: number;
}
const PHConfirmationModal = ({
  open,
  setOpen,
  handleOk,
  children,
  title,
  width = 350,
}: IPHConfirmationModalProps) => {
  return (
    <Modal
      style={{
        textAlign: "center",
        fontSize: "20px",
        padding: "50px 10px",
      }}
      
      title={title}
      okText="yes"
      cancelText="no"
      open={open}
      onOk={handleOk}
      width={width}
      onCancel={() => setOpen((prev) => !prev)}
      centered
    >
      {children}
    </Modal>
  );
};

export default PHConfirmationModal;
