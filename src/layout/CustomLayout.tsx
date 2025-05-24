import { ConfigProvider, Layout } from "antd";
import { ReactNode, useEffect, useState } from "react";
import MenuHeader from "./Header/MenuHeader";
import Footer from "@/components/Footer";
import { useSetRecoilState } from "recoil";
import { menuState } from "@/recoil/menu";
import { MenuType } from "@/types/types";
import DesktopAdjust from "./DesktopAdjust";

interface CustomLayoutProps {
  header?: boolean;
  subheader?: ReactNode;
  children: ReactNode | ReactNode[];
  menu: MenuType;
}

const { Content } = Layout;

const CustomLayout = (props: CustomLayoutProps) => {
  const { header = true, children, subheader, menu } = props;
  const setMenu = useSetRecoilState(menuState);

  useEffect(() => {
    setMenu(menu);
  }, []);

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#f19a79",
        },
      }}
    >
      <DesktopAdjust>
        {header && <MenuHeader />}
        <Content style={{ paddingTop: 10, width: "100%" }}>{children}</Content>
        <Footer />
      </DesktopAdjust>
    </ConfigProvider>
  );
};

export default CustomLayout;
