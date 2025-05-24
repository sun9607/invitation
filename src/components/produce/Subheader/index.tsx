import { MailOutlined } from "@ant-design/icons";
import { Button, Flex, Layout, Select, Spin, message } from "antd";
import data from "@/assets/music/data.json";
import { useFormContext } from "react-hook-form";
import { useContext, useState } from "react";
import { handleSubmit } from "@/util/form";
import { nanoid } from "nanoid";
import { useRecoilValue } from "recoil";
import { menuState } from "@/recoil/menu";
import AuthContext from "@/context/AuthContext";

interface SubheaderProps {
  title: string;
  saveLink?: string;
}

const { Header } = Layout;

const Subheader = (props: SubheaderProps) => {
  const { title } = props;
  const { ssid } = useContext(AuthContext);

  const { setValue, watch, getValues } = useFormContext();
  const [loading, setLoading] = useState<boolean>(false);

  const music = watch("bgm");
  const handleSelect = (value: number) => {
    setValue("bgm", value);
  };

  const menu = useRecoilValue(menuState);

  const [messageApi, contextHolder] = message.useMessage();

  const handleClick = () => {
    const data = getValues();
    setLoading(true);
    const id = nanoid();
    handleSubmit(
      id,
      menu,
      data,
      () => {
        messageApi.success("임시저장 완료!");
        setLoading(false);
      },
      ssid as string,
      false,
      true
    );
  };

  return (
    <Header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 100,
        width: "100%",
        padding: "9px 10px",
        background: "white",
        borderBottom: "1px solid #e8e8e8",
        lineHeight: "32px",
        height: "auto",
      }}
    >
      {contextHolder}
      <Flex style={{ width: "100%", paddingBottom: 9 }} justify="space-between">
        <span>
          <MailOutlined />
          {title}
        </span>
        <Select
          placeholder="BGM"
          onChange={handleSelect}
          value={music}
          options={data.bgm}
          style={{ width: 150 }}
        />
      </Flex>
      {loading ? (
        <Spin />
      ) : (
        <>
          {/* <Button block type="primary" onClick={handleClick}>
            임시저장
          </Button> */}
          <div style={{ width: "fit-content", margin: "5px auto 0", color: "#ff6666", fontSize: 12, lineHeight: 1.2 }}>
            다른창으로 이동 시 반드시 전체작성 후 이동하세요.<br />
            개인정보 보호를 위해 자동 저장되지 않습니다.
          </div>
        </>
      )}
    </Header>
  );
};

export default Subheader;
