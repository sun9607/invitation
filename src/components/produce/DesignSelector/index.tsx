import { Row } from "antd";
import Elem from "./Elem";

interface DesignSelectorProps {
  numOptions: number;
  name: string;
  route: string;
  extension: string;
  trigger?: () => void;
}

const DesignSelector = (props: DesignSelectorProps) => {
  const { numOptions, name, route, extension, trigger } = props;
  const arr = new Array(numOptions).fill(0);

  const cover_name = [
    "감사합니다",
    "birthday",
    "love",
    "설레임",
    "곰신",
    "바이바이",
    "스승의날",
    "어버이날",
    "이별",
    "성탄절",
    "행운의 편지",
    "흔들린우정",
  ]

  return (
    <Row
      gutter={16}
      style={{
        marginBottom: 20,
      }}
    >
      {arr.map((_: any, i: number) => (
        <Elem
          value={i + 1}
          key={i}
          name={name}
          span={Math.max(24 / numOptions, 6)}
          route={route}
          extension={extension}
          trigger={trigger}
          cover_name={name === "coverDesign" ? cover_name[i] : ""}
        />
      ))}
    </Row>
  );
};

export default DesignSelector;
