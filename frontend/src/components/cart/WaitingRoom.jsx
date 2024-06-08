import React, { useEffect } from "react";
import Loader from "../layout/Loader";
import { useDispatch, useSelector } from "react-redux";
import { momoDone } from "../../actions/orderActions";
import { useNavigate } from "react-router-dom";

const WaitingRoom = () => {
  const dispatch = useDispatch();
  const history = useNavigate();

  const { orderId, orderStatus, paid, url } = useSelector(
    (state) => state.momo
  );

  useEffect(() => {
    if (orderId && orderStatus === 0) {
      console.log("yes", orderId, orderStatus);
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
      console.log("yes", orderId, orderStatus);
      history("/success");
    }
  }, [paid]);

  return <Loader />;
};

export default WaitingRoom;
