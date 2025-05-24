import { CoverDesignSelector, InputGroup } from "@/components/produce";
import FieldInput from "@/components/produce/FieldInput";

const Cover = () => {
  return (
    <InputGroup label="Cover Design">
      <p>디자인을 선택해 주세요.</p>
      <CoverDesignSelector />
      <FieldInput
        placeholder="받는분을 작성하세요"
        name="yourName"
      />
      <FieldInput
        placeholder="보내는분을 작성하세요"
        name="myName"
        detail={`본인 이름란에 적힌 내용으로 카카오톡\n또는 문자가 발송됩니다.`}
      />
    </InputGroup>
  );
};

export default Cover;
