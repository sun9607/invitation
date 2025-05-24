import { JwtPayload } from "jsonwebtoken";
import { createContext } from "react";

interface ContextType {
  ssid: string | null | JwtPayload;
}

const AuthContext = createContext({ ssid: null } as ContextType);

export default AuthContext;
