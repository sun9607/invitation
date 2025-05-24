import { cardState } from "@/recoil/produce";
import { Col, Row } from "antd";
import { useRecoilValue } from "recoil";
import GalleryThumb from "./GalleryThumb";
import { useEffect, useRef, useState } from "react";
import { PartTitle } from "../common";
import Img from "../common/Img";

const Gallery = () => {
  const { gallery, prevent, scroll, orderId } = useRecoilValue(cardState);
  const [opacity, setOpacity] = useState<number>(0);
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

  useEffect(() => {
    console.log(gallery);
  }, [gallery]);

  return (
    <div
      ref={revealRef}
      style={{
        width: "100%",
        opacity: scroll ? opacity : 1,
        transition: "opacity 1s",
      }}
    >
      {gallery && <PartTitle text={gallery.title} />}
      {gallery?.type === 1 && (
        <Row gutter={10}>
          {gallery?.files.map(
            (file: { [key: string]: string }, idx: number) => (
              <Col span={8} key={idx} style={{ paddingBottom: 10 }}>
                <Img src={file.photo} />
              </Col>
            )
          )}
        </Row>
      )}
      {gallery?.type === 2 && (
        <Row gutter={10}>
          {gallery?.files.map(
            (file: { [key: string]: string }, idx: number) => (
              <Col span={12} key={idx} style={{ paddingBottom: 10 }}>
                <Img src={file.photo} />
              </Col>
            )
          )}
        </Row>
      )}
      {gallery?.type === 3 && <GalleryThumb list={gallery.files} />}
    </div>
  );
};

export default Gallery;
