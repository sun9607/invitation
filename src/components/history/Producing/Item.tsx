import { DeleteOutlined } from "@ant-design/icons";
import { Button, Col, Flex, Row, Spin } from "antd";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { RemoveCardModal, RemoveWatermarkModal } from "@/components/common/Modal";
import { LinkButton } from "@/components/common";
import dayjs from "dayjs";

interface ItemProps {
  item: { [key: string]: any };
}

const Item = (props: ItemProps) => {
  const { item } = props;
  const [loading] = useState<boolean>(false);
  const [openRemoveModal, setOpenRemoveModal] = useState<boolean>(false);
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
  const [expired, setExpired] = useState<boolean>(false);
  const [deleteDate, setDeleteDate] = useState<string>("");

  useEffect(() => {
    const registeredDate = dayjs(item.registerdate);
    const now = dayjs();
    const diffDays = now.diff(registeredDate, "day");
    if (diffDays > 45) setExpired(true);
    setDeleteDate(registeredDate.add(45, "day").format("YYYY-MM-DD"));
  }, [item.registerdate]);

  if (expired) return null;

  return (
    <Flex vertical style={{ width: "100%" }}>
      <Row gutter={10}>
        <Col span={5}>
          <img src={item.intro_image} width="100%" />
        </Col>
        <Col span={15}>
          <table>
            <tbody>
              <tr>
                <th>타입</th>
                <td>
                  {item.menu === "special" ? "Special Day" : "Photo Message"}
                </td>
              </tr>
              <tr>
                <th>편지코드</th>
                <td style={{ maxWidth: "35vw", wordBreak: "break-all", textOverflow: "ellipsis" }}>{item.id}</td>
              </tr>
              <tr>
                <th>삭제 예정</th>
                <td>{deleteDate}</td>
              </tr>
            </tbody>
          </table>
        </Col>
        <Col span={4}>
          <Button
            type="text"
            icon={<DeleteOutlined />}
            onClick={() => {
              setOpenDeleteModal(true);
            }}
          />
        </Col>
      </Row>
      <>
        {loading ? (
          <Spin />
        ) : (
          <Flex justify="space-between">
            <LinkButton href={`/edit/${item.id}`}>편집</LinkButton>
            <LinkButton
              type="primary"
              href="https://smartstore.naver.com/gas-bye/products/10302548592?NaPm=ct%3Dm2fnrre5%7Cci%3Dcheckout%7Ctr%3Dppc%7Ctrx%3Dnull%7Chk%3De67aad4fd6bec673da348ebb7a438ce1014efe76"
            >
              구매하기
            </LinkButton>
            <Button
              type="primary"
              onClick={() => {
                setOpenRemoveModal(true);
              }}
            >
              워터마크 제거
            </Button>
            <LinkButton href={`/view/${item.id}`}>편지 보기</LinkButton>
          </Flex>
        )}
        <RemoveWatermarkModal
          open={openRemoveModal}
          handleClose={() => {
            setOpenRemoveModal(false);
          }}
          cardId={item.id}
        />
        <RemoveCardModal
          open={openDeleteModal}
          handleClose={() => {
            setOpenDeleteModal(false);
          }}
          cardId={item.id}
        />
      </>
    </Flex>
  );
};

export default Item;
