import { Option, OptionVal } from "@/types/types";
import { Radio, RadioChangeEvent } from "antd";
import { useFormContext } from "react-hook-form";

interface RadioButtonsProps {
  options: Option[];
  name: string;
  defaultValue?: OptionVal;
}

const RadioButtons = (props: RadioButtonsProps) => {
  const { options, name, defaultValue } = props;
  const { setValue } = useFormContext();

  const handleChange = (e: RadioChangeEvent) => {
    setValue(name, e.target.value);
  };

  return (
    <Radio.Group
      onChange={handleChange}
      defaultValue={defaultValue}
      size="small"
    >
      {options.map((option: Option) => (
        <Radio.Button value={option.value} key={option.value}>
          {option.label}
        </Radio.Button>
      ))}
    </Radio.Group>
  );
};

export default RadioButtons;
