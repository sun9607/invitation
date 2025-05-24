import { useFormContext } from "react-hook-form";
import { FormTextArea, InputGroup } from "..";
import PhotoCropUploader from "../PhotoCropUploader";
import { Divider } from "antd";
import PhotoCardPreview from "@/components/preview/PhotoCardPreview";

const PhotoCard = () => {
  const { watch, setValue, getValues } = useFormContext();

  const handleRemove = (url: string) => {
    const curr = getValues("gallery.files");
    setValue(
      "gallery.files",
      curr.filter((file: any) => file.url !== url)
    );
  };

  return (
    <InputGroup
      label={`photo message`}
    >
      <PhotoCardPreview />
      <Divider plain></Divider>
      <div style={{ display: 'flex', justifyContent: 'center', gap: 10 }}>

        <PhotoCropUploader
          name={`gallery.files`}
          label="와이드 포토"
          maximum={30}
          onRemove={handleRemove}
        />
      </div>
      <div style={{width: "100%", textAlign: "center", marginTop: 10 }}>최대 30장까지 게시할 수 있어요</div>
    </InputGroup>
  );
};

export default PhotoCard;
