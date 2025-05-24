import { PartTitle } from "@/components/view/common";
import { Col, Row, Image } from "antd";
import { useFormContext } from "react-hook-form";
import GalleryThumb from "./GalleryThumb";
import "@/assets/fonts/ThemeFont.scss";

const GalleryPreview = () => {
  const { watch } = useFormContext();
  const type = watch("gallery.type");
  const title = watch("gallery.title");
  const files = watch("gallery.files", []);
  const prevent = watch("prevent", false);
  const fontSize = watch("theme.fontSize");
  const fontFamily = watch("theme.fontFamily");

  return (
    <div className={`${fontSize} ${fontFamily}`} style={{ width: "100%" }}>
      {title && <PartTitle text={title} />}
      {type === 1 && (
        <Row gutter={10}>
          {files.map((file: { [key: string]: any }, idx: number) => (
            <Col span={8} key={idx} style={{ paddingBottom: 10 }}>
              <Image
                src={file.url}
                preview={!prevent}
                style={{ width: "100%" }}
              />
            </Col>
          ))}
        </Row>
      )}
      {type === 2 && (
        <Row gutter={10}>
          {files.map((file: { [key: string]: any }, idx: number) => (
            <Col span={12} key={idx} style={{ paddingBottom: 10 }}>
              <Image
                src={file.url}
                style={{ width: "100%" }}
                preview={!prevent}
              />
            </Col>
          ))}
        </Row>
      )}
      {type === 3 && <GalleryThumb />}
    </div>
  );
};

export default GalleryPreview;
