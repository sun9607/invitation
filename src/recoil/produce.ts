import { atom } from "recoil";

export const cardState = atom<{ [key: string]: any }>({
  key: "cardState",
  default: {},
});
