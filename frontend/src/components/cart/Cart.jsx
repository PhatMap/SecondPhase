import React, { Fragment, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import MetaData from "../layout/MetaData";
import { useDispatch, useSelector } from "react-redux";
import {
  addItemToCart,
  removeItemFromCart,
  getUserCart,
  getUserCartProduct,
} from "../../actions/cartActions";
import DeleteNotify from "../layout/DeleteNotify";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Cart = () => {
  const history = useNavigate();
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [selected, setSelected] = useState([]);

  const { cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);

  const removeCartItemHandler = async (id, variant, size) => {
    await dispatch(removeItemFromCart(id, variant, size));
    dispatch(getUserCart());
  };

  const increaseQty = async (index) => {
    const choosed = cartItems[index];

    const item = {
      product: choosed.product,
      variant: choosed.variant,
      inventory: choosed.inventory,
      name: choosed.name,
      variantName: choosed.variantName,
      price: choosed.price,
      image: choosed.image,
      quantity: 1,
      size: choosed.size,
    };

    const check = await dispatch(getUserCartProduct(item));

    if (check) {
      await dispatch(addItemToCart(item));
      dispatch(getUserCart());
      toast.success("Sản phẩm đã tăng số lượng trong giỏ hàng");
    } else {
      return toast.error("Giỏ hàng đã đạt số lượng hiện hữu của sản phẩm");
    }
  };

  const decreaseQty = async (index) => {
    const choosed = cartItems[index];

    const item = {
      product: choosed.product,
      variant: choosed.variant,
      inventory: choosed.inventory,
      name: choosed.name,
      variantName: choosed.variantName,
      price: choosed.price,
      image: choosed.image,
      quantity: -1,
      size: choosed.size,
    };

    if (choosed.quantity === 1) {
      return;
    }

    const check = await dispatch(getUserCartProduct(item));

    if (check) {
      await dispatch(addItemToCart(item));
      dispatch(getUserCart());
      toast.success("Sản phẩm đã giảm số lượng trong giỏ hàng");
    } else {
      return toast.error("Giỏ hàng đã đạt số lượng hiện hữu của sản phẩm");
    }
  };

  const checkoutHandler = () => {
    const itemsToCheckout = cartItems.filter(
      (item, index) => selectedItems[index]
    );
    localStorage.setItem("itemsToCheckout", JSON.stringify(itemsToCheckout));
    history("/login?redirect=/shipping");
  };

  const handlerQuantity = (e) => {
    const inputValue = e.target.value;

    if (inputValue > stock) {
      return;
    } else {
    }
  };

  const handleBlur = (e) => {
    const inputValue = e.target.value;
    if (inputValue === "") {
    }
  };

  const handleCheckboxChange = (index) => {
    const newSelectedItems = [...selectedItems];
    newSelectedItems[index] = !newSelectedItems[index];
    setSelectedItems(newSelectedItems);
    if (newSelectedItems[index] === true) {
      setSelected((prev) => [...prev, cartItems[index]]);
    } else {
      setSelected((prev) => prev.filter((item) => item !== cartItems[index]));
    }
  };

  const Choose = (value) => {
    setSelectedItems(new Array(cartItems.length).fill(value));
    if (value) {
      setSelected(cartItems);
    } else {
      setSelected([]);
    }
  };

  useEffect(() => {
    setSelectedItems(new Array(cartItems.length).fill(false));
  }, [cartItems]);

  return (
    <Fragment>
      <MetaData title={"Your Cart"} />
      {user ? (
        cartItems.length === 0 ? (
          <h1 className="cart-not-login">Giỏ Hàng Trống </h1>
        ) : (
          <Fragment>
            <div className="cart-items-container">
              <div className="cart-items">
                <h2 className="cart-status">
                  Giỏ Hàng có: <b>{cartItems.length} Sản Phẩm</b>
                </h2>
                <div style={{ display: "flex", gap: "20px" }}>
                  <button
                    style={{ color: "darkblue" }}
                    onClick={() => Choose(true)}
                  >
                    Chọn tất cả
                  </button>
                  <button
                    style={{ color: "red" }}
                    onClick={() => Choose(false)}
                  >
                    Bỏ chọn tất cả
                  </button>
                </div>
                {cartItems.map((item, index) => (
                  <div key={index}>
                    <div className="cart-item">
                      <div className="item-of-cart">
                        <input
                          type="checkbox"
                          checked={selectedItems[index]}
                          onChange={() => handleCheckboxChange(index)}
                        />
                        <img src={item.image} alt="Laptop" />

                        <Link
                          to={`/product/${item.product}`}
                          style={{ fontSize: "25px" }}
                        >
                          {item.name} - {item.variantName}
                        </Link>

                        <div className="">
                          <p className="cart-text cart-text-price ">
                            {item.price} VNĐ
                          </p>
                        </div>

                        <div className="">
                          <p className="cart-text cart-text-size">
                            {item.size}
                          </p>
                        </div>

                        <div className="stockCounter d-inline">
                          <span
                            className="btn btn-danger minus"
                            onClick={() => decreaseQty(index)}
                          >
                            -
                          </span>

                          <input
                            type="number"
                            className="form-control count d-inline"
                            value={item.quantity}
                            onChange={(e) => handlerQuantity(e)}
                            onBlur={(e) => handleBlur(e)}
                          />

                          <span
                            className="btn btn-primary plus"
                            onClick={() => increaseQty(index)}
                          >
                            +
                          </span>
                        </div>

                        <div>
                          <i
                            style={{ display: "flex", alignItems: "center" }}
                            className="fa fa-trash cart-delete-btn"
                            onClick={() => setShow(true)}
                          ></i>
                        </div>
                      </div>
                    </div>
                    {show && (
                      <DeleteNotify
                        func={removeCartItemHandler}
                        paras={[item.product, item.variant, item.size]}
                        show={setShow}
                      />
                    )}
                  </div>
                ))}
              </div>

              <div className="cart-checkout-container">
                <strong>
                  <h4
                    style={{ display: "flex", justifyContent: "center" }}
                    className="cart-status"
                  >
                    Hóa Đơn
                  </h4>
                </strong>
                <hr />
                <p>
                  Số Lượng:
                  <span className="order-summary-values">
                    {selected.reduce(
                      (acc, item) => acc + Number(item.quantity),
                      0
                    )}{" "}
                    Món
                  </span>
                </p>
                <p>
                  Tổng Thanh Toán:
                  <span className="order-summary-values">
                    {selected.reduce(
                      (acc, item) => acc + item.quantity * item.price,
                      0
                    )}{" "}
                    VNĐ
                  </span>
                </p>

                <hr />
                <button
                  className={`cart-checkout-btn ${selected.length === 0 && "disabled"}`}
                  onClick={checkoutHandler}
                >
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
