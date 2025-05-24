import { Flex, Typography, Image, Button, Row, Col } from "antd";
import { useRouter } from "next/navigation";

interface ElemProps {
  title: string;
  id: string;
  viewUrl?: string;
  produceUrl?: string;
  comment?: string;
}

const { Title } = Typography;

const Elem = (props: ElemProps) => {
  const { title, id, viewUrl, produceUrl, comment } = props;

  const router = useRouter();

  return (
    <li
      id={id}
      style={{
        width: "100%",
        marginBottom: 40,
      }}
    >
      <Flex gap="middle">
        <Title level={3}>{title}</Title>
      </Flex>
      <Image
        preview={false}
        width={"100%"}
        src={`/static/thumbnail/${id}.jpg
        `}
        style={{ marginBottom: 10 }}
      />
      {produceUrl && (
        <Row gutter={10}>
          <Col span={12}>
            {viewUrl ? (
              <Button block onClick={() => router.push(viewUrl)}>샘플 보기</Button>
            ) : (
              <Button block>샘플 보기</Button>
            )}
          </Col>
          <Col span={12}>
            <Button
              block
              onClick={() => router.push(produceUrl)}
              type="primary"
            >
              제작하기
            </Button>
          </Col>
        </Row>
      )}
      {comment && <div style={{ color: "#999" }}>{comment}
      </div>}
    </li>
  );
};

export default Elem;
