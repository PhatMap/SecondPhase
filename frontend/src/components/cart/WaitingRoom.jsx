import React, { useEffect, useState } from "react";
import Loader from "../layout/Loader";
import { useDispatch, useSelector } from "react-redux";
import { momoDone } from "../../actions/orderActions";
import { useNavigate } from "react-router-dom";
import { createOrder, clearErrors } from "../../actions/orderActions";
import io from "socket.io-client";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const WaitingRoom = () => {
  const dispatch = useDispatch();
  const history = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { cartItems, shippingInfo } = useSelector((state) => state.cart);
  const [callbackData, setCallbackData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const { orderId, orderStatus, paid, url } = useSelector(
    (state) => state.momo
  );

  const momoOrder = JSON.parse(sessionStorage.getItem("momoOrder"));

  useEffect(() => {
    if (orderId && orderStatus === 0) {
      window.open(url, "_blank");
    }
  }, [orderId, orderStatus]);

  useEffect(() => {
    console.log("Here 2", momoOrder);
    if (callbackData !== null && callbackData !== undefined) {
      console.log("Here Here", callbackData.resultCode);
      if (callbackData.resultCode === 0) {
        dispatch(createOrder(momoOrder));
        history("/success");
      } else {
        toast.error("Lỗi thanh toán qua MoMo không thành công");
        console.log("Transition failed");
      }
    } else {
      console.log("callbackData is null or undefined");
    }
  }, [callbackData]);

  useEffect(() => {
    console.log("Here 1", momoOrder);

    const socket = io("http://localhost:4000", {
      withCredentials: true,
    });

    socket.on("connect", () => {
      console.log("Connected to server");
      setIsLoading(false);
    });

    socket.on("connect_error", (err) => {
      console.log("Connection error:", err);
      setError("Failed to connect to the server");
      setIsLoading(false);
    });

    socket.on("momoCallback", (data) => {
      console.log("Received callback data:", data);
      setCallbackData(data);
      setIsLoading(false);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return callbackData ? (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "690px",
      }}
    >
      <ToastContainer />

      <div
        style={{
          width: "150px",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        <i
          style={{
            display: "flex",
            justifyContent: "center",
            color: "red",
            fontSize: "300px",
          }}
          class="fa fa-exclamation-circle"
        ></i>
        <button
          onClick={() => history(-1)}
          style={{ width: "100%" }}
          className="btn-one"
        >
          Thanh Toán Lại
        </button>
        <button
          onClick={() => history("/")}
          style={{ width: "100%" }}
          className="btn-two"
        >
          Về Trang chủ
        </button>
      </div>
    </div>
  ) : (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <ToastContainer />
      <Loader />
      <p>Đang chờ xác nhận thanh toán...</p>
    </div>
  );
};

export default WaitingRoom;
