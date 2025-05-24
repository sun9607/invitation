import { createContext } from "react";

interface ContextType {
  design: number;
  text: string;
  font: string;
  setDesign: (param: number) => void;
  setText: (param: string) => void;
  setFont: (param: string) => void;
}

const LetterContext = createContext({
  design: 1,
  text: "",
  font: "singleDay",
} as ContextType);

export default LetterContext;
