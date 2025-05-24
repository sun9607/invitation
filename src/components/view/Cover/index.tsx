import { cardState } from "@/recoil/produce";
import { useRecoilValue } from "recoil";

interface CoverProps {
  where: "start" | "end";
}

const Cover = (props: CoverProps) => {
  const { where } = props;
  const card = useRecoilValue(cardState);

  return (
    <div
      style={{
        width: "100%",
        position: "relative",
      }}
    >
      {where === "start" && (
        <div
          style={{
            paddingTop: 20,
            paddingBottom: 10,
            paddingLeft: 10,
          }}
        >
          {card?.yourName}
        </div>
      )}
      <img
        src={`/static/cover/${card?.menu}/cover${card.cover}.png`}
        style={{
          width: "100%",
          position: "relative",
        }}
      />
      {where === "end" && (
        <div
          style={{
            paddingTop: 10,
            paddingBottom: 20,
            paddingLeft: 10,
          }}
        >
          {card?.myName}
        </div>
      )}
    </div>
  );
};

export default Cover;
