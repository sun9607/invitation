import { Api } from "@/config/axios";

export const fileUploadApi = (file: File) =>
  Api.post(
    "/upload",
    { file },
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

export const fileDeleteApi = (url: string) => {
  const formData = new FormData();
  formData.append("path", url);
  return Api.delete("/delete_file", { data: formData });
};

export const fetchFileApi = (path: string) => {
  return Api.post("/uploaded_file", { path });
};
