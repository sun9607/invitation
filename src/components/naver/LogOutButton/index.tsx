import { userState } from "@/recoil/user"
import { Button } from "antd";
import { JwtPayload } from "jsonwebtoken";
import { useCookies } from "react-cookie";
import { useSetRecoilState } from "recoil"

const LogOutButton = () => {
    const setTokenVal = useSetRecoilState(userState);
    const [,,removeCookie] = useCookies(["ssid"]);

    const handleClick = () => {
        removeCookie("ssid");
        setTokenVal(null as unknown as JwtPayload)
    }

    return (
        <Button onClick={handleClick}>로그아웃</Button>
    )
}

export default LogOutButton;