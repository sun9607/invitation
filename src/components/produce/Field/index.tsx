import { Flex, Space } from "antd";
import { ReactNode } from "react";

interface FieldProps {
  label: string;
  children: ReactNode | ReactNode[];
}

const Field = (props: FieldProps) => {
  const { label, children } = props;

  return (
    <Flex style={{ marginBottom: 20, paddingTop: 10 }}>
      <div style={{ width: 80 }}>{label}</div>
      {children}
    </Flex>
  );
};

export default Field;
