import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Product = ({ product }) => {
  const [currentImage, setCurrentImage] = useState(product.images[0].url);
  const [summary, setSummary] = useState("");

  const handleOnMouseEnter = () => {
    setCurrentImage(product.images[1]?.url || product.images[0].url);
    setSummary(
      <div className="product-summary">
        <h5>{product.name}</h5>
        <div className="ratings mt-auto" style={{ display: "flex", gap: 10 }}>
          <div className="rating-outer">
            <div
              className="rating-inner"
              style={{ width: `${(product.ratings / 5) * 100}%` }}
            ></div>
          </div>
          <span style={{ color: "black" }}>{product.numOfReviews} Reviews</span>
        </div>
        <p>${product.price}</p>
        <Link className="product-view-details" to={`/product/${product._id}`}>
          View Details
        </Link>
      </div>
    );
  };

  const handleOnMouseLeave = () => {
    setCurrentImage(product.images[0].url);
    setSummary("");
  };

  return (
    <div
      className="product-container"
      style={{ backgroundImage: `url(${currentImage})` }}
      onMouseEnter={() => {
        handleOnMouseEnter();
      }}
      onMouseLeave={() => {
        handleOnMouseLeave();
      }}
    >
      {summary}
    </div>
  );
};

export default Product;
