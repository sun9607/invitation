import { List, Typography } from "antd";
import Item from "./Item";

interface ProducingProps {
  list: { [key: string]: any }[];
}

const { Title } = Typography;

const Producing = (props: ProducingProps) => {
  const { list } = props;

  return (
    <div style={{ marginTop : '100px', }}>
      <Title level={3}>구매전 제작중인 편지</Title>
      <div>(자동삭제예정)</div>
      <List
        itemLayout="horizontal"
        dataSource={list}
        renderItem={(item: { [key: string]: any }) => (
          <List.Item key={item.id}>
            <Item item={item} />
          </List.Item>
        )}
      />
    </div>
  );
};

export default Producing;
