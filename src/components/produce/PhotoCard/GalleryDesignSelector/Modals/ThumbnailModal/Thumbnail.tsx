import { Col, Row } from "antd";

const Thumbnail = () => {
  return (
    <Row gutter={2}>
      <Col style={{ aspectRatio: 1, backgroundColor: "black" }} span={24} />
      <Col style={{ aspectRatio: 1, backgroundColor: "red" }} span={6} />
      <Col style={{ aspectRatio: 1, backgroundColor: "green" }} span={6} />
      <Col style={{ aspectRatio: 1, backgroundColor: "blue" }} span={6} />
      <Col style={{ aspectRatio: 1, backgroundColor: "yellow" }} span={6} />
    </Row>
  );
};

export default Thumbnail;
