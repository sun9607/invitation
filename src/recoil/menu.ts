import { MenuType } from "@/types/types";
import { atom } from "recoil";

export const menuState = atom<MenuType>({
  key: "menuState",
  default: "special",
});
