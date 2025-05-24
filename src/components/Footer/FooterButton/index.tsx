import { Button } from "antd";
import { ReactNode } from "react";

interface FooterButtonProps {
  onClick?: () => void;
  children: string | ReactNode;
}

const FooterButton = (props: FooterButtonProps) => {
  const { onClick, children } = props;

  return (
    <Button type="text" size="small" onClick={onClick} style={{ fontSize: 11 }}>
      {children}
    </Button>
  );
};

export default FooterButton;
