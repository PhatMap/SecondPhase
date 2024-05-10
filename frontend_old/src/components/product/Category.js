import React, { Fragment, useState, useEffect } from "react";
import Pagination from "react-js-pagination";
import MetaData from "../layout/MetaData";
import Product from "../product/Product";
import Loader from "../layout/Loader";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { useParams, useNavigate } from "react-router-dom";
import { getProductsByCategory } from "../../actions/productActions";

const Category = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([1, 1000]);
  const [rating, setRating] = useState(0);

  const dispatch = useDispatch();

  const { loading, products, error, productsCount, resPerPage, filteredProductsCount } = useSelector((state) => state.category);
  const categories = [  
          "Trousers",
          "Shirt",
          "Dress",
          "Shoe",
          "Belt",];

  const { keyword, category } = useParams();
  const navigate = useNavigate();

  function setCurrentPageNo(pageNumber) {
    setCurrentPage(pageNumber);
  }

  useEffect(() => {
    dispatch(getProductsByCategory(keyword, currentPage, price, category, rating));
    if (error) {
      toast.error(error, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  }, [dispatch, keyword, currentPage, price, category, rating, error]);

  const handleCategoryClick = (selectedCategory) => {
    navigate(`/category/${selectedCategory}`);
  };

  const handleStarClick = (selectedRating) => {
    setRating(selectedRating);
  };
  const [color, setColor] = useState(""); // State để lưu màu được chọn
const colors = ["black", "white", "red", "blue", "green", "yellow", "orange", "purple", "pink", "gray"]; // Danh sách màu

const handleColorChange = (selectedColor) => {
  setColor(selectedColor);
  navigate(`/shop/color/${selectedColor}`); // Chuyển hướng người dùng
};
  

  return (
    <Fragment>
      <ToastContainer />
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={"Real comfy"} />
          <h1
            id="products_heading"
            style={{
              fontSize: "24px",
              fontWeight: "bold",
              color: "#333",
              textAlign: "center",
              textTransform: "uppercase",
              margin: "20px 0",
              textShadow: "1px 1px 2px rgba(0, 0, 0, 0.2)",
            }}
          >
            {category}
          </h1>

          <section id="products" className="container mt-5">
            <div className="row">
              <div className="col-md-3"  style={{ marginRight: '-150px' }}>
                <div className="px-2"style={{ width: "200px", marginLeft: '-140px' }}>
                  <Slider
                    marks={{ 1: "$1", 1000: "$1000" }}
                    min={1}
                    max={1000}
                    defaultValue={[1, 1000]}
                    tipFormatter={(values) => values.map((value) => `$${value}`)}
                    tipProps={{ placement: "top", visible: true }}
                    range
                    value={price}
                    onChange={(price) => setPrice(price)}
                  />

                  <div className="mt-4">
                  <h4 className="mb-3" style={{ marginLeft: '5px', marginBottom: '10px' }}>Categories</h4>
                    <ul className="list-unstyled">
                      {categories.map((cate, index) => (
                        <li
                          key={index}
                          onClick={() => handleCategoryClick(cate)}
                          style={{ cursor: "pointer" }}
                        >
                          {cate}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-5">
                      <h4 className="mb-3">Ratings</h4>
                      <ul className="pl-0">
                        {[5, 4, 3, 2, 1].map((star) => (
                          <li
                            style={{
                              cursor: "pointer",
                              listStyleType: "none",
                            }}
                            key={star}
                            onClick={() => setRating(star)}
                          >
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
                    <div className="mt-5">
                  <hr style={{ border: '1px solid #ccc' }} />
                  <h4 className="mb-3" style={{ marginTop: '20px', marginBottom: '10px', fontSize: '18px', fontWeight: 'bold',marginLeft:"5px" }}>Choose a color:</h4>
                    <select
                        id="color-select"
                        value={color}
                        onChange={(e) => handleColorChange(e.target.value)}
                        style={{
                            width: '200px',
                            height: '40px',
                            borderRadius: '5px',
                            borderColor: '#ccc',
                            marginBottom: '20px',
                            fontSize: '16px'  // Ensuring the font size inside the select matches other controls
                        }}
                    >
                      <option value="">Select a Color</option>
                      {colors.map((color, index) => (
                          <option key={index} value={color}>{color}</option>
                      ))}
                  </select>
              </div>

                </div>
                
              </div>

              <div className="col-md-9">
                <div className="row">
                  {products.map((product) => (
                    <Product key={product._id} product={product} col={4} />
                  ))}
                </div>
              </div>
              
            </div>
          </section>
          {resPerPage <= productsCount && (
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
        </Fragment>
      )}

    </Fragment>
  );
};

export default Category;
