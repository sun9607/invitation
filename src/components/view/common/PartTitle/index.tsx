import { cardState } from "@/recoil/produce";
import { useEffect, useRef, useState } from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";

interface PartTitleProps {
  text: string;
}

const Paragraph = styled.div`
  text-align: center;
  word-wrap: break-word;
  width: 100%;
  padding: 5px 0;
`;

const PartTitle = (props: PartTitleProps) => {
  const { text } = props;
  const lines = text.split(/(?:\r\n|\r|\n)/g);
  const [opacity, setOpacity] = useState<number>(0);
  const { scroll } = useRecoilValue(cardState);
  const revealRef = useRef<HTMLDivElement>(null);

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
    <Paragraph
      ref={revealRef}
      style={{ opacity: scroll ? opacity : 1, transition: "opacity 2s" }}
    >
      {lines.map((line: string, idx: number) => (
        <div
          key={idx}
          style={{
            lineHeight: 1.5,
            textAlign: "center",
            width: "100%",
          }}
        >
          {line}
          {idx !== lines.length - 1 && <br />}
        </div>
      ))}
    </Paragraph>
  );
};

export default PartTitle;
