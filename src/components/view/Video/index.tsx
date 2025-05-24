import { cardState } from "@/recoil/produce";
import { useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import ReactPlayer from "react-player";
import { useRecoilValue } from "recoil";
import { PartTitle } from "../common";

const Video = () => {
  const card = useRecoilValue(cardState);
  const { video } = card;
  const videoRef = useRef<ReactPlayer>(null);
  const [ref, inView] = useInView({
    triggerOnce: true,
    rootMargin: "0px 0px -100px 0px",
  });

  const [url, setUrl] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (video) {
      setUrl(video.link || video.file);
    }
  }, [video]);

  return (
    <div ref={ref}>
      {video && <PartTitle text={video.title} />}
      <ReactPlayer
        width={"100%"}
        height={"auto"}
        ref={videoRef}
        url={url}
        controls
      />
    </div>
  );
};

export default Video;
