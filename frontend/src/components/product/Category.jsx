import React, { Fragment, useState, useEffect } from "react";
import Pagination from "react-js-pagination";
import MetaData from "../layout/MetaData";
import Product from "./Product";
import Loader from "../layout/Loader";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useParams, useNavigate } from "react-router-dom";

const Category = () => {
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedStar, setSelectedStar] = useState(0);

  const {
    loading,
    products,
    error,
    productsCount,
    resPerPage,
  } = useSelector((state) => state.category);

  let count = productsCount;

  const categories = ["Trousers", "Shirt", "Dress", "Shoe"];
  const categoriesVietnamese = {
    Trousers: "Quần Nam Nữ",
    Shirt: "Áo Nam Nữ",
    Dress: "Váy Nữ",
    Shoe: "Giày Nam Nữ",
  };

  const { keyword, category } = useParams();
  const navigate = useNavigate();

  function setCurrentPageNo(pageNumber) {
    setCurrentPage(pageNumber);
  }

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={"Real comfy"} />
          <div className="shop-container">
            <h1>{categoriesVietnamese[category]}</h1>
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
                        onClick={() => handleCategoryClick(category)}
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
                <div className="shop-filter-btns">
                  <button className="shop-filter-btn">Lọc</button>
                </div>

                <div className="shop-filter-btns">
                  <button className="shop-filter-btn">Xóa bộ lọc</button>
                </div>
              </div>

              <div className="shop-products-container">
                {products.map((product) => (
                  <Product key={product._id} product={product} />
                ))}
              </div>
            </div>
            <div className="shop-pagination">
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={
                  productsCount > resPerPage ? resPerPage : productsCount
                }
                totalItemsCount={productsCount > resPerPage ? productsCount : 1}
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
        </Fragment>
      )}
    </Fragment>
  );
};

export default Category;
