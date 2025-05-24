import { menuState } from "@/recoil/menu";
import { useContext, useEffect, useRef, useState } from "react";
import { useFormContext } from "react-hook-form";
import { useRecoilValue } from "recoil";

const LetterPreview = () => {
  const menu = useRecoilValue(menuState);
  const { watch } = useFormContext();
  const text = watch("letter.text");
  const fontFamily = watch("letter.fontFamily");
  const letterDesign = watch("letterDesign");

  const [lines, setLines] = useState<string[]>([]);

  useEffect(() => {
    text && setLines(text.split(/(?:\r\n|\r|\n)/g));
  }, [text]);

  return (
    <div
      className={`${fontFamily}`}
      style={{
        width: "300px",
        margin: "auto",
        position: "relative",
        backgroundImage: `url(/static/letter/${menu}/letter${letterDesign}.png)`,
        // backgroundImage: `url(/static/letter/special/test1.png)`,
        backgroundSize: "contain",
        backgroundPosition: "center",
        aspectRatio: 375 / 300,
        // aspectRatio: 1,
      }}
    >
      <div
        style={{
          width: "85%",
          position: "absolute",
          // top: "12%",
          top: "50%",
          left: "7%",
          maxHeight: "78%",
          maxWidth: "90%",
          overflow: "hidden",
          transform: "translateY(-50%)",
        }}
      >
        {lines.map((line: string, idx: number) => (
          <div
            key={idx}
            style={{
              lineHeight: 1.3,
              textAlign: "center",
              width: "100%",
              fontSize: "large",
              overflow: "hidden",
            }}
          >
            {line}
            {idx !== lines.length - 1 && <br />}
          </div>
        ))}
      </div>
    </div>
  );
};

export default LetterPreview;
