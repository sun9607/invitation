export const getServerSideProps = async ({ res }: { res: any }) => {
  res.setHeader(
    "Set-Cookie",
    "ssid=; Path=/; Expires=Thu, 01 Jan 1960 00:00:00 GMT; HttpOnly; Domain=heliumgas.kr; SameSite=None; Secure;"
  );

  return {
    redirect: {
      destination: "/",
      permanent: false,
    },
  };
};

const LogoutPage = () => {
  return null;
};

export default LogoutPage;
