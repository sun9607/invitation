import Particle from "@/components/view/Intro/Particle";
import { PartTitle } from "@/components/view/common";
import { useFormContext } from "react-hook-form";
import ImageFrame from "./ImageFrame";
import "@/assets/fonts/ThemeFont.scss";

interface IntroPreviewProps {
  introType: "classic" | "moment";
}

const IntroPreview = ({ introType }: IntroPreviewProps) => {
  const { watch } = useFormContext();
  const head = watch("intro.head", "");
  const foot = watch("intro.foot", "");
  const color = watch("theme.color");
  const particleNum = watch("intro.particle", 0);
  const fontSize = watch("theme.fontSize");
  const fontFamily = watch("theme.fontFamily");

  return (
    <div className={`${fontSize} ${fontFamily}`}>
      <PartTitle text={head} />
      <div
        style={{
          width: "100%",
          position: "relative",
          backgroundColor: color,
          padding: "0 10%",
          overflow: "hidden",
        }}
      >
        {/* {particleNum > 0 && <Particle particleNum={particleNum} />} */}
        {/* {particleNum > 0 &&
          <video
            src={`/static/particle/${particleNum}.webm`}
            autoPlay
            loop
            muted
            playsInline
            style={{ width: "100%", minHeight: "100%", position: "absolute", left: 0, top: 0, zIndex: 5 }}
          />
        } */}
        {particleNum > 0 && (
          <img
            src={`/static/particle/${particleNum}.gif`}
            style={{
              width: "100%",
              minHeight: "100%",
              position: "absolute",
              left: 0,
              top: 0,
              zIndex: 5,
              objectFit: "contain",
            }}
          />
        )}
        <ImageFrame introType={introType} />
      </div>
      {/* <PartTitle text={foot} /> */}
    </div>
  );
};

export default IntroPreview;
