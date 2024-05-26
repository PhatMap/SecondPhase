import React, { Fragment, useState, useEffect } from "react";
import MetaData from "./layout/MetaData";
import Product from "./product/Product";
import Loader from "./layout/Loader";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getProducts } from "../actions/productActions";
import "rc-slider/assets/index.css";
import { useParams, useNavigate } from "react-router-dom"; // Import useNavigate

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
      toast.error(error);
    }
  }, [dispatch, keyword, currentPage, price, rating, error]);

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

  const isSearchKeyword = keyword && keyword.trim() !== "";

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

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={"Home"} />
          <div className="flex flex-col font-sans items-center background-1">
            <h1 className="mt-12 mb-2 text-4xl font-bold">Sản Phẩm Mới Nhất</h1>
            <div className="home-new-products">
              {products.slice(0, 4).map((product) => (
                <Product key={product._id} product={product} />
              ))}
            </div>
            <button
              onClick={() => navigate("/shop")}
              className="text-2xl font-bold hover:text-blue-500"
            >
              Show More
            </button>

            <h1 className="mt-12 mb-4 text-4xl font-bold ">
              Danh Mục Sản Phẩm
            </h1>
            <div className="flex w-screen justify-evenly">
              {categories.map((category, index) => (
                <div
                  className="flex flex-col items-center hover:text-blue-500"
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
                  <p className="text-2xl font-bold">{category.name}</p>
                </div>
              ))}
            </div>

            {/* Other parts of your component remain unchanged */}

            <h1 className="mt-12 mb-2 text-4xl font-bold">
              Sản Phẩm Được Đánh Giá Cao
            </h1>
            {renderProductsStar()}
            <button
              onClick={handleShowMorestar}
              className="text-2xl font-bold hover:text-blue-500"
            >
              Show More
            </button>
          </div>
          <div className="home-page-container"></div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Home;
