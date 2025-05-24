import { cardState } from "@/recoil/produce";
import { useRecoilValue } from "recoil";
import { useEffect, useRef, useState } from "react";
import { PartTitle } from "../common";
import Img from "../common/Img";

const PhotoCard = () => {
  const { gallery, prevent, scroll, theme } = useRecoilValue(cardState);
  const [opacity, setOpacity] = useState<number>(0);
  const revealRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = revealRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setOpacity(1);
          observer.unobserve(el);
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(el);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={revealRef}
      className={`${theme?.fontFamily} ${theme?.fontSize}`}
      style={{
        width: "100%",
        opacity: scroll ? opacity : 1,
        transition: "opacity 1s",
      }}
    >
      {gallery?.title && <PartTitle text={gallery.title} />}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 32,
          alignItems: "center",
        }}
      >
        {gallery?.files?.map(
          (
            file: {
              photo: string;
              text?: string;
              name?: string; // fallback if text not present
            },
            idx: number
          ) => (
            <div
              key={idx}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                width: "100%",
                maxWidth: 360,
                margin: "0 auto",
                padding: 10,
                border: "1px solid #ccc",
                borderRadius: 5,
                overflow: "hidden",
                background: "white",
                boxShadow: "0 2px 4px rgba(0,0,0,0.06)",
              }}
            >
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <Img
                  src={file.photo}
                  style={{
                    width: "100%",
                    height: "auto",
                    objectFit: "cover",
                  }}
                />
              </div>
              <div
                style={{
                  width: "100%",
                  textAlign: "center",
                  padding: "12px 8px",
                  color: "#222",
                  backgroundColor: "#fff",
                  minHeight: 40,
                  whiteSpace: "pre-line",
                }}
              >
                {file.text || file.name || (
                  <span style={{ color: "#aaa" }}></span>
                )}
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default PhotoCard;
