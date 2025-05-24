import { cardEditApi, cardSaveApi, tempSaveCard } from "@/api/cardApi";
import { UploadFile } from "antd";
import { JwtPayload } from "jsonwebtoken";

export const handleSubmit = (
  id: string,
  menu: string,
  data: { [key: string]: any },
  callback: () => void,
  ssid: string | null,
  isEdit?: boolean,
  isTemp?: boolean
) => {
  const formData = new FormData();
  if (ssid && !isEdit) {
    const { userid } = ssid as unknown as JwtPayload;
    formData.append("user_id", userid);
  }

  formData.append("id", id);
  formData.append("bgm", data.bgm || "0");
  formData.append("cover", data.coverDesign || "1");
  formData.append("name", data.myName || "");
  formData.append("you", data.yourName || "");
  formData.append("intro_layout", data.intro.layout.toString() || "");
  formData.append("intro_head", data.intro.head || "");
  formData.append("intro_image", data.intro.image[0]?.url || "");
  formData.append("particle", data.intro.particle.toString() || "0");
  formData.append("intro_foot", data.intro.foot || "");
  formData.append("intro_type", data.intro.introType || "classic");
  formData.append("font_family", data.theme.fontFamily || "notoSans");
  formData.append("font_size", data.theme.fontSize || "medium");
  formData.append("color", data.theme.color || "white");

  formData.append("prevent", data.prevent ? "1" : "0");
  formData.append("scroll", data.scroll ? "1" : "0");

  const videoUseYn = data.video.useYn;
  formData.append("video_use_yn", videoUseYn ? "1" : "0");
  if (videoUseYn) {
    formData.append("video_title", data.video.title);

    const videoLink = data.video.link;
    if (videoLink) {
      formData.append("video_link", data.video.link);
    } else {
      formData.append("video_file", data.video.files[0]?.url || "");
    }
  }

  if (data.letter.useYn) {
    formData.append("letter_use_yn", "1");
  } else {
    formData.append("letter_use_yn", "0");
  }
  formData.append("letter_font_family", data.letter.fontFamily || "singleDay");
  formData.append("letter_design", data.letterDesign?.toString() || "1");
  formData.append("letter", data.letter.text || "");
  formData.append("share_yn", data.share_yn ? "1" : "0");
  formData.append("menu", menu);

  formData.append("gallery_title", data.gallery.title || "");
  formData.append("gallery_type", data.gallery.type || "1");
  formData.append("gallery_use_yn", data.gallery.useYn ? "1" : "0");
  formData.append(
    "gallery",
    JSON.stringify(
      data.gallery.files?.map((file: UploadFile) =>
        typeof file === "string" ? file : {
          url: file.url,
          name: file.name || "", // name이 없어도 문제 없음
        })
    )
  );
  

  if (isEdit) {
    cardEditApi(formData).then(() => {
      callback();
    });
  } else if (isTemp) {
    tempSaveCard(formData).then(() => {
      callback();
    });
  } else {
    cardSaveApi(formData).then(() => {
      if (!ssid) {
        localStorage.setItem("recentCard", id);
      }
      callback();
    });
  }
};

export const defaultValues = {
  bgm: 0,
  coverDesign: 1,
  myName: "",
  yourName: "",
  intro: {
    layout: 1,
    image: [],
    particle: 0,
    head: "",
    foot: "",
  },
  theme: {
    fontFamily: "pretendard",
    fontSize: "medium",
    color: "white",
  },
  video: {
    useYn: true,
    title: "",
    link: undefined,
    files: [],
  },
  gallery: {
    useYn: true,
    type: 1,
    files: [],
  },
  letter: {
    useYn: true,
    fontFamily: "eunhasu",
  },
};
