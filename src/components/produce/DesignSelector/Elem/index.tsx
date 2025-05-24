import { Col, Flex } from "antd";
import { useFormContext } from "react-hook-form";

interface ElemProps {
  value: number;
  route: string;
  name: string;
  cover_name: string;
  span: number;
  extension: string;
  trigger?: () => void;
}

const Elem = (props: ElemProps) => {
  const { value, route, name, span, extension, cover_name, trigger } = props;
  const { watch, setValue } = useFormContext();
  const selectedVal = watch(name);

  const onClick = () => {
    setValue(name, value);
    if (trigger) trigger();
  };

  return (
    <Col span={span} style={{ paddingBottom: 10 }}>
      <Flex vertical>
        <div
          onClick={onClick}
          style={{
            border: `2px solid ${selectedVal === value ? "#f19a79" : "#ccc"}`,
            borderRadius: 8,
            padding: 4,
            overflow: "hidden",
          }}
        >
          <img
            style={{
              width: "100%",
              borderRadius: 8,
              overflow: "hidden",
            }}
            src={`${route}${value}.${extension}`}
          />
          {name === "coverDesign" && (
            <div style={{ width: "100%", textAlign: "center", fontSize: "min(12px, 2.5vw)", }}>{cover_name}</div>
          )}
        </div>
      </Flex>
    </Col>
  );
};

export default Elem;
