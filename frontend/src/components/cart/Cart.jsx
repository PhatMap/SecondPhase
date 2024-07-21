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
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { formatToVNDWithVND } from "../../utils/formatHelper";
import Header from "../layout/Header";

const Cart = () => {
  const history = useNavigate();
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [selected, setSelected] = useState([]);
  const [all, setAll] = useState(false);

  const { cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);

  const removeCartItemHandler = async (id, variant, size) => {
    for (const item of selected) {
      await dispatch(removeItemFromCart(item.product, item.variant, item.size));
    }
    dispatch(getUserCart());
    setSelected([]);
    setShow(false);
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
    setNewQuantity(e.target.value);
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
    setAll(value);
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


  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [currentItemIndex, setCurrentItemIndex] = useState(null);
  const [newQuantity, setNewQuantity] = useState();
  const openModal = (index) => {
    setCurrentItemIndex(index);
    setNewQuantity(cartItems[index].quantity);
    setModalIsOpen(true);
  };
  
  const closeModal = () => {
    setModalIsOpen(false);
    setCurrentItemIndex(null);
  };
  const updateQuantity = async () => {
    if (currentItemIndex === null) return;
    let inputValue = parseInt(newQuantity);
    if (isNaN(inputValue) || inputValue < 1) {
      toast.error('Vui lòng nhập lại số lượng hợp lệ');
      return;
    }
    const choosed = cartItems[currentItemIndex];
  
    const item = {
      product: choosed.product,
      variant: choosed.variant,
      inventory: choosed.inventory,
      name: choosed.name,
      variantName: choosed.variantName,
      price: choosed.price,
      image: choosed.image,
      quantity: newQuantity - choosed.quantity,
      size: choosed.size,
    };
  
    const check = await dispatch(getUserCartProduct(item));
  
    if (check) {
      await dispatch(addItemToCart(item));
      dispatch(getUserCart());
      toast.success("Sản phẩm đã cập nhật số lượng trong giỏ hàng");
      closeModal();
    } else {
      toast.error("Số lượng vượt quá số lượng hiện hữu của sản phẩm");
    }
  };
      


  return (
    <Fragment>
      <Header color={"black"}/>
      <MetaData title={"Your Cart"} />
        {user ? (
          cartItems.length === 0 ? (
            <h1 className="cart-not-login">Giỏ Hàng Trống </h1>
          ) : (
            <Fragment>
              <ToastContainer />
              <div className="cart-items-container">
                <div className="cart-items">
                  <div style={{ display: "flex", gap: "20px" }}>
                    <h2 className="cart-status">
                      Giỏ Hàng có: <b>{cartItems.length} Sản Phẩm</b>
                    </h2>
                    <button
                      className={`cart-select-all-btn ${all && "active"}`}
                      onClick={() => Choose(!all)}
                    >
                      {all ? "Bỏ Chọn Tất Cả" : "Chọn Tất Cả"}
                    </button>
                    {selected.length > 0 && (
                  <button
                  className={`cart-select-all-btn ${all && "active"}`}
                    onClick={() => setShow(true)}
                  >
                    Xóa Đã Chọn
                  </button>
                )}
                  </div>
                  {cartItems.map((item, index) => (
                    <div key={index}>
                      <div className="cart-item">
                        <div className="item-of-cart">
                          <div className="item-cart-down">
                            <img src={item.image} alt="No image" />
                            <div
                              style={{
                                display: "flex",
                                width: "100%",
                                height: "100%",
                                justifyContent: "space-between",
                              }}
                            >
                              <div
                                style={{
                                  display: "flex",
                                  flexDirection: "column",
                                  justifyContent: "space-between",
                                }}
                              >
                                <div
                                  style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: "15px",
                                  }}
                                >
                                  <div
                                    style={{
                                      display: "flex",
                                      gap: "10px",
                                      alignItems: "center",
                                    }}
                                  >
                                    <p style={{ fontWeight: "bold" }}>
                                      Tên sản phẩm:
                                    </p>
                                    <Link
                                      to={`/product/${item.product}`}
                                      style={{ color: "black" }}
                                    >
                                      {item.name}
                                    </Link>
                                  </div>

                                  <div style={{ display: "flex", gap: "80px" }}>
                                    <div
                                      style={{
                                        display: "flex",
                                        gap: "10px",
                                        alignItems: "center",
                                      }}
                                    >
                                      <p style={{ fontWeight: "bold" }}>Mẫu:</p>
                                      {item.variantName}
                                    </div>
                                    <div
                                      style={{
                                        display: "flex",
                                        gap: "10px",
                                        alignItems: "center",
                                      }}
                                    >
                                      <p style={{ fontWeight: "bold" }}>
                                        Kích thước:
                                      </p>
                                      <p className="cart-text">{item.size}</p>
                                    </div>
                                    <div
                                      style={{
                                        display: "flex",
                                        gap: "10px",
                                        alignItems: "center",
                                      }}
                                    >
                                      <p style={{ fontWeight: "bold" }}>
                                        Đơn giá:
                                      </p>
                                      <p className="cart-text">
                                        {formatToVNDWithVND(item.price)}
                                      </p>
                                    </div>
                                  </div>
                                </div>

                                <div className="cart-item-stock">
                                  <p style={{ fontWeight: "bold" }}>
                                    Số lượng:
                                  </p>
                                  <input
                                    type="text"
                                    className=""
                                    value={item.quantity}
                                    onClick={() => openModal(index)}
                                    onBlur={(e) => handleBlur(e)}
                                    readOnly
                                  />
                                  <span
                                    className="cart-item-btn minus"
                                    onClick={() => decreaseQty(index)}
                                  >
                                    -
                                  </span>
                                  <span
                                    className="cart-item-btn plus"
                                    onClick={() => increaseQty(index)}
                                  >
                                    +
                                  </span>
                                </div>
                              
                                <div className="input-quantity-container" style={{ display: modalIsOpen ? 'flex' : 'none' }}>
                              <div className="input-quantity-form">
                                <h1>Nhập số lượng</h1>
                                <input
                                  type="text"
                                  value={newQuantity}
                                  onChange={(e) => handlerQuantity(e)}
                                  className="centered-input"
                                />

                                <div className="input-quantity-btn-container">
                                <button className="input-quantity-btn-container-yes" onClick={updateQuantity}>
                                    Câp Nhật
                                  </button>
                                  <button className="input-quantity-btn-container-no" onClick={closeModal}>
                                    Thoát
                                  </button>

                                </div>
                              </div>
                            </div>


                              </div>
                              <div
                                style={{
                                  display: "flex",
                                  flexDirection: "column",
                                  justifyContent: "space-between",
                                  alignItems: "center",
                                }}
                              >
                                <input
                                  type="checkbox"
                                  checked={selectedItems[index]}
                                  onChange={() => handleCheckboxChange(index)}
                                  className="cart-checkbox"
                                />
                                {/* <i
                                  className="fa fa-trash cart-delete-btn"
                                  onClick={() => setShow(true)}
                                ></i> */}
                              </div>
                            </div>
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
                      {formatToVNDWithVND(
                        selected.reduce(
                          (acc, item) => acc + item.quantity * item.price,
                          0
                        )
                      )}
                    </span>
                  </p>

                  <hr />
                  <button
                    className={`cart-checkout-btn ${
                      selected.length === 0 && "disabled"
                    }`}
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
