import { Button, Flex } from "antd";
import { useRouter } from "next/navigation";

const EndWatermark = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push("/history");
  };

  return (
    <Flex
      gap="middle"
      vertical
      justify="space-around"
      style={{ backgroundColor: "#DFBFE6", padding: 20, minHeight: 400 }}
    >
      <Button block type="primary" onClick={handleClick}>
        워터마크 제거하기
      </Button>
      <div
        style={{
          textAlign: "center",
          padding: 0,
          wordWrap: "break-word",
          lineHeight: 1.5,
        }}
      >
        <br />
        네이버 헬륨가스 스토어에서
        <br />
        구매하시면 워터마크가 삭제됩니다
      </div>
    </Flex>
  );
};

export default EndWatermark;
