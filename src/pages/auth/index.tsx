import { useEffect } from "react";

const NaverAuth = () => {
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");
    const state = urlParams.get("state");

    if (code) {
      window.opener.postMessage(
        { type: "naver", code, state },
        window.location.origin
      );
    }
  }, []);

  return <div />;
};

export default NaverAuth;
