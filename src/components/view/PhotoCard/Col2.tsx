import { Col, Flex, Row } from "antd";

interface Col2Props {
  list: { [key: string]: any };
}

const Col2 = (props: Col2Props) => {
  const { list } = props;
  const rect = list.filter(
    (elem: { [key: string]: any }) => elem.type === "rect"
  );

  const square = list.filter(
    (elem: { [key: string]: any }) => elem.type === "square"
  );

  return (
    <Row gutter={10}>
      <Col span={12}>
        <Flex vertical>
          <img
            style={{
              width: "100%",
              aspectRatio: 3 / 4,
            }}
            src={rect[0].photo}
          />
          <img
            style={{
              width: "100%",
              aspectRatio: 1,
            }}
            src={square[0].photo}
          />
          <img
            style={{
              width: "100%",
              aspectRatio: 3 / 4,
            }}
            src={rect[1].photo}
          />
          <img
            style={{
              width: "100%",
              aspectRatio: 1,
            }}
            src={square[1].photo}
          />
        </Flex>
      </Col>
      <Col span={12}>
        <Flex vertical>
          <img
            style={{
              width: "100%",
              aspectRatio: 1,
            }}
            src={square[2].photo}
          />
          <img
            style={{
              width: "100%",
              aspectRatio: 3 / 4,
            }}
            src={rect[2].photo}
          />
          <img
            style={{
              width: "100%",
              aspectRatio: 1,
            }}
            src={square[3].photo}
          />
          <img
            style={{
              width: "100%",
              aspectRatio: 3 / 4,
            }}
            src={rect[3].photo}
          />
        </Flex>
      </Col>
    </Row>
  );
};

export default Col2;
