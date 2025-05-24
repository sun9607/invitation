import { Radio } from "antd";
import styled from "styled-components";

interface ElemProps {
  color: string;
}

const Elem = (props: ElemProps) => {
  const { color } = props;

  const CustomRadio = styled(Radio)`
        .ant-radio-input {
            background-color: ${color}

            &:checked {
                background-color: ${color}
            }
        }

        .ant-radio-inner::after {
            background-color: white;
        }
    `;

  return <CustomRadio value={color} />;
};

export default Elem;
