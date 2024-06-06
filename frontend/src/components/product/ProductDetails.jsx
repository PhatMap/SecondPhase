import React, { Fragment, useState, useEffect } from "react";
import Loader from "../layout/Loader";
import MetaData from "../layout/MetaData";
import ListReviews from "../review/ListReviews";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import {
  getProductDetails,
  newReview,
  clearErrors,
} from "../../actions/productActions";
import { addItemToCart, getUserCartProduct } from "../../actions/cartActions";
import { NEW_REVIEW_RESET } from "../../constants/productConstants";
import { useParams } from "react-router-dom";
import ProductImageZoom from "./ProductImageZoom";
import ProductVariant from "./ProductVariant";
import { formatToVNDWithVND } from "../../utils/formatHelper";

const ProductDetails = () => {
  const { loading, error, product } = useSelector(
    (state) => state.productDetails
  );

  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [selectedVariant, setSelectedVariant] = useState("");
  const [stock, setStock] = useState("");
  const [price, setPrice] = useState("");
  const [activeImage, setActiveImage] = useState("");
  const [images, setImages] = useState("");
  const [inventory, setInventory] = useState([]);
  const [variant, setVariant] = useState([]);
  const [size, setSize] = useState("");
  const [cartItem, setCartItem] = useState([]);
  const [inventoryIndex, setInventoryIndex] = useState("");

  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);

  const { error: reviewError, success } = useSelector(
    (state) => state.newReview
  );

  useEffect(() => {
    dispatch(getProductDetails(id));

    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (reviewError) {
      toast.error(reviewError);
      dispatch(clearErrors());
    }

    if (success) {
      toast.success("Đánh Giá Thành Công");
      dispatch({ type: NEW_REVIEW_RESET });
    }
  }, [dispatch, error, id, reviewError, success]);

  useEffect(() => {
    if (product && product.images && product.images.length > 0) {
      setActiveImage(product.images[0].url);
      setPrice(product.price);
      setStock(product.totalStock);
      setImages(product.images);
      product.variants.map((variant, index) => {
        variant.images.map((image) => {
          setImages((prev) => [...prev, image]);
        });
      });

      const item = cartItems.filter((item) => item.product === product._id);

      setCartItem(item);
    }
  }, [product]);

  const addToCart = async () => {
    if (!user) {
      toast.error("Hãy đăng nhập để thêm sản phẩm vào giỏ hàng");
      return;
    }
    if (size === "") {
      toast.error("Hãy chọn sản phẩm và kích cỡ");
      return;
    }

    const item = {
      product: product._id,
      variant: variant._id,
      inventory: variant.inventory[inventoryIndex]._id,
      name: product.name,
      variantName: variant.name,
      price: price,
      image: variant.images[0].url,
      quantity: quantity,
      size: size,
    };

    if (cartItems.length > 0) {
      const check = await dispatch(getUserCartProduct(item));
      if (check) {
        await dispatch(addItemToCart(item));
        toast.success("Sản phẩm đã được thêm vào giỏ hàng");
      } else {
        toast.error("Giỏ hàng đã đạt số lượng hiện hữu của sản phẩm");
      }
    } else {
      await dispatch(addItemToCart(item));
      toast.success("Sản phẩm đã được thêm vào giỏ hàng");
    }
  };

  const increaseQty = () => {
    const count = document.querySelector(".count");

    if (count.valueAsNumber >= stock) return;

    const qty = count.valueAsNumber + 1;
    setQuantity(qty);
  };

  const decreaseQty = () => {
    const count = document.querySelector(".count");

    if (count.valueAsNumber <= 1) return;

    const qty = count.valueAsNumber - 1;
    setQuantity(qty);
  };

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

  const ChooseSize = (index, newSize, newPrice, newStock) => {
    setQuantity(1);

    if (size === newSize) {
      setInventoryIndex("");
      setSize("");
      setPrice(product.price);
      setStock(variant.totalStock);
    } else {
      setInventoryIndex(index);
      setSize(newSize);
      setPrice(newPrice);
      setStock(newStock);
    }
  };

  const handlerQuantity = (e) => {
    const inputValue = e.target.value;

    if (inputValue > stock) {
      setQuantity(1);
      return;
    } else {
      setQuantity(inputValue);
    }
  };

  const handleBlur = (e) => {
    const inputValue = e.target.value;
    if (inputValue === "") {
      setQuantity(1);
    }
  };

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={product.name} />
          <div className="detail-container">
            <ToastContainer />
            <div className="detail-image-container">
              <div className="detail-images">
                {images &&
                  images.map((image, index) => (
                    <img
                      key={image.public_id}
                      src={image.url}
                      alt={`Product Preview ${index}`}
                      className={`${activeImage === image.url ? "mark" : ""} `}
                      onMouseEnter={() => setActiveImage(image.url)}
                    />
                  ))}
              </div>

              <div className="detail-current-image">
                <ProductImageZoom image={activeImage} />
              </div>
            </div>

            <div className="detail-content">
              <h1>{product.name}</h1>
              <p id="product_id">Product # {product._id}</p>
              <hr />
              <p>
                Status:{" "}
                <span
                  id="stock_status"
                  className={product.totalStock > 0 ? "greenColor" : "redColor"}
                >
                  {product.totalStock > 0 ? "In Stock" : "Out of Stock"}
                </span>
              </p>
              <hr />
              <div className="detail-color">
                <h1>Đánh giá:</h1>
                {product?.ratings?.toFixed(1).replace(".", ",") ?? "No Ratings"}
                <div className="rating-outer">
                  <div
                    className="rating-inner"
                    style={{ width: `${(product.ratings / 5) * 100}%` }}
                  ></div>
                </div>
              </div>
              <hr />
              <div className="detail-description">
                <h1 className="">Mô tả:</h1>
                <p>{product.description}</p>
              </div>
              <hr />
              <div
                style={{ display: "flex", alignItems: "center", gap: "20px" }}
              >
                <h1>Mẫu:</h1>
                <div
                  style={{
                    display: "flex",
                    gap: "40px",
                    flexWrap: "wrap",
                    maxWidth: "calc(4 * (75px + 40px))",
                  }}
                >
                  {product.variants && product.variants.length > 0 ? (
                    product.variants.map((variant, index) => (
                      <ProductVariant
                        key={index}
                        variant={variant}
                        index={index}
                        setSelectedVariant={setSelectedVariant}
                        selectedVariant={selectedVariant}
                        product={product}
                        setStock={setStock}
                        setPrice={setPrice}
                        setActiveImage={setActiveImage}
                        setImages={setImages}
                        setInventory={setInventory}
                        setVariant={setVariant}
                        setSize={setSize}
                      />
                    ))
                  ) : (
                    <h1>Không có mẫu</h1>
                  )}
                </div>
              </div>
              {inventory && <hr />}
              {inventory && inventory.length > 0 && (
                <div className="d-flex justify-content-between align-items-center">
                  <div className="detail-color">
                    <h1>Kích cỡ:</h1>
                    {inventory.map((item, index) => (
                      <button
                        className="size-button"
                        key={index}
                        onClick={() => {
                          ChooseSize(index, item.size, item.price, item.stock);
                        }}
                        style={{
                          border: size === item.size ? "solid 2px black" : "",
                        }}
                      >
                        <div>{item.size}</div>
                        <div>{item.stock}</div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
              <hr />
              <div className="d-flex justify-content-between align-items-center">
                <div className="detail-color">
                  <h1>Giá:</h1>
                  <p style={{ fontSize: "30px", color: "green" }}>
                    {formatToVNDWithVND(price)}
                  </p>
                </div>
              </div>
              <hr />
              <div className="d-flex justify-content-between align-items-center">
                <div className="detail-color">
                  <h1>Số lượng:</h1>
                  <p style={{ fontSize: "30px", color: "green" }}>
                    {stock > 0 ? stock : "Hết hàng"}
                  </p>
                </div>
              </div>
              <hr />
              <div className="d-flex justify-content-between align-items-center">
                {size && (
                  <div className="stockCounter d-inline">
                    <span
                      className="btn btn-danger minus"
                      onClick={decreaseQty}
                    >
                      -
                    </span>

                    <input
                      type="number"
                      className="form-control count d-inline"
                      value={quantity}
                      onChange={(e) => handlerQuantity(e)}
                      onBlur={(e) => handleBlur(e)}
                    />

                    <span
                      className="btn btn-primary plus"
                      onClick={increaseQty}
                    >
                      +
                    </span>
                  </div>
                )}
                <button
                  type="button"
                  id="cart_btn"
                  className="btn btn-primary d-inline ml-4"
                  disabled={product.stock === 0}
                  onClick={addToCart}
                >
                  Add to Cart
                </button>
              </div>
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
        </Fragment>
      )}
    </Fragment>
  );
};

export default ProductDetails;
