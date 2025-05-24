import { Layout } from "antd";
import { ReactNode, useEffect, useState } from "react";

interface DesktopAdjustProps {
  children?: ReactNode | ReactNode[];
}

const DesktopAdjust = (props: DesktopAdjustProps) => {
  const { children } = props;
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [padding, setPadding] = useState<string | undefined>();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    // setPadding(isMobile ? undefined : "0px 33%");
  }, [isMobile]);

  return (
    <Layout style={{ width: "min(500px, 100vw)", margin: "0 auto", backgroundColor: "white" }}>
      {children}
    </Layout>
  );
};

export default DesktopAdjust;
