import { fileUploadApi } from "@/api/imageApi";
import { LoadingOutlined, UploadOutlined } from "@ant-design/icons";
import { Button, Spin, Upload, UploadFile, message } from "antd";
import { nanoid } from "nanoid";
import { useRef, useState } from "react";
import { useFormContext } from "react-hook-form";

const VideoUploader = () => {
  const { setValue, watch } = useFormContext();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [duration, setDuration] = useState<number | undefined>();
  const [loading, setLoading] = useState<boolean>(false);
  const fileList = watch("video.files");

  const getVideoDuration = (file: File): Promise<number> => {
    return new Promise((resolve) => {
      const video = document.createElement("video");
      video.preload = "metadata";

      video.onloadedmetadata = () => {
        window.URL.revokeObjectURL(video.src);
        resolve(video.duration);
      };

      video.src = URL.createObjectURL(file);
    });
  };

  const isVideoFile = (file: File) => {
    const validExtensions = ["mp4", "webm", "ogg", "mov"];
    const fileExtension = file.name.split(".").pop()?.toLocaleLowerCase();
    return (
      file.type.startsWith("video/") ||
      validExtensions.includes(fileExtension || "")
    );
  };

  const beforeUpload = async (file: File) => {
    setLoading(true);
    if (!isVideoFile(file)) {
      message.error("영상 파일만 업로드 가능합니다");
      setLoading(false);
      return Upload.LIST_IGNORE;
    }
    const duration = await getVideoDuration(file);
    if (duration && duration > 20) {
      message.error("영상은 20초 이하로 올려주세요");
      setLoading(false);
      return Upload.LIST_IGNORE;
    }
    fileUploadApi(file).then((data) => {
      setLoading(false);
      setValue("video.files", [
        {
          uid: nanoid(),
          name: file.name,
          url: `${process.env.NEXT_PUBLIC_API_ROOT}${data.data.file_url}`,
          originFileObj: file,
        },
      ]);
    });
  };

  const handleRemove = (file: UploadFile) => {
    setValue("video.files", []);
  };

  return (
    <>
      {loading ? (
        <Spin indicator={<LoadingOutlined style={{ fontSize: 30 }} spin />} />
      ) : (
        <Upload
          beforeUpload={beforeUpload}
          onRemove={handleRemove}
          maxCount={1}
          fileList={fileList}
        >
          <Button icon={<UploadOutlined />}>영상파일 업로드</Button>
        </Upload>
      )}

      <video ref={videoRef} style={{ display: "none" }} controls />
      {/* <ul>
        <li>
          동영상은 모바일로 촬영한 영상 또는 유튜브 주소로도 업로드 할 수
          있어요.
        </li>
        <li>
          모바일에서 촬영한 영상 업로드(4k 지원불가) 20초 이내의 영상만
          가능해요.
        </li>
        <li>
          유튜브 영상 링크 업로드 하시면 길이 제한 없이 영상을 보낼 수 있어요.
          <br />
          (유튜브 영상은 비공개 하시면 노출되지 않아요.)
          <br />
          (이번 기회에 나도 유튜브 도전!!)
        </li>
      </ul> */}
    </>
  );
};

export default VideoUploader;
