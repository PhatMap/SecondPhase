import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getShopProducts } from "../../actions/productActions";

const ShopSetup = () => {
  const { products } = useSelector((state) => state.shopProducts);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getShopProducts());
  }, []);

  useEffect(() => {
    console.log(products);
  }, [products]);

  return (
    <>
      <div className="shop-setup-container">
        <div className="shop-setup-head-container"></div>
        <div className="shop-setup-body-container">
          <div className="shop-setup-section-container"></div>
          <div className="shop-setup-products-container"></div>
        </div>
      </div>
    </>
  );
};

export default ShopSetup;
