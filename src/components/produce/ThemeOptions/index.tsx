import { useFormContext } from "react-hook-form";
import Field from "../Field";
import { Checkbox, Flex } from "antd";

const ThemeOptions = () => {
  const { watch, setValue } = useFormContext();
  const handlePreventYn = (e: any) => {
    setValue("prevent", e.target.checked);
  };

  const handleScrollYn = (e: any) => {
    setValue("scroll", e.target.checked);
  };

  return (
    <Field label="옵션">
      <Flex vertical style={{ width: "100%" }}>
        <Checkbox onChange={handlePreventYn} checked={watch("prevent")}>
          화면확대방지
        </Checkbox>
        {/* <Checkbox onChange={handleScrollYn} checked={watch("scroll")}>
          스크롤시 등장 효과
        </Checkbox> */}
      </Flex>
    </Field>
  );
};

export default ThemeOptions;
