import { cardState } from "@/recoil/produce";
import { Carousel } from "antd";
import { useRecoilValue } from "recoil";
import UploadedImage from "./UploadedImage";

const GallerySlide = () => {
  const { gallery } = useRecoilValue(cardState);

  return (
    <Carousel autoplay>
      {gallery?.url.map((url: string) => (
        <UploadedImage url={url} key={url} />
      ))}
    </Carousel>
  );
};

export default GallerySlide;
