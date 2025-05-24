import { Flex } from "antd";
import Field from "../Field";
import FontSelector from "../FontSelector";
import data from "@/assets/produce/data.json";
import LetterDesignSelector from "./LetterDesignSelector";
import FormTextArea from "../FormTextArea";

const FONT_MAP: Record<string, string> = {
  eunhasu: "'TTHakgyoansimEunhasuR'",
  redWhale: "'redWhale'",
  KCCBangJeonghwan: "'KCCBangJeonghwan'",
  GamjaFlower: "'GamjaFlower'",
  YanoljaYacheR: "'YanoljaYacheR'",
};

const styledFontOptions = data.letterFonts.map(({ label, value }) => ({
  value,
  label: <span style={{ fontFamily: FONT_MAP[value] || "inherit" }}>{label}</span>,
}));

const LetterForm = () => {
  return (
    <>
      <Field label="글꼴">
        <Flex vertical style={{ width: "100%" }}>
          <FontSelector
            options={styledFontOptions}
            name="letter.fontFamily"
            placeholder="글씨체"
            style={{ marginBottom: 10 }}
          />
        </Flex>
      </Field>
      <p>편지지 디자인을 선택해 주세요.</p>
      <LetterDesignSelector />
      <FormTextArea name="letter.text" rows={3} maxLength={300} />
    </>
  );
};

export default LetterForm;
