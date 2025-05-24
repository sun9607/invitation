import { menuState } from "@/recoil/menu";
import { useRecoilValue } from "recoil";
import DesignSelector from "../DesignSelector";

const CoverDesignSelector = () => {
  const menu = useRecoilValue(menuState);

  return (
    <DesignSelector
      // numOptions={menu === "special" ? 4 : 3}
      numOptions={12}
      name="coverDesign"
      route={`/static/cover/image/cover`}
      extension="png"
    />
  );
};

export default CoverDesignSelector;
