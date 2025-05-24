import {
  DesignSelector,
  Field,
  FormTextArea,
  GridRadioGroup,
  ImageCropUploader,
  InputGroup,
  Particle,
} from "@/components/produce";
import data from "@/assets/produce/data.json";
import { useRecoilValue } from "recoil";
import { menuState } from "@/recoil/menu";
import { useFormContext } from "react-hook-form";
import { Frame } from "@/types/types";
import { useEffect, useState } from "react";
import { Divider, Radio } from "antd";
import { IntroPreview } from "@/components/preview";

const Intro = () => {
  const menu = useRecoilValue(menuState);
  const { watch, setValue } = useFormContext();
  const [frame, setFrame] = useState<Frame | null>(null);
  const [setValueUsed, setSetValueUsed] = useState<boolean>(false);

  // ✅ 추가
  const [introType, setIntroType] = useState<"classic" | "moment">("classic");
  const [tempIntroType, setTempIntroType] = useState<"classic" | "moment">("classic"); // ✅ 추가

  // 🔥 폼에서 초기 introType 가져오기
  useEffect(() => {
    const savedIntroType = watch("intro.introType") as "classic" | "moment" | undefined;
    console.log("저장된 인트로 타입 : " + savedIntroType)
    if (savedIntroType) {
      setIntroType(savedIntroType);
      setTempIntroType(savedIntroType);
    }
  }, []);

  useEffect(() => {
    setValue("intro.introType", introType); // ✅ form 상태 반영
  }, [introType]);

  const intro = watch("intro.layout");
  const color = watch("theme.color");

  interface TemplateMap {
    special: {
      classic: Frame[];
      moment: Frame[];
    };
    photo: Frame[];
  }

  const templates = data.templates as TemplateMap;

  useEffect(() => {

    // if (menu === "photo") {
    //   setFrame(templates.photo[intro - 1] || null);
    // } else if (menu === "special") {
    //   setFrame(templates.special[introType][intro - 1] || null);
    // }
    setFrame(templates.special[introType][intro - 1] || null);
  }, [menu, intro]);

  useEffect(() => {
    if (setValueUsed) {
      setIntroType(tempIntroType); // ✅ temp를 진짜로 복사
      // setValue("intro.image", []);
      setSetValueUsed(false);
      setValue("intro.introType", tempIntroType); // ✅ 바로 form 상태에 반영!
    }
  }, [intro]); // intro 바뀔 때만!

  const imageVal = watch("intro.image");
  useEffect(() => {
    console.log(imageVal);
  }, [imageVal]);

  return (
    <InputGroup label="인트로">
      {/* {menu === "special" && ( */}
      <Radio.Group
        value={tempIntroType}
        onChange={(e) => setTempIntroType(e.target.value)}
        style={{ display: 'flex', width: 'fit-content', margin: 'auto', gap: 10, marginBottom: 16 }}
      >
        <Radio.Button style={{ width: '100px', display: 'flex', justifyContent: 'center', border: '1px solid', borderRadius: '5px' }} value="classic">classic</Radio.Button>
        <Radio.Button
          className="no-before" style={{ width: '100px', display: 'flex', justifyContent: 'center', border: '1px solid', borderRadius: '5px' }} value="moment">moment</Radio.Button>
      </Radio.Group>
      {/* )} */}

      <style jsx>{`
        :global(.no-before::before) {
          display: none !important;
        }
      `}</style>

      <DesignSelector
        numOptions={
          // menu === "photo"
          //   ? 7
          //   : 16
          12
        }
        name="intro.layout"
        route={
          // menu === "photo"
          //   ? `/static/intro/photo/intro`
          //   : `/static/intro/special/${introType}/intro`
          `/static/intro/special/${tempIntroType}/intro`
        }
        extension="png"
        trigger={() => setSetValueUsed(true)}
      />
      <div style={{ width: "100%", textAlign: "center", marginBottom: 10 }}>액자 변경시 사진을 확인해주세요</div>
      {frame && (
        <div style={{ width: "fit-content", margin: "auto" }}>
          <ImageCropUploader
            name="intro.image"
            maximum={1}
            aspect={frame.height ? (frame.width || 1) / frame.height : 1}
            label={"사진 업로드 또는 삭제"}
          />
        </div>
      )}
      {/* {(menu === "special" || menu === "photo") && (
        <FormTextArea
          placeholder="인트로 사진 아래에 글이 게시됩니다."
          name="intro.foot"
        />
      )} */}
      {intro && color && (
        <>
          <Divider plain>미리보기</Divider>
          <IntroPreview introType={introType} />
        </>
      )}
      <FormTextArea
        placeholder="인트로 사진 위에 글이 게시됩니다."
        name="intro.head"
      />
      <Particle />
    </InputGroup>
  );
};

export default Intro;