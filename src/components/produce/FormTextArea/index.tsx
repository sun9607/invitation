import { Input } from "antd";
import React from "react";
import { useFormContext } from "react-hook-form";

interface FormTextAreaProps {
  placeholder?: string;
  name: string;
  rows?: number;
  maxLength?: number;
}

const { TextArea } = Input;

const FormTextArea = (props: FormTextAreaProps) => {
  const { name, placeholder, rows = 3, maxLength = 100 } = props;

  const { setValue, watch } = useFormContext();

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(name, e.target.value);
  };

  const letterType = watch("letterDesign", 1);
  const value = watch(name);

  return (
    <TextArea
      rows={rows}
      placeholder={placeholder || "내용을 입력하세요."}
      onChange={handleChange}
      showCount
      maxLength={maxLength}
      value={value}
      style={{
        marginBottom: 20,
      }}
    />
  );
};

export default FormTextArea;
