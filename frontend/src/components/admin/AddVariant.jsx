import React, { useEffect, useState } from "react";

const AddVariant = ({ show, variants }) => {
  const sizeType = ["XS", "S", "M", "L", "XL", "XXL"];

  const [name, setName] = useState("");
  const [size, setSize] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [image, setImage] = useState("");

  const [emptyName, setEmptyName] = useState(false);
  const [emptyPrice, setEmptyPrice] = useState(false);
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
        <input
          type="text"
          id="name_field"
          className={`form-control ${emptyName ? "invalid" : ""}`}
          placeholder="Tên mẫu"
          value={name}
          onChange={(e) => {
            setEmptyName(false);
            setName(e.target.value);
          }}
        />
        <select
          className="variant-select"
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
        )}
        <input
          placeholder="Giá"
          type="text"
          className={`form-control ${emptyPrice ? "invalid" : ""}`}
          value={price < 0 ? 0 : price}
          onChange={(e) => handlePriceChange(e)}
        ></input>
        <input
          placeholder="Số lượng"
          type="text"
          className={`form-control ${emptyStock ? "invalid" : ""}`}
          value={stock < 0 ? 0 : stock}
          onChange={(e) => handleStockChange(e)}
        ></input>
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
