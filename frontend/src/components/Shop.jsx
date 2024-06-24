import React, { Fragment, useState, useEffect, useCallback } from "react";
import Pagination from "react-js-pagination";
import MetaData from "./layout/MetaData";
import Product from "./product/Product";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getProducts } from "../actions/productActions";
import "rc-slider/assets/index.css";
import { useParams } from "react-router-dom"; // Import useNavigate and Link
import Filter from "./layout/Filter";
import Header from "./layout/Header";
import Footer from "./layout/Footer";
import Loader from "./layout/Loader";

const Shop = () => {
  const dispatch = useDispatch();

  const { loading, products, error, productsCount, resPerPage } = useSelector(
    (state) => state.products
  );

  const { keyword, category } = useParams();

  const [currentPage, setCurrentPage] = useState(1);
  const [shop, setShop] = useState(products);

  const [selectedStar, setSelectedStar] = useState(0);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(category);

  function setCurrentPageNo(pageNumber) {
    setCurrentPage(pageNumber);
  }

  useEffect(() => {
    if (category || keyword) {
      setSelectedCategory(category);
      setCurrentPage(1);
      dispatch(
        getProducts(
          keyword ? keyword : "",
          1,
          [0, 1000000000],
          category ? category : "",
          0
        )
      );
    }
  }, [category, keyword]);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (currentPage) {
      dispatch(
        getProducts(
          keyword ? keyword : "",
          currentPage,
          [minPrice ? minPrice : 0, maxPrice ? maxPrice : 1000000000],
          selectedCategory ? selectedCategory : "",
          selectedStar ? selectedStar : 0
        )
      );
    }
  }, [currentPage]);

  useEffect(() => {
    if (products) {
      setShop(products);
    }
  }, [products]);

  return (
    <Fragment>
      <MetaData title={"Shop"} />
      <div className="shop-container background-1">
        <Header />
        <ToastContainer
          position="top-right"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        <h1>SHOP</h1>
        <div className="shop-products-filter-container">
          <Filter
            category={category}
            keyword={keyword}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            selectedStar={selectedStar}
            setSelectedStar={setSelectedStar}
            minPrice={minPrice}
            setMinPrice={setMinPrice}
            maxPrice={maxPrice}
            setMaxPrice={setMaxPrice}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "20px",
            }}
          >
            <div className="shop-products-container">
              {shop.map((product) => (
                <Product key={product._id} product={product} />
              ))}
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
        </div>
        <Footer />
      </div>
    </Fragment>
  );
};

export default Shop;
