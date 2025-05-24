import { Col, Image, Row } from "antd";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import ThumbItem from "./ThumbItem";

const GalleryThumb = () => {
  const { watch } = useFormContext();
  const files = watch("gallery.files", []);
  const prevent = watch("prevent", false);

  const [selected, setSelected] = useState<string>("");

  useEffect(() => {
    if (files.length) {
      setSelected(files[0].url);
    }
  }, [files]);

  return (
    <>
      <Image
        width={"100%"}
        src={selected}
        preview={!prevent}
        style={{ marginBottom: 10 }}
      />
      <Row gutter={10}>
        {files.map((elem: { [key: string]: any }, idx: number) => (
          <Col span={6} key={idx} style={{ paddingBottom: 10 }}>
            <ThumbItem
              url={elem.url}
              isSelected={selected === elem.url}
              setSelected={setSelected}
            />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default GalleryThumb;
