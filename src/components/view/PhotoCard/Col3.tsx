import { Col, Row } from "antd";

interface Col3Props {
  list: { [key: string]: any };
}

const Col3 = (props: Col3Props) => {
  const { list } = props;
  const rect = list.filter(
    (elem: { [key: string]: any }) => elem.type === "rect"
  );

  const square = list.files.filter(
    (elem: { [key: string]: any }) => elem.type === "square"
  );

  return (
    <Row gutter={10}>
      <Col span={8}>
        <img width={"100%"} src={square[0].photo} />
        <img width={"100%"} src={rect[0].photo} />
        <img width={"100%"} src={square[1].photo} />
        <img width={"100%"} src={rect[1].photo} />
      </Col>
      <Col span={8}>
        <img width={"100%"} src={rect[2].photo} />
        <img width={"100%"} src={square[2].photo} />
        <img width={"100%"} src={rect[3].photo} />
        <img width={"100%"} src={square[3].photo} />
      </Col>
      <Col span={8}>
        <img width={"100%"} src={square[4].photo} />
        <img width={"100%"} src={rect[4].photo} />
        <img width={"100%"} src={square[5].photo} />
        <img width={"100%"} src={rect[5].photo} />
      </Col>
    </Row>
  );
};

export default Col3;
