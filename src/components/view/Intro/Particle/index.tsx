import { generateRandomNumber } from "@/util/functions";
import { useEffect, useState } from "react";
import "./particle.scss";

interface Flake {
  left: number;
  fallDelay: number;
  shakeDelay: number;
  blur: number;
  opacity: number;
  size: number;
  src: string;
}

interface ParticleProps {
  particleNum: number;
}

const Particle = (props: ParticleProps) => {
  const [blossom, setBlossom] = useState<Flake[]>([]);
  const { particleNum } = props;

  useEffect(() => {
    const newBlossoms = Array.from({ length: 9 }).map(() => {
      const fallDelay = generateRandomNumber(0, 15, { fixed: 2 });
      const shakeDelay = Math.min(
        generateRandomNumber(0, 10, { fixed: 1 }),
        Number.parseFloat((fallDelay - 0.07).toFixed(1))
      );

      const idx = generateRandomNumber(1, 3);

      return {
        left: generateRandomNumber(0, 100),
        fallDelay,
        shakeDelay,
        blur: generateRandomNumber(0.2, 0.5, { fixed: 1 }),
        opacity: generateRandomNumber(0.55, 0.95, { fixed: 2 }),
        size: generateRandomNumber(1, 3),
        src: `/static/particle/particle${particleNum}/type${idx}.png`,
      };
    });
    setBlossom(newBlossoms);
  }, [particleNum]);

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        position: "absolute",
        left: 0,
        top: 0,
      }}
    >
      <div className="blossom" aria-hidden="true">
        {blossom.map((petal: Flake, index) => (
          <div
            key={`blossom-${index}`}
            className="petal"
            style={{
              left: `${petal.left}%`,
              filter: `blur(${petal.blur}px)`,
              animationDelay: `${petal.fallDelay}s`,
              WebkitAnimationDelay: `${petal.fallDelay}s`,
            }}
          >
            <img src={petal.src} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Particle;
