import "@/assets/fonts/ThemeFont.scss";
import data from "@/assets/produce/data.json";
import { useFormContext } from "react-hook-form";
import FormSelector from "../FormSelector";

const FontFamilySelector = () => {
  const { watch } = useFormContext();

  const fontFamily = watch("theme.fontFamily");

  return (
    <FormSelector
      options={data.themeFonts}
      name="theme.fontFamily"
      style={{
        width: "100%",
        marginBottom: 10,
      }}
      placeholder="글꼴"
      className={fontFamily}
    />
  );
};

export default FontFamilySelector;
