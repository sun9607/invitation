import { Api } from "@/config/axios";

export const naverLogoutApi = async () => {
  const res = await Api.post("/logout/naver");
  console.log(res);
  return res.data;
};
