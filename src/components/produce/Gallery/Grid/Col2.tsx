import { Flex } from "antd";
import ImageCropUploader from "../../ImageCropUploader";

const Col2 = () => {
  return (
    <Flex vertical>
      <ImageCropUploader
        name="gallery.squareFiles"
        label="4장 업로드 하세요"
        maximum={4}
      />
      <ImageCropUploader
        name="gallery.rectFiles"
        label="4장 업로드 하세요"
        aspect={3 / 4}
        maximum={4}
      />
    </Flex>
  );
};

export default Col2;
