import GridRadioGroup from "../GridRadioGroup";
import data from "@/assets/produce/data.json";

const Particle = () => {
  return (
    <>
      <div style={{ marginTop: 20, marginBottom: 10 }}>
        파티클&nbsp;
        <span style={{ color: "#f19a79" }}>그래픽 효과</span>
      </div>
      <GridRadioGroup options={data.introParticles} name="intro.particle" />
    </>
  );
};

export default Particle;
