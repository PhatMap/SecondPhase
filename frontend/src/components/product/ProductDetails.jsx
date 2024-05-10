import React, { Fragment, useState, useEffect } from "react";

import Loader from "../layout/Loader";
import MetaData from "../layout/MetaData";
import ListReviews from "../review/ListReviews";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import {
  getProductDetails,
  newReview,
  clearErrors,
} from "../../actions/productActions";
import { addItemToCart } from "../../actions/cartActions";
import { NEW_REVIEW_RESET } from "../../constants/productConstants";
import { useParams } from "react-router-dom";
import ProductImageZoom from "./ProductImageZoom"; // Đường dẫn phải chính xác

const ProductDetails = () => {
  const { id } = useParams();
  const [size, setSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [selectedSize, setSelectedSize] = useState(null);
  const dispatch = useDispatch();

  const { loading, error, product } = useSelector(
    (state) => state.productDetails
  );
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);
  const { error: reviewError, success } = useSelector(
    (state) => state.newReview
  );
  const [localProduct, setLocalProduct] = useState(
    product || {
      // ... cung cấp một đối tượng cơ bản với các thuộc tính cần thiết, ví dụ:
      ratingsBreakdown: {},
      // các thuộc tính khác...
    }
  );

  useEffect(() => {
    dispatch(getProductDetails(id));

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
      dispatch(clearErrors());
    }

    if (reviewError) {
      toast.error(reviewError, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      dispatch(clearErrors());
    }

    if (success) {
      toast.success("Reivew posted successfully", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      dispatch({ type: NEW_REVIEW_RESET });
    }
  }, [dispatch, error, id, reviewError, success]);

  const setTheSize = (size) => {
    if (size === selectedSize) {
      setSelectedSize(null);
      setSize(null);
      return;
    }
    setSelectedSize(size);
    setSize(size);
  };

  const addToCart = () => {
    let newQty = quantity;
    for (let i = 0; i < cartItems.length; i++) {
      if (id === cartItems[i].product) {
        newQty = cartItems[i].quantity + newQty;
        if (newQty > product.stock) {
          return;
        }
        break;
      }
    }
    dispatch(
      addItemToCart(
        id,
        newQty,
        size,
        product.colors.colorName,
        product.colors.colorHex
      )
    );
    toast.success("Item Added to Cart", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  const increaseQty = () => {
    const count = document.querySelector(".count");

    if (count.valueAsNumber >= product.stock) return;

    const qty = count.valueAsNumber + 1;
    setQuantity(qty);
  };

  const decreaseQty = () => {
    const count = document.querySelector(".count");

    if (count.valueAsNumber <= 1) return;

    const qty = count.valueAsNumber - 1;
    setQuantity(qty);
  };

  const [activeImage, setActiveImage] = useState(product?.images?.[0]?.url);
  useEffect(() => {
    if (product && product.images && product.images.length > 0) {
      setActiveImage(product.images[0].url);
    }
  }, [product]);

  function setUserRatings() {
    const stars = document.querySelectorAll(".star");

    stars.forEach((star, index) => {
      star.starValue = index + 1;

      ["click", "mouseover", "mouseout"].forEach(function (e) {
        star.addEventListener(e, showRatings);
      });
    });

    function showRatings(e) {
      stars.forEach((star, index) => {
        if (e.type === "click") {
          if (index < this.starValue) {
            star.classList.add("orange");

            setRating(this.starValue);
          } else {
            star.classList.remove("orange");
          }
        }

        if (e.type === "mouseover") {
          if (index < this.starValue) {
            star.classList.add("yellow");
          } else {
            star.classList.remove("yellow");
          }
        }

        if (e.type === "mouseout") {
          star.classList.remove("yellow");
        }
      });
    }
  }

  const reviewHandler = () => {
    const formData = new FormData();

    formData.set("rating", rating);
    formData.set("comment", comment);
    formData.set("productId", id);

    dispatch(newReview(formData));
  };

  return (
    <Fragment>
      <ToastContainer />
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={product.name} />
          <div className="row d-flex justify-content-around">
            <div className="product-thumbnails">
              {product &&
                product.images &&
                product.images.map((image, index) => (
                  <img
                    key={image.public_id}
                    src={image.url}
                    alt={`Product Preview ${index}`}
                    className={`product-thumbnail ${
                      activeImage === image.url ? "active" : ""
                    }`}
                    onMouseEnter={() => setActiveImage(image.url)}
                  />
                ))}
            </div>

            <div className="col-12 col-lg-5 img-fluid" id="product_image">
              <ProductImageZoom image={activeImage} />
            </div>
            <div className="col-12 col-lg-5 mt-5">
              <h3>{product.name}</h3>
              <p id="product_id">Product # {product._id}</p>

              <hr />

              <div style={{ marginRight: "30px", fontSize: "20px" }}>
                Ratings:{" "}
                {product?.ratings?.toFixed(1).replace(".", ",") ?? "No Ratings"}
                <div className="rating-outer">
                  <div
                    className="rating-inner"
                    style={{ width: `${(product.ratings / 5) * 100}%` }}
                  ></div>
                </div>
              </div>

              <h4 className="mt-2">Description:</h4>
              <p>{product.description}</p>
              <hr />
              <div className="mt-5 d-flex align-items-center">
                <h4 style={{ margin: "0 10px 0 0" }}>Color:</h4>
                <div
                  style={{
                    backgroundColor: product?.colors?.colorHex ?? "transparent",
                    width: "36px",
                    height: "36px",
                    borderRadius: "50%",
                    marginRight: "10px",
                  }}
                ></div>
              </div>

              <hr />

              {/* Hiển thị size */}
              <div className="mt-5">
                <h4 className="mb-3">Available Sizes</h4>
                {product &&
                  product.sizes &&
                  product.sizes.map((size, index) => (
                    <button
                      key={index}
                      className={`size-button ${
                        size === selectedSize ? "selected" : ""
                      }`}
                      onClick={() => setTheSize(size)}
                    >
                      {size}
                    </button>
                  ))}
              </div>
              <hr />

              <div className="d-flex justify-content-between align-items-center">
                <div>
                  {/* Di chuyển giá vào đây để đặt cùng hàng với Add to Cart */}
                  <p id="product_price">${product.price}</p>
                </div>

                <div className="stockCounter d-inline">
                  <span className="btn btn-danger minus" onClick={decreaseQty}>
                    -
                  </span>

                  <input
                    type="number"
                    className="form-control count d-inline"
                    value={quantity}
                    readOnly
                  />

                  <span className="btn btn-primary plus" onClick={increaseQty}>
                    +
                  </span>
                </div>
                <button
                  type="button"
                  id="cart_btn"
                  className="btn btn-primary d-inline ml-4"
                  disabled={product.stock === 0 || !size}
                  onClick={addToCart}
                >
                  Add to Cart
                </button>
              </div>

              <hr />

              <p>
                Status:{" "}
                <span
                  id="stock_status"
                  className={product.stock > 0 ? "greenColor" : "redColor"}
                >
                  {product.stock > 0 ? "In Stock" : "Out of Stock"}
                </span>
              </p>

              <hr />

              <p id="product_seller mb-3">
                Sold by: <strong>{product.seller}</strong>
              </p>
              {product.reviews && product.reviews.length > 0 && (
                <ListReviews reviews={product.reviews} />
              )}
              {user ? (
                <button
                  id="review_btn"
                  type="button"
                  className="btn btn-primary mt-4"
                  data-toggle="modal"
                  data-target="#ratingModal"
                  onClick={setUserRatings}
                >
                  Submit Your Review
                </button>
              ) : (
                <div className="alert alert-danger mt-5" type="alert">
                  Login to post your review.
                </div>
              )}

              <div className="row mt-2 mb-5">
                <div className="rating w-50">
                  <div
                    className="modal fade"
                    id="ratingModal"
                    tabIndex="-1"
                    role="dialog"
                    aria-labelledby="ratingModalLabel"
                    aria-hidden="true"
                  >
                    <div className="modal-dialog" role="document">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h5 className="modal-title" id="ratingModalLabel">
                            Submit Review
                          </h5>
                          <button
                            type="button"
                            className="close"
                            data-dismiss="modal"
                            aria-label="Close"
                          >
                            <span aria-hidden="true">&times;</span>
                          </button>
                        </div>
                        <div className="modal-body">
                          <ul className="stars">
                            <li className="star">
                              <i className="fa fa-star"></i>
                            </li>
                            <li className="star">
                              <i className="fa fa-star"></i>
                            </li>
                            <li className="star">
                              <i className="fa fa-star"></i>
                            </li>
                            <li className="star">
                              <i className="fa fa-star"></i>
                            </li>
                            <li className="star">
                              <i className="fa fa-star"></i>
                            </li>
                          </ul>

                          <textarea
                            name="review"
                            id="review"
                            className="form-control mt-3"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                          ></textarea>

                          <button
                            className="btn my-3 float-right review-btn px-4 text-white"
                            onClick={reviewHandler}
                            data-dismiss="modal"
                            aria-label="Close"
                          >
                            Submit
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {product.reviews && product.reviews.length > 0 && (
            <ListReviews reviews={product.reviews} />
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

export default ProductDetails;
