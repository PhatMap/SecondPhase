import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";


const Product = ({ product, col }) => {
  const [currentImage, setCurrentImage] = useState(product.images[0].url);

  return (
    <div className={`col-sm-12 col-md-6 col-lg-${col} my-3`}>
      <div className="card p-3 rounded">
        <Link 
          to={`/product/${product._id}`} 
          onMouseEnter={() => setCurrentImage(product.images[1]?.url || product.images[0].url)} 
          onMouseLeave={() => setCurrentImage(product.images[0].url)}
        >
         <img className="card-img-top mx-auto product-image" src={currentImage} alt="Product" />
        </Link>
       
        <div className="card-body d-flex flex-column">
        <h5
            className="card-title product-name"
            style={{
              fontSize: "25px",
              color: "#333",
              fontWeight: "bold",
              margin: "10px 0",
            }}
          >
            <Link to={`/product/${product._id}`}>{product.name}</Link>
          </h5>
          <div className="ratings mt-auto">
            <div className="rating-outer">
              <div
                className="rating-inner"
                style={{ width: `${(product.ratings / 5) * 100}%` }}
              ></div>
            </div>
            <span id="no_of_reviews">({product.numOfReviews} Reviews)</span>
          </div>
          <p
            className="card-text"
            style={{
              fontSize: "20px",
              color: "#333",
              fontWeight: "bold",
              margin: "10px 0",
            }}
          >
            ${product.price}
          </p>
          <Link
            to={`/product/${product._id}`}
            id="view_btn"
            className="btn btn-block"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Product;
