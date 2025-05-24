import styled from "styled-components";

export const CircleList = styled.ol`
  list-style-type: none;
  counter-reset: list-counter;
`;

export { default as CircleItem } from "./CircleItem";
export { default as TermItem } from "./TermItem";
