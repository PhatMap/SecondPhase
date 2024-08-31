import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getShopProducts } from "../../actions/productActions";
import Section from "./section/Section";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getShop } from "../../actions/shopActions";
import Product from "../product/Product";
import ManageSection from "./section/ManageSection";
import { getCategoryAll } from "../../actions/categoryActions";
import ChangeAvatar from "./ChangeAvatar";

const ShopSetup = () => {
  const { products } = useSelector((state) => state.shopProducts);
  const { shop, shopData } = useSelector((state) => state.shop);
  const { categories } = useSelector((state) => state.category);

  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [changeAvatar, setChangeAvatar] = useState(false);

  useEffect(() => {
    dispatch(getShop());
    dispatch(getShopProducts(shop._id));
    dispatch(getCategoryAll());
  }, []);

  useEffect(() => {
    if (shop) {
      console.log(shop);
    }
  }, [shop]);

  return (
    <>
      <ToastContainer />
      {show && (
        <ManageSection
          onClose={() => setShow(false)}
          shop={shop}
          categories={categories}
        />
      )}
      {changeAvatar && (
        <ChangeAvatar
          onClose={() => setChangeAvatar(false)}
          avatar={shop.avatar}
        />
      )}
      <div className="shop-setup-container">
        <div className="shop-setup-head-container">
          <div className="shop-setup-profile-container">
            <figure className="avatar">
              {shop && shop.avatar && (
                <img
                  className="rounded-circle img-fluid"
                  src={shop.avatar.url}
                  alt="Ảnh Đại Diện"
                />
              )}
              <i className="fa fa-edit" onClick={() => setChangeAvatar(true)} />
            </figure>
            {shopData && shopData.shopInfor && (
              <h1 key="shop-name">{shopData.shopInfor.ownerName}</h1>
            )}
          </div>
        </div>
        <div className="shop-setup-body-container">
          <button className="fa fa-gear" onClick={() => setShow(true)}>
            Điều chỉnh danh mục
          </button>
          <div className="shop-setup-sections">
            {shop &&
              shop.sections &&
              shop.sections.map((section, sectionIndex) => (
                <div
                  key={`section-${sectionIndex}`}
                  className="shop-setup-section"
                >
                  <div>
                    {section.images &&
                      section.images.map((image, imageIndex) => (
                        <img
                          key={`image-${sectionIndex}-${imageIndex}`}
                          src={image.url}
                          alt={`Section ${sectionIndex} Image ${imageIndex}`}
                        />
                      ))}
                  </div>
                  <div className="home-component">
                    <h1>{section.name}</h1>
                    <div className="home-new-products">
                      {section.products.slice(0, 4).map((product) => (
                        <Product key={product._id} product={product} />
                      ))}
                    </div>
                    <button className="more-text-btn">Xem Thêm</button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ShopSetup;
