import { Card } from "@/types/types";
import { Button, Flex, Image, Typography } from "antd";
import { useRouter } from "next/navigation";

interface ListBodyProps {
  elements: Card[];
  produceURL: string;
}

const { Title, Text } = Typography;

const ListBody = (props: ListBodyProps) => {
  const { elements, produceURL } = props;

  const router = useRouter();

  return (
    <ul style={{ listStyle: "none", padding: 20 }}>
      {elements.map((element: Card, idx: number) => {
        const {
          title,
          img,
          sampleLink,
          regularPrice = 0,
          salePrice = 0,
          undecided = false,
        } = element;

        return (
          <li
            key={idx}
            style={{
              width: "100%",
              marginBottom: 40,
            }}
          >
            <Flex gap="middle">
              <Title level={3}>{title}</Title>
            </Flex>
            <Image preview={false} src={img} style={{ marginBottom: 10 }} />
            {undecided ? (
              <div style={{ paddingRight: 10 }}>
                <Text type="warning">가격 미정</Text>
              </div>
            ) : (
              <Flex justify="space-between">
                <Flex gap="small">
                  <Text strong>{salePrice.toLocaleString("ko-KR")}원</Text>
                  <Text delete type="secondary">
                    {regularPrice.toLocaleString("ko-KR")}원
                  </Text>
                </Flex>
                <Flex style={{ paddingRight: 10 }} justify="flex-end">
                  <Button>샘플 보기</Button>
                  <Button onClick={() => router.push(produceURL)}>
                    제작하기
                  </Button>
                </Flex>
              </Flex>
            )}
          </li>
        );
      })}
    </ul>
  );
};

export default ListBody;
