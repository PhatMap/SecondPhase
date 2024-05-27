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
  const [price, setPrice] = useState([1, 1000]);
  const [rating, setRating] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedStar, setSelectedStar] = useState(0);
  const [filtersApplied, setFiltersApplied] = useState(false);
  


  const dispatch = useDispatch();

  const { loading, products, error, productsCount, resPerPage, filteredProductsCount } = useSelector((state) => state.category);

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

  // useEffect(() => {
  //   dispatch(
  //     getProductsByCategory(keyword, currentPage, price, category, rating)
  //   );
  //   if (error) {
  //     toast.error(error);
  //   }
  // }, [dispatch, keyword, currentPage, price, category, rating, error]);
  
  const clearFilters = () => {
    setTempPrice(["", ""]); // Xóa giá trị tạm thời của giá sản phẩm
    setPrice([1, 1000]); // Đặt lại giá sản phẩm mặc định
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
    
    if (
      minPrice < 0 ||
      maxPrice > 1000 ||
      minPrice > maxPrice ||
      isNaN(minPrice) ||
      isNaN(maxPrice)
    ) {
      // Thông báo khi điều kiện không thỏa mãn
      toast.error("Vui lòng nhập số, Giá thấp nhất thấp hơn giá cao nhất và trong khoảng 0$ đến 1000$");
    } else {
      // Áp dụng bộ lọc thành công
      setPrice([minPrice, maxPrice]);
      setFiltersApplied(true); // Cập nhật trạng thái bộ lọc đã áp dụng
    }
  };
  
  useEffect(() => {
    if (!tempPrice[0] && !tempPrice[1]) {
      setTempPrice(["0", "1000"]);
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
                      type="text"
                      id="min_price"
                      className="register-form-control"
                      placeholder="Giá Thấp Nhất"
                      value={tempPrice[0]}
                      onChange={handleMinPriceChange}
                    />
                    <label htmlFor="max_price">Giá Cao Nhất</label>
                    <input
                      type="text"
                      id="max_price"
                      className="register-form-control"
                      placeholder="Giá Cao Nhất"
                      value={tempPrice[1]}
                      onChange={handleMaxPriceChange}
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
            {resPerPage <= productsCount && (
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

export default Category;
