import { Option } from "@/types/types";
import { Button, Col, Row } from "antd";
import { useFormContext } from "react-hook-form";

interface GridRadioGroupProps {
  options: Option[];
  colWidth?: number;
  name: string;
}

const GridRadioGroup = (props: GridRadioGroupProps) => {
  const { options, colWidth = 6, name } = props;

  const { setValue, watch } = useFormContext();
  const value = watch(name, options[0].value);

  return (
    <Row gutter={5}>
      {options.map((option: Option) => (
        <Col span={colWidth} key={option.value} style={{ marginBottom: 10 }}>
          <Button
            size="small"
            block
            type={value === option.value ? "primary" : undefined}
            onClick={() => {
              setValue(name, option.value);
            }}
            style={{ fontSize: 11 }}
          >
            {option.label}
          </Button>
        </Col>
      ))}
    </Row>
  );
};

export default GridRadioGroup;
