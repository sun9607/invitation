import { ArrowLeftOutlined, HomeOutlined } from "@ant-design/icons";
import { Button, Flex, Layout } from "antd";
import { useRouter } from "next/router";

const { Header } = Layout;

interface BackHeadedrProps {
  editLink?: string;
}

const BackHeadedr = ({ editLink }: BackHeadedrProps) => {
  const router = useRouter();
  const { id } = router.query;

  const handleBack = () => {
    router.back();
  };

  return (
    <Header
      style={{
        display: "flex",
        position: "sticky",
        zIndex: 10,
        width: "100%",
        top: 0,
        backgroundColor: "white",
        padding: 20,
      }}
    >
      <Flex justify="space-between" align="center" style={{ width: "100%" }}>
        <Flex align="center" gap={12}>
          <Button type="text" icon={<ArrowLeftOutlined />} onClick={handleBack} />
          {editLink && (
            <Button type="text" onClick={() => router.push(editLink)}>
              편집하기
            </Button>
          )}
        </Flex>
        <Button
          type="text"
          icon={<HomeOutlined />}
          onClick={() => router.push("/")}
        />
      </Flex>
    </Header>
  );
};

export default BackHeadedr;
