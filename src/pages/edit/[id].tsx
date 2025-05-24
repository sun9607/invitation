import { getCardApi } from "@/api/cardApi";
import { Gallery, Subheader, PhotoCard } from "@/components/produce";
import Cover from "@/containers/Cover";
import { Intro, Letter, Theme, Video } from "@/containers/list/produce";
import AuthContext from "@/context/AuthContext";
import CustomLayout from "@/layout/CustomLayout";
import { AuthPageProps } from "@/types/types";
import { getSSIDValue } from "@/util/auth";
import { handleSubmit } from "@/util/form";
import { findMessage } from "@/util/functions";
import { Button, Form, Layout, Spin, message } from "antd";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { RecoilRoot } from "recoil";
import dayjs from "dayjs";

const { Content } = Layout;

const EditPage = (props: AuthPageProps) => {
  const { ssid } = props;
  const router = useRouter();
  const { id } = router.query;
  const methods = useForm();

  const menu = methods.watch("menu");
  const [messageApi, contextHolder] = message.useMessage();

  const onSubmit = (data: { [key: string]: any }) => {
    
    console.log("📝 저장될 데이터:", data); // ✅ 브라우저 콘솔로 출력

    handleSubmit(id as string, menu, data, () => router.push(`/view/${id}`), ssid, true);
  };

  useEffect(() => {
    id &&
      getCardApi(id as string).then((data: { [key: string]: any }) => {
        const { data: cardData } = data;

        // 자동 삭제일 경과 시 홈으로 이동
        const registered = dayjs(cardData.registerdate);
        const now = dayjs();
        const expirationDays = cardData.order_id ? 30 : 45;
        const diffDays = now.diff(registered, "day");

        if (diffDays > expirationDays) {
          messageApi.warning("보관 기한이 만료되어 페이지를 열 수 없습니다.");
          router.replace("/");
          return;
        }

        const videoFileData = cardData.video.file;
        const splitted = videoFileData?.length ? videoFileData.split("/") : [];
        methods.reset({
          id,
          bgm: cardData.bgm,
          coverDesign: cardData.cover,
          myName: cardData.myName,
          yourName: cardData.yourName,
          intro: {
            ...cardData.intro,
            image: cardData.intro.image?.length
              ? [{ url: cardData.intro.image }]
              : [],
          },
          theme: {
            ...cardData.theme,
            color: cardData.color,
          },
          prevent: cardData.prevent === 1,
          scroll: cardData.scroll === 1,
          video: {
            useYn: cardData.video.use_yn === 1,
            title: cardData.video.title,
            link: cardData.video.link,
            files: videoFileData?.length
              ? [
                {
                  url: cardData.video.file,
                  name: splitted[splitted.length - 1],
                },
              ]
              : [],
          },
          letter: {
            useYn: cardData.letter.use_yn === 1,
            fontFamily: cardData.letter.font_family,
            fontSize: cardData.letter.font_size,
            text: cardData.letter.text,
          },
          letterDesign: cardData.letter.design,
          share_yn: cardData.share_yn,
          menu: cardData.menu,
          gallery: {
            useYn: cardData.gallery.useYn === 1,
            type: cardData.gallery.type,
            title: cardData.gallery.title,
            files: cardData.gallery.files.map(
              (file: { [key: string]: any }) => ({
                url: file.photo,
                name: file.text || "", // ✅ 텍스트를 name에 다시 넣어줌
              })
            ),
          },
        });
      });
  }, [id]);

  useEffect(() => {
    const { errors } = methods.formState;
    if (errors) {
      const keys = Object.keys(errors);
      if (keys.length) {
        console.log(errors);
        if (keys[0]) {
          let error = errors[keys[0]];
          if (error) {
            const msg = findMessage(error);
            messageApi.error(msg);
          }
        }
      }
    }
  }, [methods.formState.errors]);

  return (
    <RecoilRoot>
      <AuthContext.Provider value={{ ssid }}>
        {menu ? (
          <CustomLayout menu={menu}>
            {contextHolder}
            <FormProvider {...methods}>
              <Form onFinish={methods.handleSubmit(onSubmit)}>
                <Layout>
                  <Subheader
                    title={menu === "special" ? "Special Day" : "Photo Message"}
                  />
                  <Content
                    style={{
                      padding: 20,
                      paddingTop: 30,
                    }}
                  >
                    <Cover />
                    <Theme />
                    <Intro />
                    {menu === "special" && (
                      <>
                        <Gallery />
                      </>
                    )}
                    {menu === "photo" && (
                      <>
                        <PhotoCard />
                      </>
                    )}

                    {menu === "special" && (
                      <>
                        <Video />
                      </>
                    )}
                    <Letter />
                    <Button type="primary" block htmlType="submit">
                      저장 (편지보기)
                    </Button>
                  </Content>
                </Layout>
              </Form>
            </FormProvider>
          </CustomLayout>
        ) : (
          <Spin />
        )}
      </AuthContext.Provider>
    </RecoilRoot>
  );
};

export const getServerSideProps = async (context: any) => {
  const { req } = context;
  const ssid = getSSIDValue(req);

  return {
    props: { ssid },
  };
};

export default EditPage;
