import { Frame } from "@/types/types";
import { toXPercent, toYPercent } from "@/util/canvas";
import { Image } from "antd";

interface ImgProps {
  src: string;
  frame: Frame | null;
}

const Img = (props: ImgProps) => {
  const { src, frame } = props;

  return (
    <div
      style={{
        position: "absolute",
        left: toXPercent(frame?.x || 0),
        top:
          frame && "upperRadius" in frame
            ? toYPercent((frame.upperRadius || 0) + frame.y)
            : toYPercent(frame?.y || 0),
        width: toXPercent(frame?.width || 0),
        height: toYPercent(frame?.height || 0),
      }}
    >
      <Image src={src} width={"100%"} height={"100%"} alt="image" />
    </div>
  );
};

export default Img;
