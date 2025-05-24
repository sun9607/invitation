import { Button } from "antd";

interface Props {
  setOpen: (param: boolean) => void;
}

const OpenModalButton = (props: Props) => {
  const { setOpen } = props;
  const handleClick = () => {
    setOpen(true);
  };

  return <Button onClick={handleClick}>형태보기</Button>;
};

export default OpenModalButton;
