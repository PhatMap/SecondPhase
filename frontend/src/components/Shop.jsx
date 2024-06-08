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

const Shop = () => {
  const dispatch = useDispatch();

  const { loading, products, error, productsCount, resPerPage } = useSelector(
    (state) => state.products
  );

  const [currentPage, setCurrentPage] = useState(1);
  const [categoryPage, setCategoryPage] = useState(1);

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedStar, setSelectedStar] = useState(0);
  const [shop, setShop] = useState(products);

  const { keyword, category } = useParams();

  function setCurrentPageNo(pageNumber) {
    setCurrentPage(pageNumber);
  }

  useEffect(() => {
    dispatch(getProducts(keyword, currentPage, [0, 1000000000], category, 0));
  }, [dispatch, keyword, category, currentPage]);

  useEffect(() => {
    setShop(products);
  }, [products]);

  return (
    <Fragment>
      <MetaData title={"Shop"} />
      <div className="shop-container background-1">
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
          <Filter setShop={setShop} />

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
      </div>
    </Fragment>
  );
};

export default Shop;
