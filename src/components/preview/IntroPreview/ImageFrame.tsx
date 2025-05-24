import { menuState } from "@/recoil/menu";
import { Frame } from "@/types/types";
import { drawFrame, drawImage } from "@/util/canvas";
import { useState, useRef, useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import data from "@/assets/produce/data.json";
import { FRAME_WIDTH, FRAME_HEIGHT } from "@/common/constants";

const CanvasLayer = styled.canvas`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
`;


interface ImageFrameProps {
  introType: "classic" | "moment";
}

interface TemplateMap {
  special: {
    classic: Frame[];
    moment: Frame[];
  };
  photo: Frame[];
}

const templates = data.templates as TemplateMap;

const ImageFrame = ({ introType }: ImageFrameProps) => {
  const [frameData, setFrameData] = useState<Frame | null>(null);

  const hiddenRef = useRef<HTMLImageElement>(null);
  const frameRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLCanvasElement>(null);

  const { watch } = useFormContext();
  const files = watch("intro.image");
  const layout = watch("intro.layout");
  const menu = useRecoilValue(menuState);

  useEffect(() => {
    // if (menu === "photo") {
    //   drawFrame(menu, layout, frameRef);
    // } else {
    //   drawFrame(`${menu}/${introType}`, layout, frameRef);
    // }
    const timer = setTimeout(() => {
      drawFrame(`special/${introType}`, layout, frameRef);
    }, 50); // ✅ 딜레이

    return () => clearTimeout(timer); // ✅ clean-up
  }, [menu, layout, frameRef, introType]);

  useEffect(() => {
    // if (menu === "photo") {
    //   setFrameData(templates.photo[layout - 1] || null);
    // } else if (menu === "special") {
    //   setFrameData(templates.special[introType][layout - 1] || null);
    // }

    setFrameData(templates.special[introType][layout - 1] || null);
  }, [layout, menu, introType]);

  useEffect(() => {
    if (frameData) {
      const timer = setTimeout(() => {
        drawImage(imageRef, hiddenRef, frameData, files[0]?.url || "");
      }, 50); // ✅ 딜레이
  
      return () => clearTimeout(timer); // ✅ clean-up
    }
  }, [frameData, hiddenRef.current, imageRef.current, files]);

  return (
    <div
      style={{
        width: "100%",
        position: "relative",
        height: "auto",
        aspectRatio: FRAME_WIDTH / FRAME_HEIGHT,
      }}
    >
      <CanvasLayer
        width={FRAME_WIDTH}
        height={FRAME_HEIGHT}
        style={{ zIndex: 2 }}
        ref={frameRef}
      />
      {files.length > 0 && (
        <>
          <img ref={hiddenRef} style={{ display: "none" }} src={files[0].url} />
          <CanvasLayer
            width={FRAME_WIDTH}
            height={FRAME_HEIGHT}
            ref={imageRef}
          />
        </>
      )}
    </div>
  );
};

export default ImageFrame;
