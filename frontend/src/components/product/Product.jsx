import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Product = ({ product }) => {
  const [currentImage, setCurrentImage] = useState(product.images[0].url);

  return (
    <div className="product-container">
      <Link
        to={`/product/${product._id}`}
        onMouseEnter={() =>
          setCurrentImage(product.images[1]?.url || product.images[0].url)
        }
        onMouseLeave={() => setCurrentImage(product.images[0].url)}
      >
        <img src={currentImage} alt="Product" />
      </Link>

      <div className="product-summary">
        <h5>
          <Link to={`/product/${product._id}`}>{product.name}</Link>
        </h5>
        <div className="ratings mt-auto">
          <div className="rating-outer">
            <div
              className="rating-inner"
              style={{ width: `${(product.ratings / 5) * 100}%` }}
            ></div>
          </div>
          <span className="product-review">
            ({product.numOfReviews} Reviews)
          </span>
        </div>
        <p>${product.price}</p>
        <Link className="product-view-details" to={`/product/${product._id}`}>
          View Details
        </Link>
      </div>
    </div>
  );
};

export default Product;
