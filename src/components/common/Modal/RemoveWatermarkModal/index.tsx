import { removeWatermark } from "@/api/cardApi";
import { CardModalProps } from "@/types/types";
import { Input, Modal, message } from "antd";
import { useRouter } from "next/router";
import { useState } from "react";

const RemoveWatermarkModal = (props: CardModalProps) => {
  const { open, handleClose, cardId } = props;
  const [orderNo, setOrderNo] = useState<string>("");
  const [messageApi, contextHolder] = message.useMessage();
  const router = useRouter();

  const handleChange = (e: any) => {
    setOrderNo(e.target.value);
  };

  const handleOk = () => {
    removeWatermark(cardId, orderNo).then((data: any) => {
      console.log(data);
      if (data.data) {
        messageApi.success(data.data.message);
        router.reload();
      } else {
        messageApi.error(data.message);
      }
      handleClose();
    });
  };

  return (
    <>
      {contextHolder}
      <Modal
        title="네이버 쇼핑 구매 후, 주문 번호를 입력하세요."
        open={open}
        onCancel={handleClose}
        onOk={handleOk}
        okText="확인"
        cancelText="취소"
      >
        <div>
          주문 번호는 네이버 쇼핑{" "}
          <span style={{ color: "#f19a79" }}>주문배송 목록&gt;주문상세</span>
          에서 확인 가능합니다.
        </div>
        <Input onChange={handleChange} value={orderNo} />
      </Modal>
    </>
  );
};

export default RemoveWatermarkModal;
