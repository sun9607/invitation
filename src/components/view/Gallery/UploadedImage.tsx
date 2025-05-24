import { fetchFileApi } from "@/api/imageApi";
import { Image } from "antd";
import { AxiosResponse } from "axios";
import { useEffect, useState } from "react";

interface UploadedImageProps {
  url: string;
}

const UploadedImage = (props: UploadedImageProps) => {
  const { url } = props;
  const [src, setSrc] = useState<string>("");

  useEffect(() => {
    if (url) {
      setSrc(url);
    }
    // console.log(url);
    // url &&
    //   fetchFileApi(url).then((response: AxiosResponse) => {
    //     const blob = new Blob([response.data], {
    //       type: response.headers["content-type"],
    //     });
    //     const imageUrl = URL.createObjectURL(blob);
    //     setSrc(imageUrl);
    //   });
  }, [url]);

  return <Image width={"100%"} src={src} preview={false} />;
};

export default UploadedImage;
