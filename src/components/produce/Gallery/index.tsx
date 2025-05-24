import { useFormContext } from "react-hook-form";
import { FormTextArea, InputGroup } from "..";
import ImageMultiUploader from "../ImageMultiUploader";
import GalleryDesignSelector from "./GalleryDesignSelector";
import { Divider } from "antd";
import GalleryPreview from "@/components/preview/GalleryPreview";

const Gallery = () => {
  const { watch, setValue, getValues } = useFormContext();

  const handleOnOffChange = (checked: boolean) => {
    setValue(`gallery.useYn`, checked);
  };

  const onoff = watch(`gallery.useYn`);
  const type = watch("gallery.type");

  const handleRemove = (url: string) => {
    const curr = getValues("gallery.files");
    setValue(
      "gallery.files",
      curr.filter((file: any) => file.url !== url)
    );
  };

  return (
    <InputGroup
      label={`사진첩`}
      onoff
      onoffChange={handleOnOffChange}
      checked={onoff}
    >
      {onoff && (
        <>
          <GalleryDesignSelector />
          <FormTextArea
            name="gallery.title"
            placeholder="사진첩 위에 글을 적어주세요. 예시 샘플 참조"
          />
          <div style={{ display: 'flex', justifyContent: 'center', gap: 10 }}>

            <ImageMultiUploader
              name={`gallery.files`}
              label="여러장 올리기"
              maximum={25}
              onRemove={handleRemove}
            />
            {/* <ImageMultiUploader
              name={`gallery.files`}
              label="여러장 한번에 올리기"
              maximum={25}
              onRemove={handleRemove}
            /> */}
          </div>
          <div style={{ display: 'block', width: 'fit-content', margin: 'auto', marginTop: 16 }}>
            최대 25장까지 사진을 게시할 수 있어요
          </div>
          {type && (
            <>
              <Divider plain>미리보기</Divider>
              <GalleryPreview />
            </>
          )}
        </>
      )}
    </InputGroup>
  );
};

export default Gallery;
