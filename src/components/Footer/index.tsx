import { Button, Flex, Layout } from "antd";
import FooterButton from "./FooterButton";
import { useState } from "react";
import ModalTerms from "./ModalTerms.tsx";
import ModalInfo from "./ModalInfo";

const { Footer } = Layout;

const CustomFooter = () => {
  const [termOpen, setTermOpen] = useState<boolean>(false);
  const [infoOpen, setInfoOpen] = useState<boolean>(false);

  return (
    <Footer style={{ marginTop: 20, padding: "20px 10px", fontSize: 11 }}>
      <Flex style={{ width: "100%" }}>
        <FooterButton>
          <b>헬륨가스</b>
        </FooterButton>
        <FooterButton onClick={() => setTermOpen(true)}>이용약관</FooterButton>
        <FooterButton onClick={() => setInfoOpen(true)}>
          개인정보처리방침
        </FooterButton>
        <FooterButton>제휴 문의</FooterButton>
      </Flex>
      <p>상호명: 헬륨가스 대전시 대덕구 대덕대로 1454번길 19-12 1층</p>
      <p>대표자: 이은정&nbsp;&nbsp;이메일 qkdcnclsrn@naver.com</p>
      <p>사업자등록번호: 166-14-02585</p>
      <p>통신판매업신고: 2024-대전대덕-0135호</p>
      <ModalTerms open={termOpen} setOpen={setTermOpen} />
      <ModalInfo open={infoOpen} setOpen={setInfoOpen} />
    </Footer>
  );
};

export default CustomFooter;
