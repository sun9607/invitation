import { Radio, RadioChangeEvent } from "antd";
import { useFormContext } from "react-hook-form";
import Elem from "./Elem";
import data from "@/assets/produce/data.json";

const ColorRadioGroup = () => {
  const { colors } = data;

  const { setValue } = useFormContext();
  const handleChange = (e: RadioChangeEvent) => {
    setValue("themeColor", e.target.value);
  };

  return (
    <Radio.Group onChange={handleChange}>
      {colors.map((color: string) => (
        <Elem color={color} key={color} />
      ))}
    </Radio.Group>
  );
};

export default ColorRadioGroup;
