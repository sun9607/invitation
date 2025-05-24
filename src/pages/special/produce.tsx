import { cardSaveApi } from "@/api/cardApi";
import { FormOnOff, Gallery } from "@/components/produce";
import Subheader from "@/components/produce/Subheader";
import Cover from "@/containers/Cover";
import { Intro, Letter, Theme, Video } from "@/containers/list/produce";
import CustomLayout from "@/layout/CustomLayout";
import { AuthPageProps } from "@/types/types";
import { getSSIDValue } from "@/util/auth";
import { defaultValues, handleSubmit } from "@/util/form";
import { findMessage } from "@/util/functions";
import { schema } from "@/util/yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Form, Layout, message } from "antd";
import { nanoid } from "nanoid";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { RecoilRoot } from "recoil";
import { Anchor } from "antd";
import AuthContext from "@/context/AuthContext";

const { Content } = Layout;

const SpecialProducePage = (props: AuthPageProps) => {
  const { ssid } = props;

  const methods = useForm({
    defaultValues: defaultValues as any,
    resolver: yupResolver(schema),
  });

  const [messageApi, contextHolder] = message.useMessage();

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
  }, [methods?.formState?.errors, messageApi]);

  const router = useRouter();

  const onSubmit = (data: { [key: string]: any }) => {
    console.log("📝 저장될 데이터:", data); // ✅ 브라우저 콘솔로 출력

    const id = nanoid();

    handleSubmit(id, "special", data, () => { router.push(`/view/${id}`); }, ssid);
  };

  return (
    <RecoilRoot>
      <AuthContext.Provider value={{ ssid }}>
        <CustomLayout menu="special">
          {contextHolder}
          <FormProvider {...methods}>
            <Form onFinish={methods.handleSubmit(onSubmit)}>
              <Layout>
                <Subheader title="Special Day" />
                <Content
                  style={{
                    padding: 20,
                    paddingTop: 30,
                  }}
                >
                  <Cover />
                  <Theme />
                  <Intro />
                  <Gallery />
                  <Video />
                  <Letter />
                  <Button type="primary" block htmlType="submit">
                    저장 (편지보기)
                  </Button>
                </Content>
              </Layout>
            </Form>
          </FormProvider>
        </CustomLayout>
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

export default SpecialProducePage;
