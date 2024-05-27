import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddInventory from "./AddInventory";

const variant = ({
  variant,
  index,
  updateVariant,
  removeVariant,
  variantError,
}) => {
  const [name, setName] = useState(variant.name);
  const [price, setPrice] = useState(variant.price);
  const [image, setImage] = useState(variant.image);
  const [inventory, setInventory] = useState(variant.inventory);

  const [emptyName, setEmptyName] = useState(false);
  const [emptyPrice, setEmptyPrice] = useState(false);

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

  useEffect(() => {
    const updatedVariant = {
      name,
      image,
      price,
      inventory,
    };

    if (name === "" || price === "") {
      if (name === "") {
        setEmptyName(true);
      }
      if (price === "") {
        setEmptyPrice(true);
      }
      variantError(true);
    } else {
      updateVariant(updatedVariant, index);
    }
  }, [name, image, price, inventory, updateVariant, index]);

  const handleRetweetClick = () => {
    const fileInput = document.getElementById("change");
    if (fileInput) {
      fileInput.click();
    }
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

        {image && (
          <img
            src={image.url ? image.url : image}
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

        <AddInventory setInventory={setInventory} inventory={inventory} />

        <i
          className="fa fa-remove variant-remove-btn"
          onClick={() => removeVariant(index)}
        ></i>
      </div>
    </div>
  );
};

export default variant;
