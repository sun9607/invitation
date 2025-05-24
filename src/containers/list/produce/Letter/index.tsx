import { useFormContext } from "react-hook-form";
import { InputGroup, LetterForm } from "@/components/produce";
import { Divider } from "antd";
import LetterPreview from "@/components/preview/LetterPreview";
import "@/assets/fonts/LetterFont.scss";
import LetterContext from "@/context/LetterContext";
import { useState } from "react";

const Letter = () => {
  const { watch, setValue } = useFormContext();

  const handleOnOffChange = (checked: boolean) => {
    setValue("letter.useYn", checked);
  };

  const onoff = watch("letter.useYn");
  const letterDesign = watch("letterDesign");
  const fontFamily = watch("letter.fontFamily");

  const [design, setDesign] = useState<number>(1);
  const [text, setText] = useState<string>("");
  const [font, setFont] = useState<string>("bookend");

  return (
    <InputGroup
      label="편지"
      onoff
      onoffChange={handleOnOffChange}
      checked={onoff}
    >
      {onoff && (
        <LetterContext.Provider
          value={{ design, setDesign, text, setText, font, setFont }}
        >
          <LetterForm />
          {letterDesign && fontFamily && (
            <>
              <Divider plain>미리보기</Divider>
              <LetterPreview />
            </>
          )}
        </LetterContext.Provider>
      )}
    </InputGroup>
  );
};

export default Letter;
