import { FRAME_HEIGHT, FRAME_WIDTH } from "@/common/constants";
import { cardState } from "@/recoil/produce";
import { useEffect, useRef, useState } from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import data from "@/assets/produce/data.json";
import { Frame } from "@/types/types";
import { drawFrame, drawImage } from "@/util/canvas";

const CanvasLayer = styled.canvas`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
`;

const ImageFrame = () => {
  const card = useRecoilValue(cardState);
  const [frameData, setFrameData] = useState<Frame | null>(null);
  const [opacity, setOpacity] = useState<number>(0);

  const hiddenRef = useRef<HTMLImageElement>(null);
  const frameRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLCanvasElement>(null);
  const revealRef = useRef<HTMLDivElement>(null);

  const { scroll } = useRecoilValue(cardState);

  interface TemplateMap {
    special: {
      classic: Frame[];
      moment: Frame[];
    };
    photo: Frame[];
  }

  const templates = data.templates as TemplateMap;

  useEffect(() => {
    if (card?.intro) {
      const { layout } = card.intro;

      // drawFrame(`${card.menu}/${card.intro.introType}`, layout, frameRef);
      drawFrame(`special/${card.intro.introType}`, layout, frameRef);
    }
  }, [card, frameRef.current]);

  useEffect(() => {
    if (card?.intro) {
      const { layout } = card.intro;
      const rawIntroType = card.intro?.introType;
      const introType = rawIntroType === "classic" ? "classic" : "moment";

      console.log("🎯 적용될 introType:", introType);
      console.log("🎯 layout index:", layout);

      // if (card.menu === "photo") {
      //   setFrameData(templates.photo[layout - 1] || null);
      // } else if (card.menu === "special") {
      //   setFrameData(templates.special[introType][layout - 1] || null);
      // }
      setFrameData(templates.special[introType][layout - 1] || null);
    }
  }, [card]);

  useEffect(() => {
    if (card?.intro && frameData) {
      drawImage(imageRef, hiddenRef, frameData, card.intro.image);
    }
  }, [frameData, hiddenRef.current, imageRef.current, card]);

  useEffect(() => {
    const revealElement = revealRef.current;
    if (!revealElement) return;

    const options = {
      threshold: 0.5,
    };

    const observer = new IntersectionObserver((entries: any[]) => {
      entries.forEach((entry: any) => {
        if (entry.isIntersecting) {
          setOpacity(1);
          observer.unobserve(revealElement);
        }
      });
    }, options);

    observer.observe(revealElement);

    return () => {
      observer.disconnect();
    };
  }, [revealRef.current]);

  return (
    <div
      style={{
        width: "100%",
        position: "relative",
        height: "auto",
        aspectRatio: FRAME_WIDTH / FRAME_HEIGHT,
        opacity: scroll ? opacity : 1,
        transition: "opacity 1s",
      }}
      ref={revealRef}
    >
      <CanvasLayer
        width={FRAME_WIDTH}
        height={FRAME_HEIGHT}
        style={{ zIndex: 2 }}
        ref={frameRef}
      />
      <img
        ref={hiddenRef}
        style={{ display: "none" }}
        src={card.intro?.image}
      />
      <CanvasLayer width={FRAME_WIDTH} height={FRAME_HEIGHT} ref={imageRef} />
    </div>
  );
};

export default ImageFrame;
