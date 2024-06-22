import React, { Fragment, useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

import MetaData from "../layout/MetaData";
import Loader from "../layout/Loader";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import {
  getOrderDetails,
  updateOrder,
  clearErrors,
} from "../../actions/orderActions";
import OrderProgressBar from "./OrderProgressBar";
import { formatToVNDWithVND } from "../../utils/formatHelper";

const OrderDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [isDelivered, setIsDelivered] = useState(false);

  const statusTranslations = {
    Processing: "Đang Xử Lý",
    "Order Confirmed": "Đã Xác Nhận",
    Shipping: "Đang Giao Hàng",
    Delivered: "Hoàn Thành",
    // Thêm các trạng thái khác nếu cần
  };
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

  const cancelOrderHandler = () => {
    if (!canCancelOrder()) {
      toast.error("Không thể hủy đơn hàng ở trạng thái này");
      return;
    }

    const confirmCancel = window.confirm(
      "Bạn có chắc chắn muốn hủy đơn hàng này không?"
    );
    if (!confirmCancel) {
      return;
    }

    const formData = new FormData();
    formData.set("status", "canceled");
    dispatch(updateOrder(order._id, formData))
      .then(() => {
        toast.success("Đơn hàng đã được hủy thành công");
        window.location.reload();
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  const canCancelOrder = () => {
    return orderStatus === "Processing" || orderStatus === "Order Confirmed";
  };

  const canReceive = () => {
    return orderStatus === "Shipping";
  };

  const receiveOrderHandler = () => {
    if (!canReceive()) {
      toast.error("Đơn Hàng Chưa Được Giao Không Thể Nhận");
      return;
    }

    const confirmCancel = window.confirm("Bạn có chắc đã nhận được đơn hàng?");
    if (!confirmCancel) {
      return;
    }

    const formData = new FormData();
    formData.set("status", "Delivered");
    dispatch(updateOrder(order._id, formData))
      .then(() => {
        toast.success("Đã cập nhật trạng thái đơn hàng thành công");
        window.location.reload();
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  return (
    <Fragment>
      <MetaData title={"Order Details"} />

      {loading ? (  
        <Loader />
      ) : (
        <Fragment>
          <div className="order-details-container">
            <div className="order-details-form">
              <div>
                <Link
                  to="/orders/me"
                  className="btn btn-outline-danger btn-sm"
                >
                  Quay lại
                </Link>
              </div>
              <h1>Order id: {order._id}</h1>

              <OrderProgressBar currentStatus={orderStatus} />

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "20px",
                }}
              >
                <button
                  className="btn btn-success"
                  onClick={receiveOrderHandler}
                  disabled={loading || !canReceive()}
                  style={{ width: "10rem" }}
                >
                  Đã Nhận
                </button>

                <button
                  className="btn btn-danger"
                  onClick={cancelOrderHandler}
                  disabled={loading || !canCancelOrder()}
                  style={{ marginRight: "65rem", width: "10rem" }}
                >
                  Hủy Đơn
                </button>
              </div>

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
                <b>Số tiền:</b> {formatToVNDWithVND(totalPrice)}
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
                <b>{statusTranslations[orderStatus]}</b>
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
                        <Link to={`/product/${item.product}`}>
                          <strong>{item.name}</strong> - {item.size}
                        </Link>
                      </div>

                      <div className="">
                        <p>{formatToVNDWithVND(item.price)}</p>
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
