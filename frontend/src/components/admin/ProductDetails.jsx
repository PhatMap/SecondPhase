import React, { Fragment, useEffect, useState } from "react";
import ProductVariant from "../product/ProductVariant";
import { formatToVNDWithVND } from "../../utils/formatHelper";
import ProductImageZoom from "../product/ProductImageZoom";
import { useDispatch, useSelector } from "react-redux";
import { updateProductBasic } from "../../actions/productActions";

const ProductDetails = ({ data, onClose, setDecide }) => {
  const { error, isUpdated } = useSelector((state) => state.product);

  const dispatch = useDispatch();
  const [activeImage, setActiveImage] = useState(data.images[0].url);
  const [selectedVariant, setSelectedVariant] = useState("");
  const [images, setImages] = useState("");
  const [stock, setStock] = useState("");
  const [price, setPrice] = useState("");
  const [inventory, setInventory] = useState([]);
  const [variant, setVariant] = useState([]);
  const [size, setSize] = useState("");

  useEffect(() => {
    if (data && data.images && data.images.length > 0) {
      setActiveImage(data.images[0].url);
      setPrice(data.price);
      setStock(data.totalStock);
      setImages(data.images);
      data.variants.map((variant) => {
        variant.images.map((image) => {
          setImages((prev) => [...prev, image]);
        });
      });
    }
  }, [data]);

  useEffect(() => {
    if (error || isUpdated) {
      onClose();
    }
  }, [error, isUpdated]);

  const handleOverlayClick = (event) => {
    if (event.target.className === "product-details-overlay") {
      onClose();
    }
  };

  const ChooseSize = (newSize, newPrice, newStock) => {
    if (size === newSize) {
      setSize("");
      setPrice(data.price);
      setStock(variant.totalStock);
    } else {
      setSize(newSize);
      setPrice(newPrice);
      setStock(newStock);
    }
  };

  const handleApproved = (id, approved) => {
    setDecide(approved);
    const productData = new FormData();
    productData.set("approved", approved);
    dispatch(updateProductBasic(id, productData));
  };

  return (
    <Fragment>
      <div className="product-details-overlay" onClick={handleOverlayClick}>
        <div className="product-details-form">
          <button className="product-details-out" onClick={onClose}>
            <i className="fa fa-times"></i>
          </button>
          <div className="product-details-action">
            <button
              className="btn-three"
              onClick={() => handleApproved(data._id, "approved")}
            >
              Duyệt
            </button>
            <button
              className="btn-one"
              onClick={() => handleApproved(data._id, "notApproved")}
            >
              Từ Chối
            </button>
          </div>
          <div className="admin-detail-image-container ">
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
          <div className="detail-container">
            <div className="detail-content">
              <h1>{data.name}</h1>
              <p id="product_id">ID #{data._id}</p>
              <hr />
              <h1>
                Trạng thái:{" "}
                <span
                  id="stock_status"
                  className={data.totalStock > 0 ? "greenColor" : "redColor"}
                >
                  {data.totalStock > 0 ? "Còn hàng" : "Hết hàng"}
                </span>
              </h1>
              <hr />
              <div className="detail-color">
                <h1>Đánh giá:</h1>
                {data?.ratings?.toFixed(1).replace(".", ",") ?? "No Ratings"}
                <div className="rating-outer">
                  <div
                    className="rating-inner"
                    style={{ width: `${(data.ratings / 5) * 100}%` }}
                  ></div>
                </div>
              </div>
              <hr />
              <div
                className="detail-description"
                style={{ whiteSpace: "pre-wrap" }}
              >
                <p>
                  <strong style={{ fontSize: "20px" }}>Mô tả: </strong>
                  {data.description}
                </p>
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
                    maxWidth: "calc(5 * (75px + 40px))",
                  }}
                >
                  {data.variants && data.variants.length > 0 ? (
                    data.variants.map((variant, index) => (
                      <ProductVariant
                        key={index}
                        variant={variant}
                        index={index}
                        setSelectedVariant={setSelectedVariant}
                        selectedVariant={selectedVariant}
                        setStock={setStock}
                        setPrice={setPrice}
                        setInventory={setInventory}
                        setVariant={setVariant}
                        product={data}
                        setActiveImage={setActiveImage}
                        setImages={setImages}
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
                            ChooseSize(item.size, item.price, item.stock);
                          }}
                          style={{
                            border: size === item.size ? "solid 2px black" : "",
                            display: "flex",
                          }}
                        >
                          <div style={{ display: "flex" }}>{item.size} -</div>
                          <div
                            style={{ display: "flex", alignItems: "center" }}
                          >
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
              <div className="d-flex justify-cont   ent-between align-items-center">
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
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ProductDetails;
