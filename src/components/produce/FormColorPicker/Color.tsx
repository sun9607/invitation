import { Radio } from "antd";
import { ReactNode } from "react";
import styled from "styled-components";

interface ColorProps {
  color: string;
  children?: ReactNode | ReactNode[];
}

const Color = (props: ColorProps) => {
  const { color, children } = props;

  const CustomRadio = styled(Radio)`
    .ant-radio-inner {
      background-color: ${color};
    }
  `;

  return <CustomRadio value={color}>{children}</CustomRadio>;
};

export default Color;
