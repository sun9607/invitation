import styled from "styled-components";

export default function LoginPage() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "100px 0",
      }}
    >
      <a href="https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=T95BA9wXJAB95_hyTKQm&redirect_uri=https://api.heliumgas.kr/login/naver&state=code">
        <img src="/static/icon/naver_login_button.png" style={{ width: 500 }} />
      </a>
    </div>
  );
}
