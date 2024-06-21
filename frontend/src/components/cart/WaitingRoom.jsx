import React, { useEffect, useState } from "react";
import Loader from "../layout/Loader";
import { useDispatch, useSelector } from "react-redux";
import { momoDone } from "../../actions/orderActions";
import { useNavigate } from "react-router-dom";
import { createOrder, clearErrors } from "../../actions/orderActions";
import io from "socket.io-client";

const WaitingRoom = () => {
  const dispatch = useDispatch();
  const history = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { cartItems, shippingInfo } = useSelector((state) => state.cart);
  // const { error } = useSelector((state) => state.newOrder);
  const [callbackData, setCallbackData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const { orderId, orderStatus, paid, url } = useSelector(
    (state) => state.momo
  );

  const [order, setOrder] = useState({
    userName: user.name,
    orderItems: cartItems,
    shippingInfo,
    itemsPrice: 0,
    shippingPrice: 0,
    taxPrice: 0,
    totalPrice: 0,
  });

  useEffect(() => {
    const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));
    if (orderInfo) {
      setOrder({
        ...order,
        userName: user.name,
        orderItems: cartItems,
        shippingInfo,
        itemsPrice: orderInfo.itemsPrice,
        shippingPrice: orderInfo.shippingPrice,
        taxPrice: orderInfo.taxPrice,
        totalPrice: orderInfo.totalPrice,
      });
    }
  }, [user, cartItems, shippingInfo]);

  useEffect(() => {
    if (orderId && orderStatus === 0) {
      const newWindow = window.open(url, "_blank");

      const checkClosed = setInterval(() => {
        if (!newWindow || newWindow.closed) {
          clearInterval(checkClosed);
          const data = { orderId: orderId };
          dispatch(momoDone(data));
        }
      }, 1000);
    }
  }, [orderId, orderStatus]);

  useEffect(() => {
    if (callbackData !== null && callbackData !== undefined) {
      console.log("Here Here", callbackData.resultCode);
      if (callbackData.resultCode === 0) {
        order.paymentInfo = {
          id: orderId,
          status: "succeeded",
        };
        dispatch(createOrder(order));
        history("/success");
      } else {
        console.log("Transition failed");
      }
    } else {
      console.log("callbackData is null or undefined");
    }
  }, [callbackData]);

  useEffect(() => {
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

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return callbackData ? (
    <div>
      <h2>Payment Result:</h2>
      <pre>{JSON.stringify(callbackData, null, 2)}</pre>
    </div>
  ) : (
    <div>Waiting for payment result...</div>
  );
};

export default WaitingRoom;
