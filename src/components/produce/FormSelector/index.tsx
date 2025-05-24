import { Option, OptionVal } from "@/types/types";
import { Select } from "antd";
import { useFormContext } from "react-hook-form";

interface FormSelectorProps {
  options: Option[];
  name: string;
  defaultValue?: OptionVal;
  placeholder?: string;
  style?: { [key: string]: any };
  className?: string;
}

const FormSelector = (props: FormSelectorProps) => {
  const { options, name, defaultValue, placeholder, style, className } = props;

  const { setValue, watch } = useFormContext();

  const handleSelect = (value: OptionVal) => {
    setValue(name, value);
  };

  const value = watch(name);

  return (
    <Select
      defaultValue={defaultValue}
      placeholder={placeholder}
      options={options}
      onChange={handleSelect}
      style={{ ...style }}
      value={value}
      className={className}
    />
  );
};

export default FormSelector;
