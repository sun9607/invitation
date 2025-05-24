import { Col, Row } from "antd";
import { useEffect, useState } from "react";
import ThumbItem from "./ThumbItem";
import { useRecoilValue } from "recoil";
import { cardState } from "@/recoil/produce";
import Img from "../common/Img";

interface GalleryThumbProps {
  list: { [key: string]: any }[];
}

const GalleryThumb = (props: GalleryThumbProps) => {
  const { list } = props;
  const [selected, setSelected] = useState<string>("");
  const { orderId } = useRecoilValue(cardState);

  useEffect(() => {
    setSelected(list[0].photo);
  }, [list]);

  return (
    <>
      <Img src={selected} style={{ marginBottom: 10 }} />
      <Row gutter={10}>
        {list.map((elem: { [key: string]: any }, idx: number) => (
          <Col span={6} key={idx} style={{ paddingBottom: 10 }}>
            <ThumbItem
              url={elem.photo}
              isSelected={selected === elem.photo}
              setSelected={setSelected}
            />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default GalleryThumb;
