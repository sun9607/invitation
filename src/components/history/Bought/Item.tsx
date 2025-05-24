import { DeleteOutlined } from "@ant-design/icons";
import { Button, Col, Flex, Row } from "antd";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { RemoveCardModal } from "@/components/common/Modal";
import { LinkButton } from "@/components/common";
import dayjs from "dayjs";

interface ItemProps {
  item: { [key: string]: any };
}

const Item = (props: ItemProps) => {
  const { item } = props;
  const router = useRouter();
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
  const [expired, setExpired] = useState<boolean>(false);
  const [deleteDate, setDeleteDate] = useState<string>("");

  useEffect(() => {
    const registeredDate = dayjs(item.registerdate);
    const now = dayjs();
    const diffDays = now.diff(registeredDate, "day");
    if (diffDays > 30) setExpired(true);
    setDeleteDate(registeredDate.add(30, "day").format("YYYY-MM-DD"));
  }, [item.registerdate]);

  if (expired) return null;

  return (
    <Flex vertical style={{ width: "100%" }}>
      <Row gutter={10} align="middle">
        <Col span={6}>
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
        <Col span={3}>
          <Button
            type="text"
            icon={<DeleteOutlined />}
            onClick={() => {
              setOpenDeleteModal(true);
            }}
          />
        </Col>
      </Row>
      <Flex justify="space-between" style={{ marginTop: 12 }}>
        <LinkButton href={`/edit/${item.id}`}>편집</LinkButton>
        <LinkButton href={`/view/${item.id}`}>편지 보기</LinkButton>
      </Flex>
      <RemoveCardModal
        open={openDeleteModal}
        handleClose={() => {
          setOpenDeleteModal(false);
        }}
        cardId={item.id}
      />
    </Flex>
  );
};

export default Item;
