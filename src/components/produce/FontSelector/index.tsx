import { Option, OptionVal } from "@/types/types";
import { useFormContext } from "react-hook-form";
import FormSelector from "../FormSelector";
import { toCapitalize } from "@/util/functions";
import "@/assets/fonts/ThemeFont.scss";

interface Props {
  name: string;
  options: Option[];
  style?: { [key: string]: any };
  placeholder?: string;
  defaultValue?: OptionVal;
}

const FontSelector = (props: Props) => {
  const { name, options, style, placeholder, defaultValue } = props;
  const { watch } = useFormContext();
  const value = watch(name);

  return (
    <FormSelector
      options={options}
      name={name}
      style={style}
      placeholder={placeholder}
      defaultValue={defaultValue}
      className={
        name.includes("Size") ? "font" + toCapitalize(value || "") : value
      }
    />
  );
};

export default FontSelector;
