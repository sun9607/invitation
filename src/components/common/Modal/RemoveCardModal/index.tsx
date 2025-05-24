import { removeCard } from "@/api/cardApi";
import { CardModalProps } from "@/types/types";
import { message, Modal } from "antd";
import { useRouter } from "next/navigation";

const RemoveCardModal = (props: CardModalProps) => {
  const { open, handleClose, cardId } = props;
  const [messageApi, contextHolder] = message.useMessage();
  const router = useRouter();
  
  const handleOk = async () => {
    try {
      const data = await removeCard(cardId);
      if (data) {
        messageApi.success("삭제되었습니다.");
        handleClose(); // 모달 닫기
        router.replace("/history"); // 이동
        router.refresh(); // ✅ 강제로 페이지 새로고침
      } else {
        messageApi.error("문제가 생겼습니다.");
      }
    } catch (e: any) {
      console.error("삭제 중 오류:", e);
      messageApi.error("삭제에 실패했습니다.");
    }
  };
  

  return (
    <>
      {contextHolder}
      <Modal
        title="정말 삭제하시겠습니까?"
        open={open}
        onOk={handleOk}
        onCancel={handleClose}
        okText="예"
        cancelText="아니오"
      />
    </>
  );
};

export default RemoveCardModal;
