import { Flex, Image } from "antd";

const CardDivider = () => {
  return (
    <>
      <div style={{ paddingTop: 30, paddingBottom: 30 }}>
        <Flex justify="center">
          <Image preview={false} src="/static/images/flower.png" width="25%" />
        </Flex>
      </div>
    </>
  );
};

export default CardDivider;
