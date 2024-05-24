import React, { useEffect, useState } from "react";

const variant = ({ variant, index, updateVariant, removeVariant }) => {
  const sizeType = ["XS", "S", "M", "L", "XL", "XXL"];

  const [name, setName] = useState(variant.name);
  const [size, setSize] = useState(variant.size);
  const [price, setPrice] = useState(variant.price);
  const [stock, setStock] = useState(variant.stock);
  const [image, setImage] = useState(variant.image);

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

  useEffect(() => {
    const updatedVariant = {
      name,
      size,
      image,
      price,
      stock,
    };
    updateVariant(updatedVariant, index);
  }, [name, size, image, price, stock, updateVariant, index]);

  const handleRetweetClick = () => {
    const fileInput = document.getElementById("change");
    if (fileInput) {
      fileInput.click();
    }
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
            className="fa fa-retweet variant-retweet-btn"
            onClick={handleRetweetClick}
          >
            <label className="variant-upload-btn" hidden>
              <input
                id="change"
                type="file"
                name="image"
                hidden
                onChange={onChange}
              />
            </label>
          </i>
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

        <i
          className="fa fa-remove variant-remove-btn"
          onClick={() => removeVariant(index)}
        ></i>
      </div>
    </div>
  );
};

export default variant;
