import { getMyCards, setUserApi } from "@/api/cardApi";
import { Bought, Producing } from "@/components/history";
import AuthContext from "@/context/AuthContext";
import BackHeadedr from "@/layout/Header/BackHeader";
import { Layout, Space, Spin, message } from "antd";
import { JwtPayload } from "jsonwebtoken";
import { useContext, useEffect, useState } from "react";
import dayjs from "dayjs";

const { Content } = Layout;

const History = () => {
  const [userID, setUserID] = useState<string>("");
  const [userNaverID, setUserNaverID] = useState<string>("");
  const [userName, setUserName] = useState<string>("");
  const { ssid } = useContext(AuthContext);
  const [paid, setPaid] = useState<{ [key: string]: any }[]>();
  const [unpaid, setUnpaid] = useState<{ [key: string]: any }[]>();
  const [messageApi, contextHolder] = message.useMessage();

  const isCardExpired = (card: any) => {
    const registered = dayjs(card.registerdate);
    const now = dayjs();
    const expirationDays = card.order_id ? 30 : 45;
    return now.diff(registered, "day") > expirationDays;
  };
  
  const updateCards = async () => {
    const recentCardId = localStorage.getItem("recentCard");
    if (recentCardId && userID?.length) {
      await setUserApi(userID, recentCardId);
    }
  
    if (userID?.length) {
      getMyCards(userID)
        .then((data: any[]) => {
          const valid = data.filter((card) => !isCardExpired(card));
          setPaid(valid.filter((card) => card.order_id));
          setUnpaid(valid.filter((card) => !card.order_id));
        })
        .catch(() => {
          messageApi.error("제작 내역을 가져오는데 실패했습니다.");
        });
    }
  };

  useEffect(() => {
    updateCards();
  }, [userID]);

  useEffect(() => {
    const tokenVal = ssid as JwtPayload;

    if (tokenVal) {
      const { username, email, userid } = tokenVal;
      setUserID(userid);
      setUserNaverID(email.split("@")[0]);
      setUserName(username);
    }
  }, [ssid]);

  return (
    <Layout style={{ backgroundColor: "white" }}>
      {contextHolder}
      <BackHeadedr />
      <Content style={{ padding: 20 }}>
        <div style={{ padding: 20, textAlign: "center" }}>
          {userName}({userNaverID}) 고객님
        </div>
        <Space direction="vertical">
          {paid ? <Bought list={paid} /> : <Spin />}
          {unpaid ? <Producing list={unpaid} /> : <Spin />}
        </Space>
      </Content>
    </Layout>
  );
};

export default History;
