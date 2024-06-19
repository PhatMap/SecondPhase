import React, { Fragment, useState, useEffect } from "react";
import MetaData from "./layout/MetaData";
import Product from "./product/Product";
import Loader from "./layout/Loader";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getProducts } from "../actions/productActions";
import "rc-slider/assets/index.css";
import { useParams, useNavigate } from "react-router-dom";
import HeroSection from "./layout/HeroSection";
import Header from "./layout/Header";

const Home = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [rating, setRating] = useState(0);
  const [category, setCategory] = useState("");
  const navigate = useNavigate();
  const [fiveStarProducts, setFiveStarProducts] = useState([]);

  const dispatch = useDispatch();

  const { loading, products, error } = useSelector((state) => state.products);

  const { keyword } = useParams();

  useEffect(() => {
    dispatch(getProducts(keyword, currentPage));
    if (error) {
      toast.error(error);
    }
  }, [dispatch, keyword, currentPage, rating, error]);

  useEffect(() => {
    if (products.length > 0) {
      const topRatedProducts = products
        .filter((p) => p.ratings >= 4)

        .slice(0, 4);

      setFiveStarProducts(topRatedProducts);
    }
  }, [products]);

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

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [categories] = useState([
    {
      name: "Quần Nam Nữ",
      images: [
        "https://res.cloudinary.com/dfbo1ecn9/image/upload/v1712141529/products/rv1yiha0ctpikh34eqvp.jpg",
        "https://res.cloudinary.com/dfbo1ecn9/image/upload/v1712141530/products/zumqc0bc28kwucl4rcm9.webp",
      ],
      path: "/category/Trousers",
    },
    {
      name: "Áo Nam Nữ",
      images: [
        "https://res.cloudinary.com/dfbo1ecn9/image/upload/v1712141368/products/zkyxqkd9er5o1nwsx28h.webp",
        "https://res.cloudinary.com/dfbo1ecn9/image/upload/v1712141367/products/ywacs7qaojn2t5muetsy.webp",
      ],
      path: "/category/Shirt",
    },
    {
      name: "Váy Nữ",
      images: [
        "https://res.cloudinary.com/dfbo1ecn9/image/upload/v1712141640/products/trsaaq2dprd1aytthm2s.jpg",
        "https://res.cloudinary.com/dfbo1ecn9/image/upload/v1712141642/products/w1qgno9uachw2tmcuwdd.webp",
      ],
      path: "/category/Dress",
    },
    {
      name: "Giày Nam Nữ",
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

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={"Home"} />
          <div className="home-container background-1">
            <Header />
            <HeroSection />
            <div className="home-component">
              <h1>Sản Phẩm Mới Nhất</h1>
              <div className="home-new-products">
                {products.slice(0, 4).map((product) => (
                  <Product key={product._id} product={product} />
                ))}
              </div>
              <button
                onClick={() => navigate("/shop")}
                className="more-text-btn"
              >
                Xem Thêm
              </button>
            </div>

            <div className="home-component">
              <h1>Danh Mục Sản Phẩm</h1>
              <div className="home-new-products">
                {categories.map((category, index) => (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                    className="home-text-btn"
                    key={index}
                    onClick={() => navigate(category.path)}
                  >
                    <img
                      src={category.images[currentImageIndex]}
                      alt={category.name}
                      style={{
                        height: "400px",
                        width: "300px",
                      }}
                    />
                    <p>{category.name}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="home-component">
              <h1>Sản Phẩm Được Đánh Giá Cao</h1>
              <div className="home-new-products">
                {fiveStarProducts ? (
                  fiveStarProducts.map((product, index) => (
                    <Product key={index} product={product} />
                  ))
                ) : (
                  <p>Không có sản phẩm nào</p>
                )}
              </div>
              <button onClick={handleShowMorestar} className="more-text-btn">
                Xem Thêm
              </button>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Home;
