import Head from "next/head";
import CardView from "@/containers/CardView";
import { RecoilRoot } from "recoil";
import "@/assets/fonts/ThemeFont.scss";
import { useRouter } from "next/router";
import DesktopAdjust from "@/layout/DesktopAdjust";
import BackHeadedr from "@/layout/Header/BackHeader";
import { getSSIDValue } from "@/util/auth";
import { AuthPageProps } from "@/types/types";
import AuthContext from "@/context/AuthContext";
import { getCardApi } from "@/api/cardApi";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { message, Button, Flex } from "antd";

const PreviewPage = (props: AuthPageProps) => {
  const router = useRouter();
  const { id } = router.query;
  const { ssid } = props;
  const [isExpired, setIsExpired] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [canEdit, setCanEdit] = useState(false);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!id) return;

    getCardApi(id as string)
      .then((data: { [key: string]: any }) => {
        if (!data?.data) {
          messageApi.error("삭제된 카드입니다.");
          setNotFound(true);
          router.replace("/");
          return;
        }

        const { data: cardData } = data;
        const registered = dayjs(cardData.registerdate);
        const now = dayjs();
        const expirationDays = cardData.order_id ? 30 : 45;
        const diffDays = now.diff(registered, "day");

        if (diffDays > expirationDays) {
          messageApi.warning("보관 기한이 만료되어 페이지를 열 수 없습니다.");
          setIsExpired(true);
          router.replace("/");
        } else {
          if ((ssid as any)?.userid === cardData.userId) {
            setCanEdit(true);
          }
        }
      })
      .catch(() => {
        messageApi.error("카드를 불러올 수 없습니다. 삭제되었을 수 있습니다.");
        setNotFound(true);
        router.replace("/");
      });
  }, [id]);

  if (isExpired || notFound) return null;

  return (
    <>
      <Head>
        <meta property="og:type" content="website" />
        <meta property="og:title" content={`헬륨가스`} />
        <meta property="og:description" content="마음을 전합니다." />
        <meta property="og:image" content='/static/intro/og_image01.png' />
      </Head>
      <RecoilRoot>
        <AuthContext.Provider value={{ ssid }}>
          <DesktopAdjust>
            <BackHeadedr editLink={canEdit ? `/edit/${id}` : undefined} />
            {contextHolder}
            <CardView id={id as string} />
          </DesktopAdjust>
        </AuthContext.Provider>
      </RecoilRoot>
    </>
  );
};

export const getServerSideProps = async (context: any) => {
  const { req } = context;
  const ssid = getSSIDValue(req);

  return {
    props: { ssid },
  };
};

export default PreviewPage;