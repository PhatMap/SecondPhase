import React from "react";
import { useNavigate } from "react-router-dom";

const Back = () => {
  const history = useNavigate();

  return (
    <button type="button" className="back-btn" onClick={() => history(-1)}>
      <i className="fa fa-arrow-left"/>Quay lại
    </button>
  );
};

export default Back;
