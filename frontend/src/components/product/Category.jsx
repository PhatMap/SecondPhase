import React, { Fragment, useState, useEffect } from "react";
import Pagination from "react-js-pagination";
import MetaData from "../layout/MetaData";
import Product from "./Product";
import Loader from "../layout/Loader";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useParams, useNavigate } from "react-router-dom";
import { getProductsByCategory } from "../../actions/productActions";

const Category = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [tempPrice, setTempPrice] = useState(["", ""]);
  const [price, setPrice] = useState([1, 1000000]);
  const [rating, setRating] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedStar, setSelectedStar] = useState(0);
  const [filtersApplied, setFiltersApplied] = useState(false);
  
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);
  const [minPriceError, setMinPriceError] = useState("");
  const [maxPriceError, setMaxPriceError] = useState("");


  const dispatch = useDispatch();

  const { loading, products, error, productsCount, resPerPage, filteredProductsCount } = useSelector((state) => state.category);
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


  const clearFilters = () => {
    setTempPrice(["", ""]); // Xóa giá trị tạm thời của giá sản phẩm
    setPrice([1, 1000000]); // Đặt lại giá sản phẩm mặc định
    setRating(0); // Đặt lại xếp hạng mặc định
    setSelectedCategory(null); // Bỏ chọn danh mục
    setSelectedStar(0); // Bỏ chọn số sao
    setFiltersApplied(false); // Đặt lại trạng thái bộ lọc đã áp dụng
  
    // Điều hướng về trang shop
    navigate('/shop');
  };
  

  const handleCategoryClick = (selectedCategory) => {
    setSelectedCategory(selectedCategory); // Cập nhật danh mục được chọn
    navigate(`/category/${selectedCategory}`);
  };

  const handleStarClick = (selectedRating) => {
    setRating(selectedRating);
    setSelectedStar(selectedRating); // Cập nhật số sao được chọn
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
  
    if (maxPrice > 1000000 || isNaN(maxPrice)) {
      setMaxPriceError("Nhỏ hơn hoặc bằng 1000000");
      return;
    } else {
      setMaxPriceError("");
    }
  
    if (minPrice >= maxPrice) {
      setMinPriceError("Giá thấp nhất < Giá cao nhất");
      return;}
     else {
      setPrice([minPrice, maxPrice]);
      setFiltersApplied(true); 
    }
  };
  
  useEffect(() => {
    if (!tempPrice[0] && !tempPrice[1]) {
      setTempPrice(["0", "1000000"]);
    }
    if (filtersApplied) {
      dispatch(
        getProductsByCategory(keyword, currentPage, price, category, rating)
      );
      if (error) {
        toast.error(error);
      }
      setFiltersApplied(false); // Đặt lại state sau khi đã áp dụng bộ lọc
    }
  }, [dispatch, keyword, currentPage, price, category, rating, error, filtersApplied]);
    
 
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
                      value={tempPrice[0]}
                      onChange={handleMinPriceChange}
                    /> {minPriceError && <p style={{ color: "red",fontSize: '15px' }}>{minPriceError}</p>}
                    <label htmlFor="max_price">Giá Cao Nhất</label>
                    <input
                      type="number"
                      id="max_price"
                      className="register-form-control"
                      placeholder="Giá Cao Nhất"
                      value={tempPrice[1]}
                      onChange={handleMaxPriceChange}
                    /> {maxPriceError && <p style={{ color: "red", fontSize: '15px',  }}>{maxPriceError}</p>}
                  </div>
                </div>
                <div className="shop-filter-categories">
                  <h4>Danh Mục</h4>
                  <ul className="shop-filter-category">
                    {categories.map((category) => (
                      <li
                        key={category}
                        onClick={() => handleCategoryClick(category)}
                        className={selectedCategory === category ? 'selected-category' : ''}
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
                  <div className={`rating-outer ${star === selectedStar ? 'selected-star' : ''}`}>
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
                  <div className="d-flex justify-content-center mt-5">
                    <Pagination
                      activePage={currentPage}
                      itemsCountPerPage={resPerPage}
                      totalItemsCount={productsCount}
                      onChange={setCurrentPageNo}
                      nextPageText={"Next"}
                      prevPageText={"Prev"}
                      firstPageText={"First"}
                      lastPageText={"Last"}
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

export default Category;
