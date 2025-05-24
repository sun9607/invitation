import Description from "@/components/list/Description";
import ItemList from "@/containers/list/ItemList";
import AuthContext from "@/context/AuthContext";
import CustomLayout from "@/layout/CustomLayout";
import { AuthPageProps } from "@/types/types";
import { getSSIDValue } from "@/util/auth";
import { Anchor } from "antd";
import { RecoilRoot } from "recoil";

const IndexPage = (props: AuthPageProps) => {
  const { ssid } = props;
  console.log(ssid);

  const items = [
    {
      key: "special",
      href: "#special",
      title: "Special Day",
    },
    {
      key: "photo",
      href: "#photo",
      title: "Photo Message",
    },
    {
      key: "love",
      href: "#love",
      title: (
        <span style={{ color: "#999" }}>
          고백<small>(연애편지)</small>
        </span>
      ),
    },
    {
      key: "history",
      href: "/history",
      title: "제작내역",
    },
  ];

  return (
    <RecoilRoot>
      <AuthContext.Provider value={{ ssid }}>
        <CustomLayout menu="home">
          <Anchor
            style={{
              maxWidth: "100vw",
              paddingTop: 20,
              paddingLeft: 20,
              paddingRight: 20,
              backgroundColor: "white",
            }}
            direction="horizontal"
            items={items}
          />
          <Description />
          <ItemList />
        </CustomLayout>
      </AuthContext.Provider>
    </RecoilRoot>
  );
};

export const getServerSideProps = async (context: any) => {
  const { req } = context;
  const ssid = getSSIDValue(req);

  return {
    props: { ssid },
  };
};

export default IndexPage;
