import { ModalProps } from "@/types/types";
import { Modal } from "antd";
import Thumbnail from "./Thumbnail";

const ThumbnailModal = (props: ModalProps) => {
  const { open, setOpen } = props;

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <Modal open={open} onCancel={handleCancel} onOk={handleCancel}>
      <Thumbnail />
    </Modal>
  );
};

export default ThumbnailModal;
