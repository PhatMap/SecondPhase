import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddVariant = ({ show, variants }) => {
  const sizeType = ["XS", "S", "M", "L", "XL", "XXL"];

  const [name, setName] = useState("");
  const [size, setSize] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [image, setImage] = useState("");

  const [emptyName, setEmptyName] = useState(false);
  const [emptyPrice, setEmptyPrice] = useState(false);
  const [emptySize, setEmptySize] = useState(false);
  const [emptyImage, setEmptyImage] = useState(false);
  const [emptyStock, setEmptyStock] = useState(false);

  const handlePriceChange = (e) => {
    const inputValue = e.target.value;
    setEmptyPrice(false);

    if (!isNaN(inputValue) && inputValue !== "") {
      const numericValue = parseFloat(inputValue);
      if (numericValue >= 0) {
        setPrice(numericValue);
      } else {
        setPrice(-numericValue);
      }
    } else {
      setPrice("");
    }
  };

  const handleStockChange = (e) => {
    const inputValue = e.target.value;
    setEmptyStock(false);

    if (!isNaN(inputValue) && inputValue !== "") {
      const numericValue = parseFloat(inputValue);
      if (numericValue >= 0) {
        setStock(numericValue);
      } else {
        setStock(-numericValue);
      }
    } else {
      setStock("");
    }
  };

  const CloseHandler = () => {
    show(false);
  };

  const ConfirmHandler = () => {
    if (
      name === "" ||
      price === 0 ||
      size === "" ||
      image.length === 0 ||
      stock === ""
    ) {
      if (name === "") {
        setEmptyName(true);
      }
      if (price === "") {
        setEmptyPrice(true);
      }
      if (size === "") {
        setEmptySize(true);
      }
      if (stock === "") {
        setEmptyStock(true);
      }
      if (image.length === 0) {
        setEmptyImage(true);
      }
      return toast.error("Chưa điền đủ thông tin mẫu");
    }

    const newVariant = {
      name,
      size,
      image,
      price,
      stock,
    };

    variants((prev) => [...prev, newVariant]);

    show(false);
  };

  // useEffect(() => {
  //   console.log(variant);
  // }, [variant]);

  const onChange = (e) => {
    const files = Array.from(e.target.files);

    setImage("");

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImage(reader.result);
        }
      };

      reader.readAsDataURL(file);
    });
  };

  const ChooseSize = (size) => {
    if (size === "") {
      return;
    }
    setSize(size);
  };
  return (
    <div>
      <div className="variant-form">
        <div>
          <input
            type="text"
            className={`form-control ${emptyName ? "invalid" : ""}`}
            placeholder="Tên mẫu"
            value={name}
            onChange={(e) => {
              setEmptyName(false);
              setName(e.target.value);
            }}
          />
          {emptyName ? (
            <p
              style={{
                fontWeight: "normal",
                color: "red",
                fontSize: "13px",
              }}
            >
              Mẫu chưa có tên
            </p>
          ) : (
            ""
          )}
        </div>
        <div>
          <select
            className={`form-control ${emptySize ? "invalid" : ""}`}
            value={size}
            onChange={(e) => ChooseSize(e.target.value)}
          >
            <option value="">Chọn size</option>
            {sizeType.map((size, index) => (
              <option value={size} key={index}>
                {size}
              </option>
            ))}
          </select>
          {emptyName ? (
            <p
              style={{
                fontWeight: "normal",
                color: "red",
                fontSize: "13px",
              }}
            >
              Mẫu chưa có kích thước
            </p>
          ) : (
            ""
          )}
        </div>

        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
            {image && (
              <img
                src={image}
                alt="Image Preview"
                style={{ width: "50px", height: "50px" }}
              />
            )}
            {image && (
              <i
                className="fa fa-remove variant-remove-btn"
                onClick={() => setImage("")}
              ></i>
            )}
            {!image && (
              <label className="variant-upload-btn">
                <input type="file" name="image" hidden onChange={onChange} />
                Chọn ảnh
              </label>
            )}{" "}
          </div>
          {emptyImage ? (
            <p
              style={{
                fontWeight: "normal",
                color: "red",
                fontSize: "13px",
              }}
            >
              Mẫu chưa có ảnh
            </p>
          ) : (
            ""
          )}
        </div>
        <div>
          <input
            placeholder="Giá"
            type="text"
            className={`form-control ${emptyPrice ? "invalid" : ""}`}
            value={price < 0 ? 0 : price}
            onChange={(e) => handlePriceChange(e)}
          ></input>
          {emptyPrice ? (
            <p
              style={{
                fontWeight: "normal",
                color: "red",
                fontSize: "13px",
              }}
            >
              Mẫu chưa có giá
            </p>
          ) : (
            ""
          )}
        </div>
        <div>
          <input
            placeholder="Số lượng"
            type="text"
            className={`form-control ${emptyStock ? "invalid" : ""}`}
            value={stock < 0 ? 0 : stock}
            onChange={(e) => handleStockChange(e)}
          ></input>
          {emptyStock ? (
            <p
              style={{
                fontWeight: "normal",
                color: "red",
                fontSize: "13px",
              }}
            >
              Mẫu chưa có số lượng
            </p>
          ) : (
            ""
          )}
        </div>
      </div>
      <div className="btn-container">
        <button
          type="button"
          className="variant-confirm-btn"
          onClick={() => ConfirmHandler()}
        >
          Xác nhận
        </button>
        <button
          type="button"
          className="variant-cancel-btn "
          onClick={() => CloseHandler()}
        >
          Hủy
        </button>
      </div>
    </div>
  );
};

export default AddVariant;
