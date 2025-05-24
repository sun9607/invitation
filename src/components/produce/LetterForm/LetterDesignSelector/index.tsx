import { useRecoilValue } from "recoil";
import DesignSelector from "../../DesignSelector";
import { menuState } from "@/recoil/menu";

const LetterDesignSelector = () => {
  const menu = useRecoilValue(menuState);

  return (
    <DesignSelector
      numOptions={8}
      name="letterDesign"
      route={`/static/letter/${menu}/letter`}
      extension="png"
    />
  );
};

export default LetterDesignSelector;
