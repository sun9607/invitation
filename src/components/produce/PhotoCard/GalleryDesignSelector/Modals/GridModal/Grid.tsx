import { Col, Row } from "antd";

const Grid = () => {
  return (
    <Row gutter={2}>
      <Col style={{ aspectRatio: 1, backgroundColor: "black" }} span={12} />
      <Col style={{ aspectRatio: 1, backgroundColor: "#f19a79" }} span={12} />
      <Col style={{ aspectRatio: 1, backgroundColor: "#f19a79" }} span={12} />
      <Col style={{ aspectRatio: 1, backgroundColor: "black" }} span={12} />
    </Row>
  );
};

export default Grid;
