import { Option } from "@/types/types";
import { Checkbox, GetProp } from "antd";
import { useFormContext } from "react-hook-form";

interface FormCheckboxProps {
  options: Option[];
  name: string;
}

const FormCheckbox = (props: FormCheckboxProps) => {
  const { options, name } = props;

  const { setValue } = useFormContext();

  const onChange: GetProp<typeof Checkbox.Group, "onChange"> = (
    checkedValues
  ) => {
    setValue(name, checkedValues);
  };

  return <Checkbox.Group options={options} onChange={onChange} />;
};

export default FormCheckbox;
