import React, { Fragment, useState, useEffect } from "react";
import Pagination from "react-js-pagination";
import MetaData from "./layout/MetaData";
import Product from "./product/Product";
import Loader from "./layout/Loader";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getProducts } from "../actions/productActions";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { useParams, useNavigate, Link } from "react-router-dom"; // Import useNavigate and Link
import ProductCarousel from "./layout/Carousel";
import { useLocation } from "react-router-dom";

const Shop = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedStar, setSelectedStar] = useState(0);
  const [prices, setPrices] = useState([0, 1000000]);

  const categories = ["Trousers", "Shirt", "Dress", "Shoe"];
  const categoriesVietnamese = {
    Trousers: "Quần Nam Nữ",
    Shirt: "Áo Nam Nữ",
    Dress: "Váy Nữ",
    Shoe: "Giày Nam Nữ",
  };

  const {
    loading,
    products,
    error,
    productsCount,
    resPerPage,
    filteredProductsCount,
  } = useSelector((state) => state.products);

  const { keyword } = useParams();

  function setCurrentPageNo(pageNumber) {
    setCurrentPage(pageNumber);
  }

  useEffect(() => {
    dispatch(getProducts(keyword, currentPage, prices, selectedStar));
  }, [dispatch, keyword, prices, currentPage, selectedStar]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={"Shop"} />
          <div className="shop-container background-1">
            <h1>SHOP</h1>
            <div className="shop-products-filter-container">
              <div className="shop-filter">
                <div className="shop-filter-prices">
                  <h4>Giá Sản Phẩm</h4>
                  <div className="shop-filter-price">
                    <label htmlFor="min_price">Giá Thấp Nhất</label>
                    <input
                      type="number"
                      id="min_price"
                      className="register-form-control"
                      placeholder="Giá Thấp Nhất"
                    />

                    <label htmlFor="max_price">Giá Cao Nhất</label>
                    <input
                      type="number"
                      id="max_price"
                      className="register-form-control"
                      placeholder="Giá Cao Nhất"
                    />
                  </div>
                </div>
                <div className="shop-filter-categories">
                  <h4>Danh Mục</h4>
                  <ul className="shop-filter-category">
                    {categories.map((category) => (
                      <li
                        key={category}
                        className={
                          selectedCategory === category
                            ? "selected-category"
                            : ""
                        }
                      >
                        {categoriesVietnamese[category]}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="shop-filter-ratings">
                  <h4>Xếp Hạng</h4>
                  <ul className="shop-filter-rating">
                    {[5, 4, 3, 2, 1].map((star) => (
                      <li key={star} onClick={() => handleStarClick(star)}>
                        <div
                          className={`rating-outer ${
                            star === selectedStar ? "selected-star" : ""
                          }`}
                        >
                          <div
                            className="rating-inner"
                            style={{
                              width: `${star * 20}%`,
                            }}
                          ></div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="shop-filter-btn-container">
                  <button className="shop-filter-btn">Lọc</button>
                  <button className="shop-filter-btn">Xóa bộ lọc</button>
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "20px",
                }}
              >
                <div className="shop-products-container">
                  {products.map((product) => (
                    <Product key={product._id} product={product} />
                  ))}
                </div>
                <div className="shop-pagination">
                  <Pagination
                    activePage={currentPage}
                    itemsCountPerPage={
                      productsCount > resPerPage ? resPerPage : productsCount
                    }
                    totalItemsCount={
                      productsCount > resPerPage ? productsCount : 1
                    }
                    onChange={setCurrentPageNo}
                    nextPageText={"Tiếp"}
                    prevPageText={"Trước"}
                    firstPageText={"Đầu"}
                    lastPageText={"Cuối"}
                    itemClass="page-item"
                    linkClass="page-link"
                  />
                </div>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Shop;
