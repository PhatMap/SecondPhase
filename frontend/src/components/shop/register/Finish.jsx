import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Finish = () => {
  const navigate = useNavigate();

  return (
    <div className="box-container">
      <div className="order-sucess-container">
        <img
          className="my-5 img-fluid d-block mx-auto"
          src="/images/order_success.png"
          alt="Order Success"
          width="200"
          height="200"
        />

        <h1>Đã hoàn thành đăng ký, hãy chờ phản hồi từ quản trị viên</h1>
        <button onClick={() => navigate("/")}>Quay về trang chủ</button>
      </div>
    </div>
  );
};

export default Finish;
