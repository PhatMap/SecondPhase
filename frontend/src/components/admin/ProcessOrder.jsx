import React, { Fragment, useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import MetaData from "../layout/MetaData";
import Loader from "../layout/Loader";
import Sidebar from "./Sidebar";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import {
  getOrderDetails,
  updateOrder,
  clearErrors,
} from "../../actions/orderActions";
import { UPDATE_ORDER_RESET } from "../../constants/orderConstants";
import OrderProgressBar from "../order/OrderProgressBar";
import Back from "../layout/Back";

const ProcessOrder = () => {
  const { id } = useParams();
  const [status, setStatus] = useState("");

  const dispatch = useDispatch();

  const { loading, order = {} } = useSelector((state) => state.orderDetails);
  const { orderItems, paymentInfo, user, totalPrice, orderStatus } = order;
  const { error, isUpdated } = useSelector((state) => state.order);

  const orderId = id;

  useEffect(() => {
    dispatch(getOrderDetails(orderId));

    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      toast.success("Order updated successfully");
      dispatch({ type: UPDATE_ORDER_RESET });
    }
  }, [dispatch, error, isUpdated, orderId]);

  const updateOrderHandler = () => {
    const formData = new FormData();
    formData.set("status", status);
    dispatch(updateOrder(order._id, formData));
  };

  const [theOrder, setTheOrder] = useState("");

  useEffect(() => {
    setTheOrder(order.shippingInfo);
    console.log(orderStatus);
  }, [order]);

  const isPaid =
    paymentInfo && paymentInfo.status === "succeeded" ? true : false;

  return (
    <Fragment>
      <MetaData title={`Process Order # ${order && order._id}`} />
      <div className="order-and-sidebar">
        <div className="sidebar">
          <Sidebar />
        </div>

        {loading ? (
          <Loader />
        ) : (
          <div className="order-details-container">
            <Back/>
            <div style={{ width: "250px" }}>
              <h4 className="">Trạng thái đơn hàng</h4>

              <div className="form-group">
                <select
                  className="form-control"
                  name="status"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value="Processing">Processing</option>
                  <option value="Order Confirmed">Order Confirmed</option>
                  <option value="Out For Delivery">Out For Delivery</option>
                  <option value="Delivered">Delivered</option>
                </select>
              </div>

              <button
                className="btn btn-primary btn-block"
                onClick={() => updateOrderHandler()}
              >
                Cập nhật trạng thái
              </button>
            </div>
            <strong>
              <h2 className="">Order id: {order._id}</h2>
            </strong>

            <OrderProgressBar currentStatus={orderStatus} />

            <h4 className="">Thông tin giao hàng</h4>
            <p>
              <b>Tên người nhận:</b> {order && order.userName}
            </p>
            <p>
              <b>Số điện thoại:</b> {theOrder && theOrder.phone}
            </p>
            <p className="">
              <b>Địa chỉ giao:</b>{" "}
              {theOrder &&
                `${theOrder.province},${theOrder.district}, ${theOrder.town}, ${theOrder.location}`}
            </p>
            <p>
              <b>Số tiền:</b> {totalPrice} VNĐ
            </p>

            <hr />

            <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
              <h4>Thanh toán</h4>
              <p className={isPaid ? "greenColor" : "redColor"}>
                <b>{isPaid ? "ĐÃ THANH TOÁN" : "CHƯA THANH TOÁN"}</b>
              </p>
            </div>
            <hr />

            <h4 className="">Stripe ID</h4>
            <p>
              <b>{paymentInfo && paymentInfo.id}</b>
            </p>
            <hr />

            <h4 className="my-4">Sản phẩm:</h4>

            <hr />
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
                      width: "70%",
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

                    <div className="">
                      <Link to={`/products/${item.product}`}>
                        <strong>{item.name}</strong> - {item.variantName}
                      </Link>
                    </div>

                    <div>{item.size}</div>

                    <div className="">
                      <p>{item.price} VNĐ</p>
                    </div>

                    <div className="">
                      <p>{item.quantity} món</p>
                    </div>
                  </div>
                ))}
            </div>
            <hr />
          </div>
        )}
      </div>
    </Fragment>
  );
};

export default ProcessOrder;
