import { PartTitle } from "@/components/view/common";
import { Image, Input, Button } from "antd";
import { useFormContext } from "react-hook-form";
import { DeleteOutlined } from "@ant-design/icons";
import "@/assets/fonts/ThemeFont.scss";

const PhotoCardPreview = () => {
  const { watch, setValue, getValues } = useFormContext();
  const title = watch("gallery.title");
  const files = watch("gallery.files", []);
  const prevent = watch("prevent", false);
  const fontSize = watch("theme.fontSize");
  const fontFamily = watch("theme.fontFamily");

  const handleTextChange = (idx: number, value: string) => {
    const newFiles = [...getValues("gallery.files")];
    newFiles[idx].name = value;
    setValue("gallery.files", newFiles);
  };

  const handleDelete = (idx: number) => {
    const newFiles = [...getValues("gallery.files")];
    newFiles.splice(idx, 1);
    setValue("gallery.files", newFiles);
  };

  return (
    <div className={`${fontSize} ${fontFamily}`} style={{ width: "100%" }}>
      {title && <PartTitle text={title} />}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 16,
          alignItems: "center",
        }}
      >
        {files.map((file: { [key: string]: any }, idx: number) => (
          <>
            <div
              key={idx}
              style={{
                width: "100%",
                maxWidth: 360,
                margin: "0 auto",
                padding: 10,
                border: "1px solid #ccc",
                borderRadius: 5,
                overflow: "hidden",
                background: "white",
                boxShadow: "0 2px 4px rgba(0,0,0,0.06)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 10,
              }}
            >
              {/* 이미지 */}
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <Image
                  src={file.url}
                  alt="preview"
                  preview={!prevent}
                  style={{ width: "100%", height: "auto", objectFit: "cover" }}
                />
              </div>

              {/* 텍스트 표시 */}
              <div
                style={{
                  width: "100%",
                  textAlign: "center",
                  color: "#222",
                  backgroundColor: "#fff",
                  whiteSpace: "pre-line",
                  minHeight: 40,
                }}
              >
                {file.name || (
                  <span style={{ color: "#aaa" }}></span>
                )}
              </div>

            </div>
            {/* TextArea + Delete Button */}
            <div
              style={{
                width: "87%",
                display: "flex",
                gap: 8,
                alignItems: "center",
              }}
            >
              <Input.TextArea
                rows={2}
                placeholder="여기에 메시지를 입력하세요"
                value={file.name || ""}
                onChange={(e) => handleTextChange(idx, e.target.value)}
                style={{
                  flex: 1,
                  backgroundColor: "#fafafa",
                }}
              />
              <Button
                icon={<DeleteOutlined />}
                danger
                onClick={() => handleDelete(idx)}
              />
            </div>
          </>
        ))}
      </div>
    </div >
  );
};

export default PhotoCardPreview;
