import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getShopProducts } from "../../actions/productActions";
import Section from "./Section";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ShopSetup = () => {
  const { products } = useSelector((state) => state.shopProducts);

  const dispatch = useDispatch();
  const [show, setShow] = useState(false);

  useEffect(() => {
    dispatch(getShopProducts());
  }, []);

  return (
    <>
      <ToastContainer />
      {show && <Section onClose={() => setShow(false)} />}
      <div className="shop-setup-container">
        <div className="shop-setup-head-container"></div>
        <div className="shop-setup-body-container">
          <div className="shop-setup-section-container">
            <button className="fa fa-plus" onClick={() => setShow(true)}>
              Thêm mục
            </button>
          </div>
          <div className="shop-setup-products-container"></div>
        </div>
      </div>
    </>
  );
};

export default ShopSetup;
