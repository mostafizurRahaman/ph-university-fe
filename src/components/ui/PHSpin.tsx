import { Spin } from "antd";

const PHSpin = () => {
  return (
    <div
      style={{
        width: "100%",
        height: "100dvh",
        position: "absolute",
        top: 0,
        left: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Spin size="large" />
    </div>
  );
};

export default PHSpin;
