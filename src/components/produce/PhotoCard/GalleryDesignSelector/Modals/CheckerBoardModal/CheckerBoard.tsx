import { Col, Row } from "antd";

const CheckerBoard = () => {
  return (
    <Row gutter={16}>
      {Array.from({ length: 9 }).map((_: any, i: number) => (
        <Col
          style={{
            aspectRatio: 1,
            backgroundColor: i % 2 === 0 ? "black" : "#f19a79",
          }}
          span={8}
          key={i}
        />
      ))}
    </Row>
  );
};

export default CheckerBoard;
