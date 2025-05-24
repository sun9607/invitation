import { Card, Flex, Space, Switch, Typography } from "antd";
import { ReactNode, useEffect } from "react";

interface InputGroupProps {
  label: string;
  children?: ReactNode | ReactNode[];
  onoff?: boolean;
  onoffChange?: (val: boolean) => void;
  checked?: boolean;
}

const { Title } = Typography;

const InputGroup = (props: InputGroupProps) => {
  const { label, children, onoff = false, onoffChange, checked } = props;

  const handleChange = (checked: boolean) => {
    if (onoffChange) {
      onoffChange(checked);
    }
  };

  return (
    <Card
      title={label}
      extra={
        onoff && (
          <Switch checked={checked || undefined} onChange={handleChange} />
        )
      }
      style={{
        marginBottom: 20,
      }}
    >
      {children}
    </Card>
  );
};

export default InputGroup;
