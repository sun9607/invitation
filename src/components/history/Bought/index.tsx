import { List, Typography } from "antd";
import Link from "next/link";
import Item from "./Item";

const { Title } = Typography;

interface BoughtProps {
  list: { [key: string]: any }[];
}

const Bought = (props: BoughtProps) => {
  const { list } = props;

  return (
    <div>
      <Title level={3}>구매 내역</Title>
      <div>(30일 뒤에 자동 삭제됩니다.)</div>
      <List
        itemLayout="horizontal"
        dataSource={list}
        renderItem={(item: { [key: string]: any }) => (
          <List.Item key={item.id}>
            <Item item={item} />
            {/* <Link href={`/view/${item.id}`}>
              <Item item={item} />
            </Link> */}
          </List.Item>
        )}
      />
    </div>
  );
};

export default Bought;
