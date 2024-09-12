import React, { Fragment, useState, useEffect } from "react";
import MetaData from "./layout/MetaData";
import Product from "./product/Product";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getProducts } from "../actions/productActions";
import { getCategoryAll } from "../actions/categoryActions";
import "rc-slider/assets/index.css";
import Header from "./layout/Header";
import Footer from "./layout/Footer";
import Category from "../category/Category";
import Chatbox from "./Chatbox/Chatbox";
import { FaBell, FaEnvelope } from "react-icons/fa";

const Home = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [resPerPage, setResPerPage] = useState(12);
  const dispatch = useDispatch();

  const { products, error } = useSelector((state) => state.products);
  const { categories } = useSelector((state) => state.category);

  const toggleChatBox = () => {
    setIsChatOpen(!isChatOpen);
  };

  useEffect(() => {
    dispatch(getCategoryAll());
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

      <div className="home-container background-2">
        <Header />
        <img
          src={"../images/masage.png"}
          alt="massage"
          className="fixed-image"
          onClick={toggleChatBox}
        />
        
        <img 
        src={'../images/masage.png'} 
        alt="massage"
        className="fixed-image"
        onClick={toggleChatBox}
      />
      
      {/* Chat box */}
      {isChatOpen && (
        <div className="chat-box">
          <Chatbox />
        </div>
      )}
 




        <div className="home-form">
          <div className="home-component">
            <h1>Danh Mục Sản Phẩm</h1>
            <div className="home-category">
              {categories.map((category) => (
                <Category key={category._id} category={category} />
              ))}
            </div>
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
