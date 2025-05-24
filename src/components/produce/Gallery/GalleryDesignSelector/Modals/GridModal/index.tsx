import { ModalProps } from "@/types/types";
import { Modal } from "antd";
import Grid from "./Grid";

const GridModal = (props: ModalProps) => {
  const { open, setOpen } = props;

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <Modal open={open} onCancel={handleCancel} onOk={handleCancel}>
      <Grid />
    </Modal>
  );
};

export default GridModal;
