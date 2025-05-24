import dayjs from "dayjs";

export const toLocaleString = (dateStr: string) => {
  dayjs.locale("ko");
  const date = new Date(dateStr);
  return dayjs(date).format("YY.MM.DD");
};

export const getHiddenUserName = (userName: string) => {
  let res = userName.substring(0, 3);
  for (let i = 3; i < userName.length; i++) {
    res += "*";
  }
  return res;
};

const generateRandomInt = (min = 0, max = 0) => {
  if (min > max) {
    return max;
  }
  return Math.floor(Math.random() * (max - min)) + min;
};

const generateRandomFloat = (min = 0.0, max = 1.0, fixed = 1) => {
  if (min > max) {
    return max;
  }
  return parseFloat((Math.random() * (max - min) + min).toFixed(fixed));
};

interface RandomNumberOptionProps {
  fixed?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;
}

export const generateRandomNumber = (
  min: number,
  max: number,
  option?: RandomNumberOptionProps
) => {
  if (min > max) {
    return max;
  }

  if (option) {
    const { fixed } = option;
    if (fixed) {
      return generateRandomFloat(min, max, fixed);
    }
  }

  return generateRandomInt(min, max);
};

export const linkCopy = async (myName: string, messageApi: any) => {
  try {
    await navigator.clipboard.writeText(
      `${myName}(으)로부터 편지가 도착했습니다.\r\n \r\n${window.location.href}`
    );
    messageApi.success(
      "링크가 클립보드에 복사되었습니다. 소중한 분께 공유하세요."
    );
  } catch (error) {
    console.error("클립보드 복사 실패: ", error);
    messageApi.error("복사 실패");
  }
};

export const findMessage: any = (obj: { [key: string]: any }) => {
  if ("message" in obj) {
    return obj.message;
  }

  const key = Object.keys(obj)[0];
  const child = obj[key];
  return findMessage(child);
};

export const toCapitalize = (str: string) => {
  return str.replace(/\b\w/g, (match: string) => match.toUpperCase());
};
