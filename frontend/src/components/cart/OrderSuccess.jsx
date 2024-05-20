import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import MetaData from "../layout/MetaData";

const OrderSuccess = () => {
  return (
    <Fragment>
      <MetaData title={"Order Success"} />

      <div className="order-sucess-container">
        <img
          className="my-5 img-fluid d-block mx-auto"
          src="/images/order_success.png"
          alt="Order Success"
          width="200"
          height="200"
        />

        <h1>Your Order has been placed successfully.</h1>

        <Link to="/orders/me" className="order-success-after">
          Go to Orders
        </Link>
      </div>
    </Fragment>
  );
};

export default OrderSuccess;
