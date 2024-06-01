import React, { Fragment, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import MetaData from "../layout/MetaData";
import CheckoutSteps from "./CheckoutSteps";

import { useDispatch, useSelector } from "react-redux";
import { createOrder, clearErrors } from "../../actions/orderActions";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ConfirmOrder = () => {
  const history = useNavigate();
  const { cartItems, shippingInfo } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);
  const { error } = useSelector((state) => state.newOrder);

  // Calculate Order Prices
  const itemsPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const shippingPrice = itemsPrice > 200 ? 0 : 25;
  const taxPrice = Number((0.05 * itemsPrice).toFixed(2));
  const totalPrice = (itemsPrice + shippingPrice + taxPrice).toFixed(2);
  const dispatch = useDispatch();

  const processToPayment = () => {
    const data = {
      itemsPrice: itemsPrice.toFixed(2),
      shippingPrice,
      taxPrice,
      totalPrice,
    };

    sessionStorage.setItem("orderInfo", JSON.stringify(data));
    history("/payment");
  };

  function generateRandomId() {
    const timestamp = new Date().getTime();
    const random = Math.floor(Math.random() * 1000000);
    const randomId = `${timestamp}${random}`;
    return randomId;
  }

  const processToCashPayment = () => {
    const order = {
      itemsPrice: itemsPrice.toFixed(2),
      shippingPrice,
      taxPrice,
      totalPrice,
      userName: user.name,
      orderItems: cartItems,
      shippingInfo: shippingInfo,
    };

    order.paymentInfo = {
      id: generateRandomId(),
      status: "Progress",
    };

    dispatch(createOrder(order));

    history("/success");
  };
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
  });

  return (
    <Fragment>
      <MetaData title={"Confirm Order"} />
      <CheckoutSteps shipping confirmOrder />

      <div className="confirm-order-container">
        <div className="col-12 col-lg-8 mt-5 order-confirm">
          <h4 className="mb-3">Shipping Info</h4>
          <p>
            <b>Họ Tên :</b> {user && user.name}
          </p>
          <p>
            <b>Số Điện Thoại:</b> {shippingInfo.phone}
          </p>
          <p className="mb-4">
            <b>Địa Chỉ:</b>{" "}
            {`${shippingInfo.province}, ${shippingInfo.district}, ${shippingInfo.town}, ${shippingInfo.location}`}
            ;
          </p>

          <hr />
          <h4 className="mt-4">Giỏ Hàng:</h4>

          {cartItems.map((item) => (
            <Fragment key={item.product}>
              <hr />
              <div className="cart-item my-1">
                <div className="row">
                  <div className="col-4 col-lg-2">
                    <img src={item.image} alt="Laptop" height="45" width="65" />
                  </div>

                  <div className="col-5 col-lg-6">
                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                  </div>

                  <div className="col-4 col-lg-4 mt-4 mt-lg-0">
                    <p>
                      {item.quantity} x ${item.price} ={" "}
                      <b>${(item.quantity * item.price).toFixed(2)}</b>
                    </p>
                  </div>
                </div>
              </div>
              <hr />
            </Fragment>
          ))}
        </div>
        

        <div className="confirm-order-form">
          <h4>Hóa Đơn </h4>
          <hr />
          <p>
            Số Lượng:{" "}
            <span className="order-summary-values">${itemsPrice}</span>
          </p>
          <p>
            Vận Chuyển :{" "}
            <span className="order-summary-values">${shippingPrice}</span>
          </p>
          <p>
            Phí: <span className="order-summary-values">${taxPrice}</span>
          </p>

          <hr />

          <p>
            Tổng: <span className="order-summary-values">${totalPrice}</span>
          </p>

          <hr />
          <button className="confirm-order-card-btn" onClick={processToPayment}>
            Ngân Hàng (Bank card)
          </button>
          <button
            className="confirm-order-cash-btn"
            onClick={processToCashPayment}
          >
            Trực Tiếp (COD)
          </button>
          <div> <Link to="/shipping" className="btn btn-outline-danger btn-sm"  style={{  marginTop: '1rem',marginLeft:'175px'}}>Quay lại</Link></div>
        </div>
        
      </div>
      
    </Fragment>
  );
};

export default ConfirmOrder;
