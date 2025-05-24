import { Flex } from "antd";
import ImageCropUploader from "../../ImageCropUploader";

const Col3 = () => {
  return (
    <Flex vertical>
      <ImageCropUploader
        name={`gallery.squareFiles`}
        label="6장 업로드 하세요"
        maximum={6}
      />
      <ImageCropUploader
        name="gallery.rectFiles"
        label="6장 업로드 하세요"
        aspect={3 / 4}
        maximum={6}
      />
    </Flex>
  );
};

export default Col3;
