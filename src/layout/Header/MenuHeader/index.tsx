import NaverButton from "@/components/naver/NaverButton";
import AuthContext from "@/context/AuthContext";
import { Button, Flex, Layout } from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ReactNode, useContext } from "react";

const { Header } = Layout;

interface MenuHeaderProps {
  subHeader?: ReactNode;
}

const MenuHeader = (props: MenuHeaderProps) => {
  const { ssid } = useContext(AuthContext);
  const router = useRouter();

  const handleLogout = async () => {
    router.push("/auth/logout");
  };

  return (
    <Header
      style={{ backgroundColor: "white", paddingLeft: 0, paddingRight: 10 }}
    >
      <Flex justify="space-between" align="center">
        <Link href="/">
          <div
            style={{
              width: 120,
              height: 60,
              marginTop: 10,
              backgroundPosition: "left center",
              backgroundImage: "url(/static/logo/logo.svg)",
              backgroundSize: 120,
            }}
          />
        </Link>
        {ssid && ssid !== "" ? (
          <Button onClick={handleLogout}>로그아웃</Button>
        ) : (
          <NaverButton block={false} />
        )}
      </Flex>
    </Header>
  );
};

export default MenuHeader;
