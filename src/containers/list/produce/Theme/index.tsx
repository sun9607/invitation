import {
  Field,
  FontSelector,
  FormColorPicker,
  InputGroup,
  ThemeOptions,
} from "@/components/produce";
import { Flex } from "antd";
import data from "@/assets/produce/data.json";

// ✅ 폰트 매핑 테이블 (value → 실제 font-family 이름)
const fontMap: Record<string, string> = {
  pretendard: "'Pretendard-Regular'",
  TTBookendBatangR: "'TTBookendBatangR'",
  KimjungchulScript: "'KimjungchulScript'",
  BMYEONSUNG: "'BMYEONSUNG'",
  HakgyoansimGaeulsopungB: "'HakgyoansimGaeulsopungB'",
};

// ✅ 가공된 옵션: label에 style.fontFamily 적용
const fontOptions = data.themeFonts.map(({ label, value }) => ({
  label: <span style={{ fontFamily: fontMap[value] || "inherit" }}>{label}</span>,
  value,
}));

const Theme = () => {
  return (
    <InputGroup label="테마 선택">
      <Field label="글꼴">
        <Flex vertical style={{ width: "100%" }}>
          <FontSelector
            name="theme.fontFamily"
            style={{
              width: "100%",
              marginBottom: 10,
            }}
            placeholder="글꼴"
            options={fontOptions}
            defaultValue="pretendard"
          />
          {/* <FontSelector
            name="theme.fontSize"
            placeholder="글씨 크기"
            options={data.fontSize}
          /> */}
        </Flex>
      </Field>
      <ThemeOptions />
      <Field label="color">
        <FormColorPicker />
      </Field>
    </InputGroup>
  );
};

export default Theme;
