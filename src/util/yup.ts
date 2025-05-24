import { theme } from "antd";
import * as yup from "yup";

export const schema = yup.object().shape({
  bgm: yup
    .number()
    .required("bgm을 선택하지 않을 경우 '선택 안함'을 선택해 주세요."),
  coverDesign: yup.number().required("커버 이미지를 선택하세요."),
  // myName: yup.string().required("보내는 분의 성함을 입력하셔야 합니다."),
  // yourName: yup.string().required("받는 분의 성함을 입력하셔야 합니다."),
  intro: yup.object().shape({
    layout: yup.number().required(),
    // head: yup.string().required("인트로 상단 멘트를 입력하세요."),
    // image: yup.array().min(1, "인트로 이미지를 업로드하세요."),
    particle: yup.number().required(),
    // foot: yup.string().required("인트로 하단 멘트를 입력하세요."),
  }),
  theme: yup.object().shape({
    fontFamily: yup.string().required("테마 폰트를 선택하세요."),
    fontSize: yup.string().required("테마 폰트 사이즈를 선택하세요."),
    color: yup.string().required("테마 색상을 선택하세요."),
  }),
  prevent: yup.bool(),
  scroll: yup.bool(),
  video: yup.object().shape({
    useYn: yup.bool(),
    title: yup.string().when("useYn", (useYn): any => {
      if (useYn[0]) {
        // return yup.string().required("영상 제목을 입력하세요.");
      }
    }),
    link: yup.string(),
    files: yup.array().when(["useYn", "link"], ([useYn, link]: any[]) => {
      console.log(useYn);
      console.log(link);
      if (useYn[0] && !link) {
        return yup.array().min(1, "영상 파일이나 링크를 입력하세요.");
      } else if (useYn[0] && link) {
        console.log(link);
        return yup
          .array()
          .max(0, "영상 링크와 파일 중 하나만 입력해야 합니다.");
      }
      return yup.array();
    }),
  }),
  letter: yup.object().shape({
    useYn: yup.bool(),
    fontFamily: yup.string().when("useYn", (useYn: any) => {
      console.log(useYn);
      if (useYn[0]) {
        return yup.string().required("편지 폰트를 선택하세요.");
      }
      return yup.string();
    }),
    text: yup.string().when("useYn", (useYn: any) => {
      if (useYn[0]) {
        return yup.string().required("편지 내용을 선택하세요.");
      }
      return yup.string();
    }),
  }),
  letterDesign: yup.number(),
  share_yn: yup.bool(),
  menu: yup.string(),
  gallery: yup.object().shape({
    useYn: yup.bool(),
    title: yup.string().min(1, "갤러리 제목을 입력하세요."),
    type: yup.number().when("useYn", (useYn): any => {
      if (useYn[0]) {
        return yup.number().required("갤러리 타입을 정하세요.");
      }
    }),
    files: yup.array().when("useYn", (useYn): any => {
      if (useYn[0]) {
        return yup.array().min(1, "갤러리 파일을 업로드 하세요.");
      }
    }),
  }),
});
