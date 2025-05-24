import DescriptionTH from "@/components/list/Description/th";

const Description = () => {
  return (
    <div style={{ padding: "15px 10px", fontSize: "min(2.8vw, 14px)", backgroundColor: "#fffdf7" }}>
      <table border={0}>
        <colgroup>
          <col width="15%" />
          <col width="85%" />
        </colgroup>
        <tbody>
          <tr>
            <DescriptionTH>Start</DescriptionTH>
            <td>
              시안을 무료로 제작하고 원하는 작품이 나오면 그때 구매해 주세요.
            </td>
          </tr>
          <tr>
            <DescriptionTH>Time</DescriptionTH>
            <td>매일 24시간 편하게 작품을 만들어 보세요.</td>
          </tr>
          <tr>
            <DescriptionTH>Always</DescriptionTH>
            <td>결제 후에도 언제든지 작품을 수정하세요.</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Description;
