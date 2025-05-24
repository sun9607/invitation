import jwt from "jsonwebtoken";
import cookie from "cookie";

export const getCookie = (name: string) => {
  const cookieString = document.cookie;
  const cookies = cookieString.split("; ");
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].split("=");
    if (cookie[0] === name) {
      return decodeURIComponent(cookie[1]);
    }
  }

  return null;
};

export const getSSIDValue = (req: any) => {
  const cookies = cookie.parse(req.headers.cookie || "");
  const sessionId = cookies.ssid || null;

  if (!sessionId) return null;

  return jwt.decode(sessionId);
};
