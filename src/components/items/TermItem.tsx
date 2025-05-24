import { ReactNode } from "react";

interface TermItemProps {
  idx: number;
  title: string;
  children: ReactNode | ReactNode[];
}

const TermItem = (props: TermItemProps) => {
  const { idx, title, children } = props;

  return (
    <div style={{ paddingTop: 20 }}>
      <h4>
        제 {idx}조({title})
      </h4>
      {children}
    </div>
  );
};

export default TermItem;
