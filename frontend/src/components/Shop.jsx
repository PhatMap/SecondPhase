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
import { useParams, useNavigate } from "react-router-dom"; // Import useNavigate
import ProductCarousel from "./layout/Carousel";
import { useLocation } from "react-router-dom";

const Shop = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([1, 1000]);
  const [rating, setRating] = useState(0);
  const [category, setCategory] = useState("");
  const [cols, setCols] = useState(4); // Số cột cho sản phẩm

  const categories = ["Trousers", "Shirt", "Dress", "Shoe", "Belt"];
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
    dispatch(getProducts(keyword, currentPage, price, rating));
    if (error) {
      toast.error(error);
    }
  }, [dispatch, keyword, currentPage, price, rating, error]);

  function setCurrentPageNo(pageNumber) {
    setCurrentPage(pageNumber);
  }

  const handleCategoryClick = (selectedCategory) => {
    navigate(`/category/${selectedCategory}`);
  };

  // Render danh sách sản phẩm
  const renderProducts = () => {
    return (
      <div className="row">
        {products.map((product) => (
          <Product
            key={product._id}
            product={product}
            col={cols}
            className="product-item"
          />
        ))}
      </div>
    );
  };

  const isSearchKeyword = keyword && keyword.trim() !== "";

  let count = productsCount;
  if (isSearchKeyword) {
    count = filteredProductsCount;
  }

  const location = useLocation();

  useEffect(() => {
    if (location.state?.fromFiveStar) {
      setRating(5); // chỉ hiển thị sản phẩm có 5 sao
    }
  }, [location]);

  const [color, setColor] = useState(""); // State để lưu màu được chọn
  const colors = [
    "black",
    "white",
    "red",
    "blue",
    "green",
    "yellow",
    "orange",
    "purple",
    "pink",
    "gray",
  ]; // Danh sách màu

  const handleColorChange = (selectedColor) => {
    console.log("Color selected: ", selectedColor);
    setColor(selectedColor);
    navigate(`/shop/color/${selectedColor}`); // Đảm bảo rằng đây là URL và route đúng
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
                <div className="shop-slider">
                  <div className="shop-slider-values">
                    <p>${price[0]}</p>
                    <p>${price[price.length - 1]}</p>
                  </div>
                  <Slider
                    min={1}
                    max={1000}
                    defaultValue={[1, 1000]}
                    tipFormatter={(values) =>
                      values.map((value) => `$${value}`)
                    }
                    tipProps={{
                      placement: "top",
                      visible: true,
                    }}
                    range
                    value={price}
                    onChange={(price) => setPrice(price)}
                  />
                </div>
                <div className="shop-filter-categories">
                  <h4>Categories</h4>
                  <ul className="shop-filter-category">
                    {categories.map((category) => (
                      <li
                        key={category}
                        onClick={() => handleCategoryClick(category)} // Sử dụng hàm handleCategoryClick khi nhấp vào danh mục
                      >
                        {category}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="shop-filter-ratings">
                  <h4>Ratings</h4>
                  <ul className="shop-filter-rating">
                    {[5, 4, 3, 2, 1].map((star) => (
                      <li key={star} onClick={() => setRating(star)}>
                        <div className="rating-outer">
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
                <button className="shop-filter-btn">Filter</button>
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

export default Shop;
