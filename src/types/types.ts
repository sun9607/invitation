import { ReactNode } from "react";

export type Card = {
  title: string;
  subtitle: string;
  img: string;
  sampleLink: string;
  regularPrice?: number;
  salePrice?: number;
  undecided?: boolean;
};

export type Review = {
  userName: string;
  registerDate: string;
  text: string;
};

export type OptionVal = string | number;

export type Option = {
  label: string | ReactNode;
  value: OptionVal;
};

export type MenuType = "photo" | "special" | "history" | "home";

export type Frame = {
  x: number;
  y: number;
  width?: number;
  height?: number;
  upperRadius?: number;
  radius?: number;
};

export interface ModalProps {
  open: boolean;
  setOpen: (param: boolean) => void;
}

export interface AuthPageProps {
  ssid: string | null;
}

export interface CardModalProps {
  open: boolean;
  handleClose: () => void;
  cardId: string;
}
