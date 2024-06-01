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
  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([1, 10000]);
  const [tempPrice, setTempPrice] = useState(["", ""]);
  const [rating, setRating] = useState(0);
  const [category, setCategory] = useState("");
  const [cols, setCols] = useState(4); // Số cột cho sản phẩm
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedStar, setSelectedStar] = useState(0);
  const [filtersApplied, setFiltersApplied] = useState(false);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);
  const [minPriceError, setMinPriceError] = useState("");
  const [maxPriceError, setMaxPriceError] = useState("");

  const categories = ["Trousers", "Shirt", "Dress", "Shoe"];
  const categoriesVietnamese = {
    Trousers: "Quần Nam Nữ",
    Shirt: "Áo Nam Nữ",
    Dress: "Váy Nữ",
    Shoe: "Giày Nam Nữ",
  };
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    loading,
    products,
    error,
    productsCount,
    resPerPage,
    filteredProductsCount,
  } = useSelector((state) => state.products);

  const { keyword } = useParams();

  useEffect(() => {
    if (tempPrice[0] === "" && tempPrice[1] === "") {
      setTempPrice(["0", "10000"]);
    }
    if (!filtersApplied) {
      dispatch(getProducts(keyword, currentPage, price, rating));
      if (error) {
        toast.error(error);
      }
      setFiltersApplied(false);
    }
  }, [
    dispatch,
    keyword,
    currentPage,
    price,
    rating,
    error,
    selectedStar,
    filtersApplied,
  ]);

  function setCurrentPageNo(pageNumber) {
    setCurrentPage(pageNumber);
  }

  const handleCategoryClick = (selectedCategory) => {
    navigate(`/category/${selectedCategory}`);
  };

  const handleMinPriceChange = (e) => {
    setTempPrice([e.target.value, tempPrice[1]]);
  };

  const handleMaxPriceChange = (e) => {
    setTempPrice([tempPrice[0], e.target.value]);
  };

  const applyFilters = () => {
    const minPrice = Number(tempPrice[0]);
    const maxPrice = Number(tempPrice[1]);

    if (minPrice < 0 || isNaN(minPrice)) {
      setMinPriceError("Lớn hơn hoặc bằng 0");
      return;
    } else {
      setMinPriceError("");
    }

    if (maxPrice > 10000 || isNaN(maxPrice)) {
      setMaxPriceError("Nhỏ hơn hoặc bằng 10000");
      return;
    } else {
      setMaxPriceError("");
    }

    if (minPrice >= maxPrice) {
      setMinPriceError("Giá thấp nhất < Giá cao nhất");
      return;
    } else {
      setPrice([minPrice, maxPrice]);
      dispatch(getProducts(keyword, currentPage, [minPrice, maxPrice], rating));
      setFiltersApplied(true); // Cập nhật state khi áp dụng bộ lọc
    }
  };

  const clearFilters = () => {
    setTempPrice(["", ""]); // Xóa giá trị tạm thời của giá sản phẩm
    setPrice([1, 10000]); // Đặt lại giá sản phẩm mặc định
    setRating(0); // t lại xếp hạng mặc định
    setSelectedStar(0);
    dispatch(getProducts(keyword, currentPage, price, rating));
    navigate("/shop"); // Điều hướng về trang shop
  };
  const handleStarClick = (selectedRating) => {
    setRating(selectedRating);
    setSelectedStar(selectedRating); // Cập nhật số sao được chọn
  };

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
                      value={tempPrice[0]}
                      onChange={handleMinPriceChange}
                    />
                    {minPriceError && (
                      <p style={{ color: "red", fontSize: "15px" }}>
                        {minPriceError}
                      </p>
                    )}
                    <label htmlFor="max_price">Giá Cao Nhất</label>
                    <input
                      type="number"
                      id="max_price"
                      className="register-form-control"
                      placeholder="Giá Cao Nhất"
                      value={tempPrice[1]}
                      onChange={handleMaxPriceChange}
                    />
                    {maxPriceError && (
                      <p style={{ color: "red", fontSize: "15px" }}>
                        {maxPriceError}
                      </p>
                    )}
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
                  <button className="shop-filter-btn" onClick={applyFilters}>
                    Lọc
                  </button>
                </div>

                <div className="shop-filter-btns">
                  <button className="shop-filter-btn" onClick={clearFilters}>
                    Xóa bộ lọc
                  </button>
                </div>
              </div>
              <div className="shop-products-container">
                {products.map((product) => (
                  <Product key={product._id} product={product} />
                ))}
              </div>
            </div>
            {productsCount > resPerPage && (
              <div className="shop-pagination">
                <Pagination
                  activePage={currentPage}
                  itemsCountPerPage={resPerPage}
                  totalItemsCount={productsCount}
                  onChange={setCurrentPageNo}
                  nextPageText={"Tiếp"}
                  prevPageText={"Trước"}
                  firstPageText={"Đầu"}
                  lastPageText={"Cuối"}
                  itemClass="page-item"
                  linkClass="page-link"
                />
              </div>
            )}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Shop;
