import { cardState } from "@/recoil/produce";
import { Watermark } from "antd";
import Image from "next/image";
import { useRecoilValue } from "recoil";

interface Props {
  src: string;
  style?: { [key: string]: any };
  onClick?: () => void;
}

const Img = (props: Props) => {
  const { src, style, onClick } = props;
  const { orderId } = useRecoilValue(cardState);

  return (
    <div style={{ ...style, width: "100%" }} onClick={onClick}>
      <Watermark
        image={orderId ? undefined : "/static/logo/logo.svg"}
        style={style}
      >
        <Image
          layout="responsive"
          src={src.replace("localhost", "127.0.0.1")}
          alt="Gallery Image"
          width={100}
          height={100}
          // unoptimized
        />
      </Watermark>
    </div>
  );
};

export default Img;
