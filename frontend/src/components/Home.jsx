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
import Header from "./layout/Header";
import Footer from "./layout/Footer";
import BoxChat from "./boxChat/boxChat";

const Home = () => {
  const navigate = useNavigate();
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [resPerPage, setResPerPage] = useState(12);
  const dispatch = useDispatch();

  const { products, error } = useSelector((state) => state.products);

  const toggleChatBox = () => {
    setIsChatOpen(!isChatOpen);
  };

  useEffect(() => {
    dispatch(getProducts({ resPerPage }));
  }, []);

  useEffect(() => {
    if (resPerPage) {
      dispatch(getProducts({ resPerPage }));
    }
  }, [resPerPage]);

  return (
    <Fragment>
      <MetaData title={"Home"} />

      <div className="home-container background-1">
        <Header />
        <img
          src={"../images/masage.png"}
          alt="massage"
          className="fixed-image"
          onClick={toggleChatBox}
        />
        {isChatOpen && (
          <div className="chat-box">
            <BoxChat />
          </div>
        )}
        <div className="home-form">
          <div className="home-component">
            <h1>Danh Mục Sản Phẩm</h1>
            <div className="home-new-products"></div>
          </div>
          <div className="home-component">
            <h1>Sản Phẩm Mới Nhất</h1>
            <div className="home-new-products">
              {products.map((product) => (
                <Product key={product._id} product={product} />
              ))}
            </div>
            <button
              onClick={() => setResPerPage((prev) => prev + 12)}
              className="more-text-btn"
            >
              Xem Thêm
            </button>
          </div>
        </div>
        <Footer />
      </div>
    </Fragment>
  );
};

export default Home;
