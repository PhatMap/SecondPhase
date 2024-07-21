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
import { checkOrderReview } from "../../actions/orderActions";
import { NEW_REVIEW_RESET } from "../../constants/productConstants";
import { useParams } from "react-router-dom";
import ProductImageZoom from "./ProductImageZoom";
import ProductVariant from "./ProductVariant";
import { formatToVNDWithVND } from "../../utils/formatHelper";
import Header from "../layout/Header";
import Review from "./Review";

const ProductDetails = () => {
  const { loading, error, product } = useSelector(
    (state) => state.productDetails
  );

  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [rating, setRating] = useState(0);
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
    if (user) {
      console.log("user_id", user._id);
      dispatch(checkOrderReview(user._id, id));
    }
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
  }, [dispatch, error, id, reviewError, success, user]);

  const hasPurchased = useSelector((state) => state.order.hasPurchased);

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
    if (quantity === "") {
      toast.error("Hãy nhập số lượng cho vào giỏ hàng");
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
    } else {
      if (inputValue < 0) {
        setQuantity(-inputValue);
      } else {
        setQuantity(inputValue);
      }
    }
  };


  const reviewHandler = () => {
    const formData = new FormData();

    formData.set("rating", rating);
    formData.set("comment", comment);
    formData.set("productId", id);

    dispatch(newReview(formData));
  };

  return (
    <Fragment>
      <Header color={"black"} />
      <MetaData title={product.name} />
      <div className="detail-container">
        <ToastContainer />
        <div style={{ height: "100%" }}>
          <div className="detail-image-container">
            <div className="detail-images">
              {images &&
                images.map((image, index) => (
                  <img
                    key={image.public_id}
                    src={image.url}
                    alt={`Product Preview ${index}`}
                    className={`image-thumbnail ${
                      activeImage === image.url ? "mark" : ""
                    } `}
                    onMouseEnter={() => setActiveImage(image.url)}
                  />
                ))}
            </div>

            <div className="detail-current-image">
              <ProductImageZoom image={activeImage} />
            </div>
          </div>
        </div>

        <div className="detail-content">
          <h1>{product.name}</h1>
          <p id="product_id">ID #{product._id}</p>
          <hr />
          <h1>
            Trạng thái:{" "}
            <span
              id="stock_status"
              className={product.totalStock > 0 ? "greenColor" : "redColor"}
            >
              {product.totalStock > 0 ? "Còn hàng" : "Hết hàng"}
            </span>
          </h1>
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
          <div
            className="detail-description"
            style={{ whiteSpace: "pre-wrap" }}
          >
            <p>
              <strong style={{fontSize:"20px"}}>Mô tả: </strong>
              {product.description}
            </p>
          </div>
          <hr />
          <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
            <h1>Mẫu:</h1>
            <div
              style={{
                display: "flex",
                gap: "40px",
                flexWrap: "wrap",
                maxWidth: "calc(5 * (75px + 40px))",
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
                <div className="size-button-container">
                  {inventory.map((item, index) => (
                    <button
                      className="size-button"
                      key={index}
                      onClick={() => {
                        ChooseSize(index, item.size, item.price, item.stock);
                      }}
                      style={{
                        border: size === item.size ? "solid 2px black" : "",
                        display: "flex",
                      }}
                    >
                      <div style={{ display: "flex" }}>{item.size} -</div>
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <p style={{ minWidth: "80px", fontSize: "15px" }}>
                          Số lượng:
                        </p>{" "}
                        {item.stock}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
          <hr />
          <div className="d-flex justify-content-between align-items-center">
            <div className="detail-color">
              <h1>Giá:</h1>
              <p style={{ fontSize: "20px", color: "green" }}>
                {formatToVNDWithVND(price)}
              </p>
            </div>
          </div>
          <hr />
          <div className="d-flex justify-content-between align-items-center">
            <div className="detail-color">
              <h1>Số lượng:</h1>
              <p style={{ fontSize: "20px", color: "green" }}>
                {stock > 0 ? stock : "Hết hàng"}
              </p>
            </div>
          </div>
          <hr />

          <div className="d-flex justify-content-between align-items-center">
            {size && (
              <div className="stockCounter d-inline">
                <span className="btn btn-danger minus" onClick={decreaseQty}>
                  -
                </span>

                <input
                  type="number"
                  className="form-control count d-inline"
                  value={quantity}
                  onChange={(e) => handlerQuantity(e)}
                />

                <span className="btn btn-primary plus" onClick={increaseQty}>
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
          <div className="review-container">        
        </div>
 

        </div>
      </div>
    
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '10rem' }}>
  <div style={{ maxWidth: '50rem', width: '100%' }}>
    <div style={{ marginTop: '-10rem', marginBottom: '2rem' }}>
      <Review productId={id} user={user} hasPurchased={hasPurchased} />
    </div>
    {product.reviews && product.reviews.length > 0 && (
      <ListReviews reviews={product.reviews} />
    )}
  </div>
</div>

    </Fragment>
  );
};

export default ProductDetails;
