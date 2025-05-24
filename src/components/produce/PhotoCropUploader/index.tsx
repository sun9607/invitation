import { fileUploadApi } from "@/api/imageApi";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { Upload, UploadFile, message, Input } from "antd";
import ImgCrop from "antd-img-crop";
import { nanoid } from "nanoid";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import Image from "next/image";
import type { RcFile } from "antd/es/upload";

interface PhotoCropUploaderProps {
  name: string;
  label: string;
  maximum: number;
  onChange?: () => void;
  onRemove?: (url: string) => void;
}

const cropToAspect = async (file: File, aspect: number): Promise<File> => {
  return new Promise((resolve, reject) => {
    if (typeof window === "undefined") return reject(new Error("Client-side only"));

    const img = new window.Image();
    const reader = new FileReader();

    reader.onload = () => (img.src = reader.result as string);
    img.onload = () => {
      let width = img.width;
      let height = img.height;
      const desiredWidth = width;
      const desiredHeight = width / aspect;

      if (desiredHeight > height) {
        height = height;
        width = height * aspect;
      }

      const offsetX = (img.width - width) / 2;
      const offsetY = (img.height - height) / 2;

      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext("2d");
      ctx?.drawImage(img, offsetX, offsetY, width, height, 0, 0, width, height);

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

const PhotoCropUploader = ({ name, label, maximum, onChange, onRemove }: PhotoCropUploaderProps) => {
  const { watch, setValue } = useFormContext();
  const fileList: UploadFile[] = watch(name, []) || [];
  const [loading, setLoading] = useState(false);

  const handleFiles = async (files: File[], aspect: number) => {
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

      const cropped = await cropToAspect(file, aspect);
      const url =
        process.env.NEXT_PUBLIC_RUN_MODE === "local"
          ? URL.createObjectURL(cropped)
          : `${process.env.NEXT_PUBLIC_API_ROOT}${(await fileUploadApi(cropped)).data.file_url}`;

      newEntries.push({
        uid: nanoid(),
        name: "",
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

    if (newFiles.length > 0) handleFiles(newFiles, 3 / 2);
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

  const renderUploaderBlock = (file: UploadFile, index: number) => (
    <div
      key={file.uid}
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "flex-start",
        width: "100%",
        gap: 12,
        marginBottom: 5,
      }}
    >
      <div
        style={{
          flex: 1,
          position: "relative",
          width: 50,
          height: 50,
          borderRadius: "6px",
          overflow: "hidden",
          cursor: "pointer",
          flexShrink: 0,
        }}
        onClick={() => handleRemove(file)}
        title="클릭하면 삭제됩니다"
        onMouseEnter={(e) => ((e.currentTarget as HTMLDivElement).style.opacity = "0.6")}
        onMouseLeave={(e) => ((e.currentTarget as HTMLDivElement).style.opacity = "1")}
      >
        <Image
          src={file.url || ""}
          alt="preview"
          layout="fill"
          objectFit="cover"
        />
      </div>
      <Input.TextArea
        placeholder="사진과 함께 들어갈 메시지를 입력하세요"
        autoSize={{ minRows: 2, maxRows: 4 }}
        onChange={(e) => {
          const newList = [...fileList];
          newList[index].name = e.target.value;
          setValue(name, newList);
        }}
        value={file.name}
        style={{ flex: 3, height: 50 }}
      />
    </div>
  );

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
      <div
        style={{
          display: "none",
          flexDirection: "column",
          alignItems: "center",
          gap: 5,
          padding: "1rem 0",
        }}
      >
        {fileList.map((file, index) => renderUploaderBlock(file, index))}
      </div>

      <div style={{ display: "flex", justifyContent: "center", gap: "10px", width: "fit-content", margin: "auto" }}>
        <ImgCrop aspect={1}>
          <Upload
            accept="image/*"
            maxCount={1}
            showUploadList={false}
            beforeUpload={(file) => {
              handleFiles([file], 1);
              return false;
            }}
            customRequest={({ onSuccess }) => setTimeout(() => onSuccess?.("ok"), 0)}
          >
            {fileList.length >= maximum ? null : renderUploaderButton("포토 카드", loading)}
          </Upload>
        </ImgCrop>

        <ImgCrop aspect={3 / 2}>
          <Upload
            accept="image/*"
            maxCount={1}
            showUploadList={false}
            beforeUpload={(file) => {
              handleFiles([file], 3 / 2);
              return false;
            }}
            customRequest={({ onSuccess }) => setTimeout(() => onSuccess?.("ok"), 0)}
          >
            {fileList.length >= maximum ? null : renderUploaderButton("와이드 포토", loading)}
          </Upload>
        </ImgCrop>
      </div>
    </div>
  );
};

export default PhotoCropUploader;
