import { JwtPayload } from "jsonwebtoken";
import { atom } from "recoil";

export const userState = atom<JwtPayload>({
  key: "userState",
  default: {},
});
