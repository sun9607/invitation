import { getCardApi } from "@/api/cardApi";
import { Cover, Gallery, PhotoCard, Intro, Video } from "@/components/view";
import EndWatermark from "@/components/view/watermark/EndWatermark";
import { cardState } from "@/recoil/produce";
import { useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player";
import { useRecoilState } from "recoil";
import musicData from "@/assets/music/data.json";
import { Button, Flex, Image, message } from "antd";
import Letter from "@/components/view/Letter";
import CardDivider from "@/components/view/CardDivider";
import { LinkOutlined, MutedOutlined, SoundOutlined } from "@ant-design/icons";
import { linkCopy } from "@/util/functions";
import KakaoButton from "@/components/kakao/KakaoButton";
import Head from "next/head";
import { useRouter } from "next/router";

interface CardViewProps {
  id: string;
}

const CardView = (props: CardViewProps) => {
  const { id } = props;
  const [card, setCard] = useRecoilState(cardState);
  const [messageApi, contextHolder] = message.useMessage();
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [showNames, setShowNames] = useState(false);

  const router = useRouter();

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const animationRef = useRef<number | null>(null);
  const hasScrolled = useRef(false);
  const hasEnded = useRef(false);

  const togglePlaying = () => {
    setIsPlaying(!isPlaying);
  };

  const handleCopy = () => {
    const { myName } = card;
    linkCopy(myName, messageApi);
  };

  const lockScroll = () => {
    // document.body.style.overflow = "hidden";
  };

  const unlockScroll = () => {
    document.body.style.overflow = "";
  };

  const SCROLL_SPEED = 0.083;
  const scrollToBottomSteady = () => {
    const step = () => {
      const delta = 16.67;
      const distance = delta * SCROLL_SPEED;
      const newScroll = window.scrollY + distance;
      const maxScroll = document.body.scrollHeight - window.innerHeight;
      if (newScroll < maxScroll) {
        window.scrollTo(0, newScroll);
        animationRef.current = requestAnimationFrame(step);
      } else {
        window.scrollTo(0, maxScroll);
        unlockScroll();
      }
    };
    animationRef.current = requestAnimationFrame(step);
  };

  const cancelAutoScroll = () => {
    const scrolled = window.scrollY !== 0;
    if (!hasScrolled.current && (hasEnded.current || scrolled)) {
      hasScrolled.current = true;
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      unlockScroll();
    }
  };

  const handleVideoEnd = () => {
    hasEnded.current = true;
    if (!hasScrolled.current) {
      setIsPlaying(true);
      scrollToBottomSteady();
    }
  };

  useEffect(() => {
    lockScroll();

    let startY = 0;
    let moved = false;

    const handleTouchStart = (e: TouchEvent) => {
      startY = e.touches[0].clientY;
      moved = false;
    };

    const handleTouchMove = (e: TouchEvent) => {
      const deltaY = e.touches[0].clientY - startY;
      if (Math.abs(deltaY) > 10 && !moved) {
        moved = true;
        cancelAutoScroll(); // ✅ 드래그 감지 시에만 실행
      }
    };

    const handleWheel = () => {
      cancelAutoScroll(); // ✅ 데스크탑 휠 감지
    };

    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("wheel", handleWheel, { passive: true }); // ✅ 추가
    router.events.on("routeChangeStart", unlockScroll);

    return () => {
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("wheel", handleWheel); // ✅ 해제도 반드시
      router.events.off("routeChangeStart", unlockScroll);
    };
  }, []);


  useEffect(() => {
    if (id) {
      getCardApi(id as string).then((data: { [key: string]: any }) => {
        setCard(data.data);
      });
    }
  }, [id]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowNames(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={card?.theme?.fontFamily} style={{ width: "100%", padding: 20, fontSize: 18 }}>
      {card?.scroll && (
        <Head>
          <meta name="viewport" content="width=device-width, initial=scale=1.0, maximum-scale=1.0, user-scalable=no" />
        </Head>
      )}

      <Flex style={{ position: "fixed", top: 17, left: "50%", width: "min(200px, calc(50vw - 50px))", zIndex: 50 }} justify="flex-end">
        <Button
          type="text"
          icon={isPlaying ? <SoundOutlined /> : <MutedOutlined />}
          onClick={togglePlaying} />
      </Flex>

      {contextHolder}

      <div className={card?.theme?.fontSize} style={{ backgroundColor: card?.color || "white" }}>
        <section id="cover-video">
          {/* <video
            ref={videoRef}
            src={
              typeof window !== "undefined" && /iPad|iPhone|iPod/.test(navigator.userAgent)
                ? `/static/cover/video/cover${card.cover}.mov`
                : `/static/cover/video/cover${card.cover}.webm`
            }
            autoPlay
            muted
            playsInline
            onEnded={handleVideoEnd}
            style={{ width: "100%", objectFit: "cover", display: "block", marginBottom: "-50%" }}
          /> */}
          <img
            src={`/static/cover/video/cover${card.cover}.gif`}
            alt="cover animation"
            style={{ width: "100%", objectFit: "contain", display: "block", marginBottom: "-50%" }}
            onLoad={() => {
              // gif 길이가 약 4초라고 가정
              setTimeout(() => {
                handleVideoEnd();
              }, 4000); // ⏱ 재생 길이에 맞춰 조정
            }}
          />
        </section>

        <div
          style={{
            position: "relative",
            top: "max(-500px, -100vw)",
            paddingLeft: "min(35px, 7vw)",
            opacity: showNames ? 1 : 0,
            transform: showNames ? "translateY(0)" : "translateY(20px)",
            transition: "all 1.2s ease-out"
          }}
        >
          {card?.yourName}
        </div>

        <div
          style={{
            position: "relative",
            top: "max(-50px, -10vw)",
            textAlign: "right",
            paddingRight: "min(35px, 7vw)",
            opacity: showNames ? 1 : 0,
            transform: showNames ? "translateY(0)" : "translateY(20px)",
            transition: "all 1.2s ease-out"
          }}
        >
          {card?.myName}
        </div>

        {!card?.orderId && <EndWatermark />}

        <>
          <CardDivider />
          <Intro />
        </>

        {!card?.orderId && <Image src="/static/logo/logo.svg" preview={false} />}

        {card?.menu === "special" && card?.gallery?.useYn === 1 && (
          <>
            <CardDivider />
            <Gallery />
          </>
        )}

        {card?.menu === "photo" && (
          <>
            <CardDivider />
            <PhotoCard />
          </>
        )}

        {card?.menu === "special" && card?.video?.use_yn === 1 && (
          <>
            <CardDivider />
            <Video />
          </>
        )}

        {card?.letter?.use_yn === 1 && (
          <>
            <CardDivider />
            <Letter />
          </>
        )}
      </div>

      <Flex style={{ padding: 20 }} vertical justify="center">
        <Button icon={<LinkOutlined />} type="text" onClick={handleCopy}>
          링크 복사하기
        </Button>
        <KakaoButton />
      </Flex>

      {typeof card?.bgm === "number" && card.bgm < 9 && (
        <ReactPlayer
          url={`/static/music/${musicData.bgm[card.bgm].fileName}`}
          playing={isPlaying}
          loop
          volume={0.5}
          style={{ display: "none", width: "100%" }}
        />
      )}
    </div>
  );
};

export default CardView;
