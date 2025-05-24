import { Button } from "antd";
import KakaoLogo from "../KakaoLogo";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { cardState } from "@/recoil/produce";

declare global {
  interface Window {
    Kakao: any;
  }
}

const KakaoButton = () => {
  const [card] = useRecoilState(cardState);

  const share = () => {
    const { myName } = card;
    console.log(window.Kakao);
    window.Kakao.Share.sendDefault({
      objectType: "feed",
      content: {
        title: `${myName}(으)로부터 편지가 도착했습니다.`,
        description: "마음을 전합니다.",
        imageUrl: "https://heliumgas.kr/static/intro/og_image02.png",
        link: {
          mobileWebUrl: window.location.href,
          webUrl: window.location.href,
        },
      },
      buttons: [
        {
          title: "웹으로 보기",
          link: {
            mobileWebUrl: window.location.href,
            webUrl: window.location.href,
          },
        },
      ],
    });
  };

  useEffect(() => {
    const loadKakaoSDK = () => {
      const script = document.createElement("script");
      script.src = "https://t1.kakaocdn.net/kakao_js_sdk/2.7.2/kakao.min.js";
      script.integrity =
        "sha384-TiCUE00h649CAMonG018J2ujOgDKW/kVWlChEuu4jK2vxfAAD0eZxzCKakxg55G4";
      script.crossOrigin = "anonymous";
      script.async = true;
      script.onload = () => {
        if (!window.Kakao.isInitialized()) {
          window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_KEY);
        }
      };
      document.body.appendChild(script);
    };

    if (!window.Kakao) {
      loadKakaoSDK();
    } else if (!window.Kakao.isInitialized()) {
      window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_KEY);
    }
  }, []);

  return (
    <Button type="text" icon={<KakaoLogo />} onClick={share}>
      카카오톡 공유하기
    </Button>
  );
};

export default KakaoButton;
