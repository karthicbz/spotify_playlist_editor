import React from "react";
import ScaleLoader from "react-spinners/ScaleLoader";

const Spinner = ({ loading, label }) => {
  return (
    <ScaleLoader
      color="#78c945"
      loading={loading}
      aria-label={label}
      style={{ display: "inherit", textAlign: "center", paddingTop: "10rem" }}
    />
  );
};

export default Spinner;
