import { fileUploadApi } from "@/api/imageApi";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { Upload, UploadFile, message } from "antd";
import ImgCrop from "antd-img-crop";
import { nanoid } from "nanoid";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import Image from "next/image";
import type { RcFile } from "antd/es/upload";

interface ImageMultiUploaderProps {
  name: string;
  label: string;
  maximum: number;
  onChange?: () => void;
  onRemove?: (url: string) => void;
}

const cropToSquare = async (file: File): Promise<File> => {
  return new Promise((resolve, reject) => {
    if (typeof window === "undefined") return reject(new Error("Client-side only"));

    const img = new window.Image();
    const reader = new FileReader();

    reader.onload = () => (img.src = reader.result as string);
    img.onload = () => {
      const size = Math.min(img.width, img.height);
      const offsetX = (img.width - size) / 2;
      const offsetY = (img.height - size) / 2;

      const canvas = document.createElement("canvas");
      canvas.width = size;
      canvas.height = size;

      const ctx = canvas.getContext("2d");
      ctx?.drawImage(img, offsetX, offsetY, size, size, 0, 0, size, size);

      canvas.toBlob((blob) => {
        if (!blob) return reject(new Error("Crop failed"));
        const cropped = new File([blob], file.name, {
          type: file.type,
          lastModified: Date.now(),
        });
        resolve(cropped);
      }, file.type);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

const ImageMultiUploader = ({ name, label, maximum, onChange, onRemove }: ImageMultiUploaderProps) => {
  const { watch, setValue } = useFormContext();
  const fileList: UploadFile[] = watch(name, []) || [];
  const [loading, setLoading] = useState(false);

  const handleFiles = async (files: File[]) => {
    setLoading(true);
    const newEntries: UploadFile[] = [];

    for (const file of files) {
      if (!file.type.startsWith("image/")) {
        message.error("이미지 파일만 업로드 가능합니다.");
        continue;
      }

      if (file.size > 10 * 1024 ** 2) {
        message.error("10MB 까지만 업로드 가능합니다.");
        continue;
      }

      const cropped = await cropToSquare(file);
      const url =
        process.env.NEXT_PUBLIC_RUN_MODE === "local"
          ? URL.createObjectURL(cropped)
          : `${process.env.NEXT_PUBLIC_API_ROOT}${(await fileUploadApi(cropped)).data.file_url
          }`;

      newEntries.push({
        uid: nanoid(),
        name: cropped.name,
        url,
        originFileObj: cropped as RcFile,
      });
    }

    setLoading(false);
    const merged = [...fileList, ...newEntries].slice(0, maximum);
    setValue(name, merged);
  };

  const handleUploadChange = (info: any) => {
    const existingKeys = new Set(fileList.map((f) => `${f.name}_${(f.originFileObj as File)?.size}`));
    const newFiles: File[] = info.fileList
      .map((f: any) => f.originFileObj)
      .filter((f: File) => f && !existingKeys.has(`${f.name}_${f.size}`));

    if (newFiles.length > 0) handleFiles(newFiles);
  };

  const handleRemove = (file: UploadFile) => {
    const newList = fileList.filter((f) => f.url !== file.url);
    setValue(name, newList);
    if (file.url && onRemove) onRemove(file.url);
    return false;
  };

  useEffect(() => {
    if (onChange && fileList.length) onChange();
  }, [fileList]);

  const renderUploaderButton = (label: string, isLoading = false) => (
    <div
      style={{
        width: 140,
        height: 30,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        border: "1px dashed #d9d9d9",
        borderRadius: 6,
        cursor: "pointer",
      }}
    >
      {isLoading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ fontSize: 12, marginLeft: 4 }}>{label}</div>
    </div>
  );

  return (
    <div className="space-y-4" style={{ width: "100%" }}>
      {/* 상단 썸네일 리스트 */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "8px",
          overflowX: "auto",
          paddingTop: "0.5rem",
          paddingBottom: "0.5rem",
        }}
      >
        {fileList.map((file) => (
          <div
            key={file.uid}
            onClick={() => handleRemove(file)}
            title="클릭하면 삭제됩니다"
            style={{
              position: "relative",
              width: "75px",
              height: "75px",
              borderRadius: "6px",
              overflow: "hidden",
              flexShrink: 0,
              cursor: "pointer",
              transition: "opacity 0.2s ease",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLDivElement).style.opacity = "0.6";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLDivElement).style.opacity = "1";
            }}
          >
            <Image
              src={file.url || ""}
              alt="preview"
              width={96}
              height={96}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </div>
        ))}
      </div>
      <div style={{ width: "fit-content", margin: "0 auto 5px" }}>
        이미지를 누르시면 삭제됩니다.
      </div>
      {/* 하단 버튼 영역 */}
      <div style={{ display: "flex", width: 'fit-contetn', justifyContent: 'center', gap: "10px" }}>
        {/* ▶ 한 장 업로드 */}
        <ImgCrop aspect={1}>
          <Upload
            accept="image/*"
            maxCount={1}
            showUploadList={false}
            beforeUpload={(file) => {
              handleFiles([file]);
              return false;
            }}
            customRequest={({ onSuccess }) => setTimeout(() => onSuccess?.("ok"), 0)}
          >
            {fileList.length >= maximum ? null : renderUploaderButton("한 장 올리기", loading)}
          </Upload>
        </ImgCrop>

        {/* 📂 여러 장 업로드 */}
        <Upload
          multiple
          showUploadList={false}
          customRequest={({ file, onSuccess }) => {
            setTimeout(() => onSuccess?.("ok"), 0);
          }}
          onChange={handleUploadChange}
          onRemove={handleRemove}
          fileList={fileList}
        >
          {fileList.length >= maximum ? null : renderUploaderButton("여러장 올리기", loading)}
        </Upload>
      </div>
    </div>
  );
};

export default ImageMultiUploader;
