import { getPremiumApi } from "@/api/cardApi";
import CardView from "@/containers/CardView";
import DesktopAdjust from "@/layout/DesktopAdjust";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { RecoilRoot } from "recoil";

const CardPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [cardId, setCardId] = useState<string>();

  useEffect(() => {
    if (id) {
      getPremiumApi(id as unknown as number).then(
        (data: { [key: string]: any }) => {
          setCardId(data.data);
        }
      );
    }
  }, [id]);

  return (
    <RecoilRoot>
      <DesktopAdjust>{cardId && <CardView id={cardId} />}</DesktopAdjust>
    </RecoilRoot>
  );
};

export default CardPage;
