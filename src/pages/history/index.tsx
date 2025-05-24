import HistoryContainer from "@/containers/HistoryContainer";
import AuthContext from "@/context/AuthContext";
import CustomLayout from "@/layout/CustomLayout";
import { AuthPageProps } from "@/types/types";
import { getSSIDValue } from "@/util/auth";
import { RecoilRoot } from "recoil";

const HistoryPage = (props: AuthPageProps) => {
  const { ssid } = props;

  return (
    <RecoilRoot>
      <AuthContext.Provider value={{ ssid }}>
        <CustomLayout menu="history" header={false}>
          <HistoryContainer />
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

export default HistoryPage;
