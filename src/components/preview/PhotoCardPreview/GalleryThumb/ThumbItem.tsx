import { Image } from "antd";

interface Props {
  url: string;
  isSelected: boolean;
  setSelected: (param: string) => void;
}

const ThumbItem = (props: Props) => {
  const { url, isSelected, setSelected } = props;

  const handleClick = () => {
    setSelected(url);
  };

  return (
    <Image
      width="100%"
      style={{ border: isSelected ? "2px solid white" : undefined }}
      src={url}
      onClick={handleClick}
      preview={false}
    />
  );
};

export default ThumbItem;
