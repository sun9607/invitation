import { cardState } from "@/recoil/produce";
import { useRecoilValue } from "recoil";
import Frame from "./Frame";
import Particle from "./Particle";
import { PartTitle } from "../common";

const Intro = () => {
  const card = useRecoilValue(cardState);
  const { intro } = card;

  return (
    <>
      {intro && <PartTitle text={intro.head} />}
      <div style={{ width: "100%", position: "relative", overflow: "hidden" }}>
        {/* {intro?.particle > 0 && <Particle particleNum={intro.particle} />} */}
        {/* {intro?.particle > 0 &&
          <video
            src={
              typeof window !== "undefined" && /iPad|iPhone|iPod/.test(navigator.userAgent)
                ? `/static/particle/${intro.particle}.mov`
                : `/static/particle/${intro.particle}.webm`
            }
            autoPlay
            loop
            muted
            playsInline
            style={{ width: "100%", minHeight: "100%", position: "absolute", left: 0, top: 0, zIndex: 5 }}
          />
        } */}
        {intro?.particle > 0 && (
          <img
            src={`/static/particle/${intro.particle}.gif`}
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
        <Frame />
      </div>
      {intro && <PartTitle text={intro.foot} />}
    </>
  );
};

export default Intro;
