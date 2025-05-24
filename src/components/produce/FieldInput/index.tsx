import { Input } from "antd";
import { useFormContext } from "react-hook-form";

interface FieldInputProps {
  placeholder?: string;
  name: string;
  detail?: string;
}

const FieldInput = (props: FieldInputProps) => {
  const { placeholder, name, detail } = props;

  const { setValue, watch } = useFormContext();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(name, e.target.value);
  };

  const value = watch(name);

  return (
    <div style={{ marginBottom: 20 }}>
      <Input
        placeholder={placeholder}
        allowClear
        onChange={handleChange}
        value={value}
      />
      {detail && <p style={{ marginTop: 10, color: "#f19a79", whiteSpace: "pre-line" }}>{detail}</p>}
    </div>
  );
};

export default FieldInput;
