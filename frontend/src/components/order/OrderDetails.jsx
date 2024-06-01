import React, { Fragment, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

import MetaData from "../layout/MetaData";
import Loader from "../layout/Loader";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { getOrderDetails, clearErrors } from "../../actions/orderActions";
import OrderProgressBar from "./OrderProgressBar";

const OrderDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const {
    loading,
    error,
    order = {},
  } = useSelector((state) => state.orderDetails);
  const {
    shippingInfo,
    orderItems,
    paymentInfo,
    user,
    totalPrice,
    orderStatus,
  } = order;

  useEffect(() => {
    dispatch(getOrderDetails(id));

    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, error, id]);

  const shippingDetails =
    shippingInfo &&
    `${shippingInfo.province}, ${shippingInfo.district}, ${shippingInfo.town}, ${shippingInfo.location}`;

  const isPaid =
    paymentInfo && paymentInfo.status === "succeeded" ? true : false;

  return (
    <Fragment>
      <MetaData title={"Order Details"} />

      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <div className="order-details-container">
            <div className="order-details-form">
              <h1>Order id: {order._id}</h1>

              <OrderProgressBar currentStatus={orderStatus} />
              <strong>
                <h1>Thông tin đơn hàng</h1>
              </strong>
              <p>
                <b>Tên người mua:</b> {user && user.name}
              </p>
              <p>
                <b>Số điện thoại:</b> {shippingInfo && shippingInfo.phone}
              </p>
              <p>
                <b>Địa chỉ:</b>
                {shippingDetails}
              </p>
              <p>
                <b>Số tiền:</b> {totalPrice} VNĐ
              </p>

              <hr />

              <div
                style={{ display: "flex", alignItems: "center", gap: "20px" }}
              >
                <h4>Thanh toán:</h4>
                <p className={isPaid ? "greenColor" : "redColor"}>
                  <b>{isPaid ? "ĐÃ THANH TOÁN" : "CHƯA THANH TOÁN"}</b>
                </p>
              </div>
              <hr />
              <div
                style={{ display: "flex", alignItems: "center", gap: "20px" }}
              >
                <h4 className="my-4">Trạng thái đơn hàng:</h4>
                <p
                  className={
                    order.orderStatus &&
                    String(order.orderStatus).includes("Delivered")
                      ? "greenColor"
                      : "redColor"
                  }
                >
                  <b>{orderStatus}</b>
                </p>
              </div>

              <hr />
              <h4 className="my-4">Sản phẩm đã đặt:</h4>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                }}
              >
                {orderItems &&
                  orderItems.map((item, index) => (
                    <div
                      key={index}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        border: "black solid 1px",
                        padding: "5px",
                        alignItems: "center",
                      }}
                    >
                      <div>
                        <img
                          src={item.image}
                          alt={item.name}
                          height="45"
                          width="65"
                        />
                      </div>

                      <div>
                        <Link to={`/products/${item.product}`}>
                          <strong>{item.name}</strong> - {item.size}
                        </Link>
                      </div>

                      <div className="">
                        <p>{item.price} VNĐ</p>
                      </div>

                      <div className="">
                        <p>{item.quantity} Món</p>
                      </div>
                    </div>
                  ))}
              </div>
              <hr />
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default OrderDetails;
