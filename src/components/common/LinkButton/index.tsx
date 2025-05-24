import { Button } from "antd";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";

interface LinkButtonProps {
  href: string;
  type?: "primary" | "link" | "text" | "default" | "dashed";
  children?: ReactNode | ReactNode[];
}

const LinkButton = (props: LinkButtonProps) => {
  const { href, type = "default", children } = props;
  const router = useRouter();

  const handleClick = () => {
    router.push(href);
  };

  return (
    <Button type={type} onClick={handleClick}>
      {children}
    </Button>
  );
};

export default LinkButton;
