import { Button, Flex } from "antd";
import { ReactNode } from "react";
import { useFormContext } from "react-hook-form";

interface ItemProps {
  title: string;
  children: ReactNode | ReactNode[];
  value: number;
}

const Item = (props: ItemProps) => {
  const { title, children, value } = props;
  const { watch, setValue } = useFormContext();

  const selected = watch("gallery.type");

  const handleSelect = () => {
    setValue("gallery.type", value);
  };

  return (
    <Flex vertical>
      <div
        style={{
          border: `2px solid ${selected === value ? "#f19a79" : "#ccc"}`,
          borderRadius: 8,
          padding: 4,
          overflow: "hidden",
          width: "100%",
        }}
      >
        {children}
      </div>
      <Button block onClick={handleSelect}>
        {title}
      </Button>
    </Flex>
  );
};

export default Item;
