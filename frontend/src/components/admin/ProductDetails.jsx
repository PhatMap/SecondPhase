import React, { Fragment, useEffect, useState } from "react";
import ProductVariant from "../product/ProductVariant";
import { formatToVNDWithVND } from "../../utils/formatHelper";
import ProductImageZoom from "../product/ProductImageZoom";

const ProductDetails = ({ data, onClose }) => {
  const [activeImage, setActiveImage] = useState("");
  const [selectedVariant, setSelectedVariant] = useState("");
  const [images, setImages] = useState("");

  const handleOverlayClick = (event) => {
    if (event.target.className === "application-overlay") {
      onClose();
    }
  };

  return (
    <Fragment>
      <div className="application-overlay" onClick={handleOverlayClick}>
        <div className="application-form">
          <div className="detail-container">
            <div style={{ height: "100%" }}>
              <div className="detail-image-container">
                <div className="detail-images">
                  {data.images &&
                    data.images.map((image, index) => (
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
                        product={data}
                        setActiveImage={setActiveImage}
                        setImages={setImages}
                      />
                    ))
                  ) : (
                    <h1>Không có mẫu</h1>
                  )}
                </div>
              </div>
              {data.inventory && <hr />}
              {data.inventory && data.inventory.length > 0 && (
                <div className="d-flex justify-content-between align-items-center">
                  <div className="detail-color">
                    <h1>Kích cỡ:</h1>
                    <div className="size-button-container">
                      {data.inventory.map((item, index) => (
                        <button
                          className="size-button"
                          key={index}
                          onClick={() => {
                            ChooseSize(
                              index,
                              item.size,
                              item.price,
                              item.stock
                            );
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
              <div className="d-flex justify-content-between align-items-center">
                <div className="detail-color">
                  <h1>Giá:</h1>
                  <p style={{ fontSize: "20px", color: "green" }}>
                    {formatToVNDWithVND(data.price)}
                  </p>
                </div>
              </div>
              <hr />
              <div className="d-flex justify-content-between align-items-center">
                <div className="detail-color">
                  <h1>Số lượng:</h1>
                  <p style={{ fontSize: "20px", color: "green" }}>
                    {data.stock > 0 ? data.stock : "Hết hàng"}
                  </p>
                </div>
              </div>
              <hr />

              <div className="d-flex justify-content-between align-items-center">
                {data.size && (
                  <div className="stockCounter d-inline">
                    <input
                      type="number"
                      className="form-control count d-inline"
                      value={data.quantity}
                      onChange={(e) => handlerQuantity(e)}
                    />
                  </div>
                )}
              </div>
              <div className="review-container"></div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ProductDetails;
