import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddVariant = ({ show, variants }) => {
  const sizeType = ["XS", "S", "M", "L", "XL", "XXL"];

  const [name, setName] = useState("");
  const [size, setSize] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [images, setImages] = useState([]);

  const [emptyName, setEmptyName] = useState(false);
  const [emptyPrice, setEmptyPrice] = useState(false);
  const [emptySize, setEmptySize] = useState(false);
  const [emptyImages, setEmptyImages] = useState(false);
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
      images.length === 0 ||
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
      if (images.length === 0) {
        setEmptyImages(true);
      }
      return toast.error("Chưa điền đủ thông tin mẫu");
    }

    const newVariant = {
      name,
      size,
      images,
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

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImages((oldArray) => [...oldArray, reader.result]);
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

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    e.currentTarget.classList.remove("hover");
    const files = e.dataTransfer.files;
    onChange({ target: { files } });
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    e.currentTarget.classList.add("hover");
  };
  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    e.currentTarget.classList.remove("hover");
  };

  const handlerImageRemove = (index) => {
    const newImagesFiles = images.filter((img, i) => i !== index);
    setImages(newImagesFiles);
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
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 5,
            }}
          >
            <div>
              <label
                className={`upload-form ${emptyImages ? "invalid" : ""}`}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
              >
                <input
                  type="file"
                  name="images"
                  onChange={onChange}
                  multiple
                  hidden
                />
                <i
                  class="fa fa-cloud-upload"
                  aria-hidden="true"
                  style={{ fontSize: "30px" }}
                ></i>
                <p>
                  <strong>Kéo Thả </strong>hoặc <strong>Nhấn </strong>
                  để đưa ảnh lên
                </p>
              </label>
            </div>

            <div style={{ display: "flex", gap: "5px" }}>
              {images &&
                images.length > 0 &&
                images.map((image, index) => (
                  <div key={index}>
                    <img
                      src={image}
                      alt="Image Preview"
                      style={{ width: "50px", height: "50px" }}
                    />
                    <i
                      className="fa fa-remove variant-remove-btn"
                      onClick={() => handlerImageRemove(index)}
                    ></i>
                  </div>
                ))}
            </div>
          </div>
          {emptyImages ? (
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
