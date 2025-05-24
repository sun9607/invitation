import { Radio, RadioChangeEvent } from "antd";
import { useFormContext } from "react-hook-form";
import Color from "./Color";

const FormColorPicker = () => {
  const { setValue, watch } = useFormContext();

  const onChange = (e: RadioChangeEvent) => {
    setValue("theme.color", e.target.value);
  };

  const value = watch("theme.color");

  return (
    <Radio.Group onChange={onChange} value={value}>
      <Color color="#FCFCFC" />
      <Color color="#FFFEFB" />
      <Color color="#FFF6F4" />
      <Color color="#FDF7FF" />
      <Color color="F8FCFF" />
      <Color color="white">선택 안함</Color>
    </Radio.Group>
  );
};

export default FormColorPicker;
