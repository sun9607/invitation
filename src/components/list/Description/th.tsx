import { ReactNode } from "react";

interface DescriptionTHProps {
  children: ReactNode | ReactNode[];
}

const DescriptionTH = (props: DescriptionTHProps) => {
  const { children } = props;

  return (
    <th>
      <b style={{ color: "black", boxShadow: "inset 0 -20px 0 #feefc5" }}>
        {children}
      </b>
    </th>
  );
};

export default DescriptionTH;
