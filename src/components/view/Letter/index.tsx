import { cardState } from "@/recoil/produce";
import { useRecoilValue } from "recoil";
import "@/assets/fonts/LetterFont.scss";
import { useEffect, useRef, useState } from "react";

const Letter = () => {
  const card = useRecoilValue(cardState);
  const { letter } = card;
  const [lines, setLines] = useState<string[]>([]);
  const [opacity, setOpacity] = useState<number>(0);
  const revealRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    letter && setLines(letter.text.split(/(?:\r\n|\r|\n)/g));
  }, [letter]);

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
      className={letter?.font_family}
      ref={revealRef}
      style={{
        width: "300px",
        margin: "auto",
        position: "relative",
        backgroundImage: `url(/static/letter/${card?.menu}/letter${letter?.design}.png)`,
        // backgroundImage: `url(/static/letter/special/test1.png)`,
        backgroundSize: "contain",
        backgroundPosition: "center",
        aspectRatio: 375 / 300,
        // aspectRatio: 1,
        opacity: card?.scroll ? opacity : 1,
        transition: "opacity 1s",
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
              // fontSize: "clamp(14px, 3vw, 18px)",
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

export default Letter;
