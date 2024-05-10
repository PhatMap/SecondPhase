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

const Home = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([1, 1000]);
  const [rating, setRating] = useState(0);
  const [category, setCategory] = useState("");
  const [cols, setCols] = useState(3);
  const navigate = useNavigate();
  const [fiveStarProducts, setFiveStarProducts] = useState([]);

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
  }, [dispatch, keyword, currentPage, price, rating, error]);

  const renderProducts = () => {
    return (
      <div className="row">
        {products.slice(0, 4).map((product) => (
          <Product
            key={product._id}
            product={product}
            col={cols}
            className="product-item"
            style={{ width: "70px", marginLeft: "-150px" }}
          />
        ))}
      </div>
    );
  };

  useEffect(() => {
    if (products.length > 0) {
      const topRatedProducts = products
        .filter((p) => p.ratings >= 4.5)

        .slice(0, 4);

      setFiveStarProducts(topRatedProducts);
    }
  }, [products]);

  const renderProductsStar = () => {
    return (
      <div className="row">
        {fiveStarProducts.map((product) => (
          <Product
            key={product._id}
            product={product}
            col={cols}
            className="product-item"
            style={{ width: "70px", marginLeft: "-150px" }}
          />
        ))}
      </div>
    );
  };

  const handleShowMorestar = () => {
    navigate("/shop", { state: { fromFiveStar: true } });
  };

  const [backgroundImages, setBackgroundImages] = useState([
    "../images/background_image_1.jpg",
    "../images/background_image_2.jpg",
    "../images/background_image_3.jpg",
    "../images/background_image_4.jpg",
  ]);
  const [currentBackgroundIndex, setCurrentBackgroundIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentBackgroundIndex(
        (prevIndex) => (prevIndex + 1) % backgroundImages.length
      );
    }, 5000);

    return () => clearInterval(intervalId);
  }, [backgroundImages.length]);

  const handleShowMore = () => {
    navigate("/shop");
  };

  const defaultProductsGrid = <div className="row">{renderProducts()}</div>;

  const isSearchKeyword = keyword && keyword.trim() !== "";

  const productsGrid = isSearchKeyword ? renderProducts() : defaultProductsGrid;

  let count = productsCount;
  if (isSearchKeyword) {
    count = filteredProductsCount;
  }

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [categories] = useState([
    {
      name: "Trousers",
      images: [
        "https://res.cloudinary.com/dfbo1ecn9/image/upload/v1712141529/products/rv1yiha0ctpikh34eqvp.jpg",
        "https://res.cloudinary.com/dfbo1ecn9/image/upload/v1712141530/products/zumqc0bc28kwucl4rcm9.webp",
      ],
      path: "/category/Trousers",
    },
    {
      name: "Shirt",
      images: [
        "https://res.cloudinary.com/dfbo1ecn9/image/upload/v1712141368/products/zkyxqkd9er5o1nwsx28h.webp",
        "https://res.cloudinary.com/dfbo1ecn9/image/upload/v1712141367/products/ywacs7qaojn2t5muetsy.webp",
      ],
      path: "/category/Shirt",
    },
    {
      name: "Dress",
      images: [
        "https://res.cloudinary.com/dfbo1ecn9/image/upload/v1712141640/products/trsaaq2dprd1aytthm2s.jpg",
        "https://res.cloudinary.com/dfbo1ecn9/image/upload/v1712141642/products/w1qgno9uachw2tmcuwdd.webp",
      ],
      path: "/category/Dress",
    },
    {
      name: "Shoe",
      images: [
        "https://res.cloudinary.com/dfbo1ecn9/image/upload/v1712141254/products/hvmdzgltwdn5jtavki0u.jpg",
        "https://res.cloudinary.com/dfbo1ecn9/image/upload/v1712141256/products/qvuvnbigjr0fxvag6abd.jpg",
      ],
      path: "/category/Shoe",
    },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % 2); // Giả sử mỗi danh mục có 2 ảnh
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const getStyle = () => ({
    fontSize: "24px",
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    textTransform: "uppercase",
    margin: "40px 0",
    textShadow: "1px 1px 2px rgba(0, 0, 0, 0.2)",
  });

  return (
    <Fragment>
      <ToastContainer />

      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={"Home"} />
          <h1
            id="products_heading"
            style={{
              fontSize: "24px",
              fontWeight: "bold",
              color: "#333",
              textAlign: "center",
              textTransform: "uppercase",
              margin: "40px 0",
              textShadow: "1px 1px 2px rgba(0, 0, 0, 0.2)",
            }}
          >
            Sản Phẩm Mới Nhất
          </h1>
          <div>
            {/* Hiển thị hình ảnh từ mảng backgroundImages */}
            <img
              src={backgroundImages[currentBackgroundIndex]}
              alt="Background Image"
              style={{ width: "100%", maxHeight: "500px" }}
            />
          </div>
          <h1 id="products_heading" style={getStyle()}></h1>
          <section id="products">{productsGrid}</section>
          <button
            onClick={handleShowMore}
            style={{ float: "right", marginTop: "10px" }}
          >
            Show More
          </button>
          <div className="home-line-between"></div>

          {/* Other parts of your component remain unchanged */}

          <h2 style={getStyle()}>Danh Mục Sản Phẩm</h2>
          <div
            className="categories-container"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "20px",
              margin: "0 auto",
              maxWidth: "1200px", // Adjust this value according to your layout's maximum width
              marginBottom: "20px",
            }}
          >
            {categories.map((category, index) => (
              <div
                key={index}
                onClick={() => navigate(category.path)}
                style={{
                  cursor: "pointer",
                  padding: "10px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center", // Center align the content for each category box
                }}
              >
                <p className="category" style={{ marginBottom: "10px" }}>
                  {category.name}
                </p>
                <img
                  src={category.images[currentImageIndex]}
                  alt={category.name}
                  style={{
                    width: "100%", // Make images take full width of the container
                    height: "400px", // Set a fixed height for uniformity, adjust as needed
                    objectFit: "cover", // Ensure the images cover the area without distorting aspect ratio
                  }}
                />
              </div>
            ))}
          </div>

          {/* Other parts of your component remain unchanged */}

          <div className="home-line-between">
            <h2 style={getStyle()}>Sản Phẩm Được Đánh Giá Cao</h2>
            {renderProductsStar()}
            <button
              onClick={handleShowMorestar}
              style={{
                float: "right",
                marginTop: "10px",
                marginBottom: "50px",
              }}
            >
              Show More
            </button>
          </div>
          <div
            className="home-page-container"
            style={{ marginBottom: "100px" }}
          ></div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Home;
