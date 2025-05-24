import Elem from "./Elem";

const ItemList = () => {
  return (
    <ul style={{ listStyle: "none", padding: 20 }}>
      <Elem title="Special Day" id="special" viewUrl="https://heliumgas.kr/view/C3BvO-y9e3iqxTGcnKDqf" produceUrl="/special/produce" />
      <Elem title="Photo Message" id="photo" viewUrl="https://heliumgas.kr/view/W46DhlYlcNUeSWeSiJwW9" produceUrl="/photo/produce" />
      <Elem title="고백" id="love" comment="coming soon" />
    </ul>
  );
};

export default ItemList;
