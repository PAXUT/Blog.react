import React from "react";
import { useNavigate } from "react-router-dom";

const Back = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div onClick={handleGoBack} style={{ cursor: "pointer" }}>
      Quay lại
    </div>
  );
};

export default Back;
