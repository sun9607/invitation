import { fileUploadApi } from "@/api/imageApi";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { GetProp, Upload, UploadFile, UploadProps, message } from "antd";
import ImgCrop from "antd-img-crop";
import { nanoid } from "nanoid";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import Image from "next/image";

interface ImageCropUploaderProps {
  name: string;
  label: string;
  maximum: number;
  aspect?: number;
  onChange?: () => void;
  onRemove?: (str: string) => void;
}

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

const ImageCropUploader = (props: ImageCropUploaderProps) => {
  const { name, label, maximum, aspect = 1, onChange, onRemove } = props;
  const [loading, setLoading] = useState<boolean>(false);
  const [previewOpen, setPreviewOpen] = useState<boolean>(false);
  const [previewImage, setPreviewImage] = useState<string>("");

  const { watch, setValue } = useFormContext();
  const fileList = watch(name, []);

  const beforeUpload = (file: File) => {
    const isImage = file.type.startsWith("image/");

    if (!isImage) {
      message.error("이미지 파일만 업로드 가능합니다.");
      return Upload.LIST_IGNORE;
    }

    if (file.size > 10 * 1024 ** 2) {
      message.error("10MB 까지만 업로드 가능합니다.");
      return Upload.LIST_IGNORE;
    }

    setLoading(true);
    if (process.env.NEXT_PUBLIC_RUN_MODE === "local") {
      setLoading(false);
      const fakeUrl = URL.createObjectURL(file);
      setValue(name, [
        ...fileList,
        {
          uid: nanoid(),
          name: file.name,
          url: fakeUrl,
          originFileObj: file,
        },
      ]);
      return;
    } else {
      fileUploadApi(file).then((data) => {
        setLoading(false);
        setValue(name, [
          ...fileList,
          {
            uid: nanoid(),
            name: file.name,
            url: `${process.env.NEXT_PUBLIC_API_ROOT}${data.data.file_url}`,
            originFileObj: file,
          },
        ]);
      });
    }
  };

  const handleRemove = (file: UploadFile) => {
    const { url } = file;
    if (url && onRemove) {
      onRemove(url);
    } else {
      setPreviewImage("");
      setPreviewOpen(false);
      setValue(name, []);
    }
  };

  const getBase64 = (file: FileType): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });

  const onPreview = async (file: UploadFile) => {
    file.preview = await getBase64(file.originFileObj as FileType);

    setPreviewImage(file.preview as string);
    setPreviewOpen(true);
  };

  useEffect(() => {
    console.log(fileList);
    if (onChange && fileList.length) {
      onChange();
    }
  }, [fileList]);

  const uploadButton = (
    <button style={{ border: 0, background: "none"}} type="button">
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>{label}</div>
    </button>
  );

  return (
    <>
      <ImgCrop aspect={aspect}>
        <Upload
          listType="picture-card"
          showUploadList={{ showPreviewIcon: false }}
          beforeUpload={beforeUpload}
          onRemove={handleRemove}
          fileList={fileList || []}
          onPreview={onPreview}
        >
          {fileList.length === maximum ? null : uploadButton}
        </Upload>
      </ImgCrop>
    </>
  );
};

export default ImageCropUploader;
