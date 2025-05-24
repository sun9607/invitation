import { Flex, Switch } from "antd";
import { useFormContext } from "react-hook-form";

interface FormOnOffProps {
  name: string;
  label: string;
}

const FormOnOff = (props: FormOnOffProps) => {
  const { name, label } = props;

  const { setValue, watch } = useFormContext();

  const handleChange = (checked: boolean) => {
    setValue(name, checked);
  };

  const checked = watch(name, true);

  return (
    <Flex justify="space-between" style={{ marginBottom: 10 }}>
      <div>{label}</div>
      <Switch checked={checked} onChange={handleChange} />
    </Flex>
  );
};

export default FormOnOff;
