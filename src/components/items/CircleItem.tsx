import { ReactNode } from "react";
import styled from "styled-components";

interface CircleItemProps {
  children: ReactNode | ReactNode[];
}

const Item = styled.li`
  margin-bottom: 0.5em;

  &::before {
    content: "•"; /* 동그라미 기호(unicode) */
    color: #000; /* 동그라미 색상 */
    display: inline-block;
    width: 1em; /* 동그라미 기호 크기 */
    margin-left: -1em; /* 왼쪽으로 이동하여 동그라미와 텍스트 간격 유지 */
    font-size: 1.2em; /* 동그라미 크기 조절 */
    font-weight: bold; /* 폰트 굵기 조절 */
    text-align: center; /* 동그라미 가운데 정렬 */
    margin-right: 0.5em; /* 동그라미와 텍스트 간격 조절 */
    counter-increment: list-counter; /* 카운터 증가 */
  }
`;

const CircleItem = (props: CircleItemProps) => {
  const { children } = props;

  return <Item>{children}</Item>;
};

export default CircleItem;
