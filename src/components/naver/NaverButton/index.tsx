import { Button } from "antd";
import NaverLogo from "../NaverLogo";
import { useRouter } from "next/navigation";

interface NaverButtonProps {
  block?: boolean;
}

const NaverButton = (props: NaverButtonProps) => {
  const { block = true } = props;

  const router = useRouter();

  const onClick = () => {
    router.push(
      `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${process.env.NEXT_PUBLIC_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_API_ROOT}/login/naver&state=code`
    );
  };

  return (
    <Button
      icon={<NaverLogo />}
      block={block}
      size={block ? "large" : "middle"}
      onClick={onClick}
    >
      네이버{block && " 계정으로"}&nbsp;로그인
    </Button>
  );
};

export default NaverButton;
