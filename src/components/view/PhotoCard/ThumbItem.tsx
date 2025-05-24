import Img from "../common/Img";

interface ThumbItemProps {
  url: string;
  isSelected: boolean;
  setSelected: (url: string) => void;
}

const ThumbItem = (props: ThumbItemProps) => {
  const { url, isSelected, setSelected } = props;

  const handleClick = () => {
    setSelected(url);
  };

  return (
    <Img
      src={url}
      style={{ border: isSelected ? "2px solid white" : undefined }}
      onClick={handleClick}
    />
  );
};

export default ThumbItem;
