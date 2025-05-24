import { JwtPayload } from "jsonwebtoken";
import { useContext, useEffect, useState } from "react";
import History from "./History";
import Login from "../Login";
import AuthContext from "@/context/AuthContext";

const HistoryContainer = () => {
  const ssid = useContext(AuthContext);
  const [tokenVal, setTokenVal] = useState<JwtPayload | null>(null);

  useEffect(() => {
    console.log(ssid);
    setTokenVal(ssid.ssid as JwtPayload);
  }, []);

  return <>{tokenVal ? <History /> : <Login />}</>;
};

export default HistoryContainer;
