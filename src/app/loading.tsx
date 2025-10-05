import Loader from "./Component/LoadingAnimation/Loading";

export default function Loading() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#0E0E10",
      }}
    >
      <Loader />
    </div>
  );
}
