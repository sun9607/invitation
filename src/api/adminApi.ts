import { Api } from "@/config/axios";

export const setPremiumApi = (id: string) => {
  const formData = new FormData();
  formData.append("id", id);
  return Api.post(process.env.NEXT_PUBLIC_PREMIUM_URL as string, formData);
};
