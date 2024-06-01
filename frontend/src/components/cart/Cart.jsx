import React, { Fragment, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import MetaData from "../layout/MetaData";
import { useDispatch, useSelector } from "react-redux";
import {
  addItemToCart,
  removeItemFromCart,
  getUserCart,
} from "../../actions/cartActions";
import DeleteNotify from "../layout/DeleteNotify";

const Cart = () => {
  const history = useNavigate();
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);

  const { cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);

  const removeCartItemHandler = async (id, size) => {
    await dispatch(removeItemFromCart(id, size));
    dispatch(getUserCart());
  };

  const increaseQty = async (index, id, size, colorName, colorHex) => {
    let newQty = cartItems[index].quantity + 1;

    await dispatch(addItemToCart(id, newQty, size, colorName, colorHex));
    dispatch(getUserCart());
  };

  const decreaseQty = async (index, id, size, colorName, colorHex) => {
    let newQty = cartItems[index].quantity - 1;

    await dispatch(addItemToCart(id, newQty, size, colorName, colorHex));
    dispatch(getUserCart());
  };

  const checkoutHandler = () => {
    history("/login?redirect=/shipping");
  };

  return (
    <Fragment>
      <MetaData title={"Your Cart"} />
      {user ? (
        cartItems.length === 0 ? (
          <h2 className="cart-not-login">Giỏ Hàng Trống </h2>
        ) : (
          <Fragment>
            <h2 className="cart-status">
              Giỏ Hàng có: <b>{cartItems.length} Sản Phẩm</b>
            </h2>

            <div className="cart-items-container">
              <div className="cart-items">
                {cartItems.map((item, index) => (
                  <Fragment key={item.product}>
                    <div className="cart-item">
                      <div className="row">
                        <div className="col-4 col-lg-3">
                          <img
                            src={item.image}
                            alt="Laptop"
                            height="90"
                            width="115"
                          />
                        </div>

                        <div className="col-5 col-lg-3">
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </div>

                        <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                          <p className="cart-text cart-text-price ">
                            ${item.price}
                          </p>
                        </div>

                        <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                          <p className="cart-text cart-text-size">
                            {item.size}
                          </p>
                        </div>

                        <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                          <div className="stockCounter d-inline">
                            <span
                              className={`btn btn-danger minus ${
                                item.quantity <= 1 ? "disabled" : ""
                              }`} // Thêm class disabled nếu số lượng là 1 hoặc nhỏ hơn
                              onClick={() =>
                                decreaseQty(
                                  index,
                                  item.product,
                                  item.size,
                                )
                              }
                              disabled={item.quantity <= 1} // Vô hiệu hóa nút khi số lượng là 1 hoặc nhỏ hơn
                            >
                              -
                            </span>

                            <input
                              type="number"
                              className="form-control count d-inline"
                              value={item.quantity}
                              readOnly
                            />

                            <span
                              className="btn btn-primary plus"
                              onClick={() =>
                                increaseQty(
                                  index,
                                  item.product,
                                  item.size,
                                )
                              }
                            >
                              +
                            </span>
                          </div>
                        </div>
                      </div> 

                      <i
                        className="fa fa-trash cart-delete-btn"
                        onClick={() => setShow(true)}
                      ></i>
                      {show && (
                        <DeleteNotify
                          func={removeCartItemHandler}
                          paras={[item.product, item.size]}
                          show={setShow}
                        />
                      )}
                    </div>
                  </Fragment>
                ))}
              </div>

              <div className="cart-checkout-container">
                <h4>Hóa Đơn </h4>
                <hr />
                <p>
                  Số Lượng:{" "}
                  <span className="order-summary-values">
                    {cartItems.reduce(
                      (acc, item) => acc + Number(item.quantity),
                      0
                    )}{" "}
                    (Units)
                  </span>
                </p>
                <p>
                  Tổng Thanh Toán:{" "}
                  <span className="order-summary-values">
                    $
                    {cartItems
                      .reduce(
                        (acc, item) => acc + item.quantity * item.price,
                        0
                      )
                      .toFixed(2)}
                  </span>
                </p>

                <hr />
                <button className="cart-checkout-btn" onClick={checkoutHandler}>
                  Thanh Toán
                </button>
              </div>
            </div>
          </Fragment>
        )
      ) : (
        <h2 className="cart-not-login">Login to see your cart</h2>
      )}
    </Fragment>
  );
};

export default Cart;
