import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getShopProducts } from "../../actions/productActions";
import Section from "./Section";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getShop } from "../../actions/shopActions";

const ShopSetup = () => {
  const { products } = useSelector((state) => state.shopProducts);
  const { shop, shopData } = useSelector((state) => state.shop);

  const dispatch = useDispatch();
  const [show, setShow] = useState(false);

  useEffect(() => {
    dispatch(getShop());
  }, []);

  useEffect(() => {
    if (shopData) {
      console.log(shop);

      console.log(shopData);
    }
  }, [shopData]);

  return (
    <>
      <ToastContainer />
      {show && <Section onClose={() => setShow(false)} />}
      <div className="shop-setup-container">
        <div className="shop-setup-head-container">
          <div className="shop-setup-profile-container">
            {shopData && shopData.shopInfor && (
              <h1 key="shop-name">{shopData.shopInfor.ownerName}</h1>
            )}{" "}
          </div>
        </div>
        <div className="shop-setup-body-container">
          <div className="shop-setup-section-container">
            <button className="fa fa-plus" onClick={() => setShow(true)}>
              Thêm mục
            </button>
            <div className="shop-setup-sections">
              {shop &&
                shop.sections &&
                shop.sections.map((section, sectionIndex) => (
                  <div
                    key={`section-${sectionIndex}`}
                    className="shop-setup-section"
                  >
                    <h1>{section.name}</h1>
                    {section.images &&
                      section.images.map((image, imageIndex) => (
                        <img
                          key={`image-${sectionIndex}-${imageIndex}`}
                          src={image.url}
                          alt={`Section ${sectionIndex} Image ${imageIndex}`}
                        />
                      ))}
                    <h1>{section.categoryId}</h1>
                  </div>
                ))}
            </div>
          </div>
          <div className="shop-setup-products-container"></div>
        </div>
      </div>
    </>
  );
};

export default ShopSetup;
