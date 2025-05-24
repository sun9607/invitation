import "@/assets/fonts/ThemeFont.scss";
import data from "@/assets/produce/data.json";
import FormSelector from "../FormSelector";
import { useFormContext } from "react-hook-form";
import { toCapitalize } from "@/util/functions";

const FontSizeSelector = () => {
  const { watch } = useFormContext();

  const fontsize = watch("theme.fontSize");

  return (
    <FormSelector
      options={data.fontSize}
      name="theme.fontSize"
      placeholder="글씨 크기"
      className={"font" + toCapitalize(fontsize || "")}
    />
  );
};

export default FontSizeSelector;
