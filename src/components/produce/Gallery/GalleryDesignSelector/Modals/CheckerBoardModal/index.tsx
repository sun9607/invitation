import { Modal } from "antd";
import CheckerBoard from "./CheckerBoard";
import { ModalProps } from "@/types/types";

const CheckerBoardModal = (props: ModalProps) => {
  const { open, setOpen } = props;

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <Modal open={open} onCancel={handleCancel} onOk={handleCancel}>
      <CheckerBoard />
    </Modal>
  );
};

export default CheckerBoardModal;
