import { setPremiumApi } from "@/api/adminApi";
import { Button, Flex, Input, message } from "antd";
import { useState } from "react";

const Admin = () => {
  const [value, setValue] = useState<string>("");
  const [messageApi, contextHolder] = message.useMessage();

  const handleChange = (e: any) => {
    setValue(e.target.value);
  };

  const handleClick = () => {
    setPremiumApi(value)
      .then(() => {
        messageApi.info("저장되었습니다.");
      })
      .catch(() => {
        messageApi.error("실패했습니다.");
      });
  };

  return (
    <Flex vertical justify="center" align="center">
      {contextHolder}
      <Input
        value={value}
        onChange={handleChange}
        placeholder="카드 아이디를 입력하세요"
      />
      <Button
        block
        type="primary"
        style={{ marginTop: 10 }}
        disabled={!value.length}
        onClick={handleClick}
      >
        구매 승인
      </Button>
    </Flex>
  );
};

export default Admin;
