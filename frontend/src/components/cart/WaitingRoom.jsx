import React, { useEffect, useState } from "react";
import Loader from "../layout/Loader";
import { useDispatch, useSelector } from "react-redux";
import { momoDone } from "../../actions/orderActions";
import { useNavigate } from "react-router-dom";
import { createOrder, clearErrors } from "../../actions/orderActions";

const WaitingRoom = () => {
  const dispatch = useDispatch();
  const history = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { cartItems, shippingInfo } = useSelector((state) => state.cart);
  const { error } = useSelector((state) => state.newOrder);

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
  console.log("gia totalPrice ", order.totalPrice);
  console.log("gia shippingPrice", order.shippingPrice);
  console.log("gia  taxPrice ", order.taxPrice);
  console.log("gia ", order.itemsPrice);
  console.log("yes", url);

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
    if (paid === 0) {
      console.log("yesngsha", orderId, orderStatus);
      order.paymentInfo = {
        id: orderId,
        status: "succeeded",
      };
      dispatch(createOrder(order));
      history("/success");
    }
  }, [paid]);

  return <Loader />;
};

export default WaitingRoom;
