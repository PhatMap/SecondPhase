import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddInventory from "./AddInventory";

const AddVariant = ({ show, variants }) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [inventory, setInventory] = useState([]);

  const [emptyName, setEmptyName] = useState(false);
  const [emptyPrice, setEmptyPrice] = useState(false);
  const [emptyImage, setEmptyImage] = useState(false);

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

  const CloseHandler = () => {
    show(false);
  };

  const ConfirmHandler = () => {
    if (name === "" || price === 0 || image.length === 0) {
      if (name === "") {
        setEmptyName(true);
      }
      if (price === "") {
        setEmptyPrice(true);
      }
      if (image.length === 0) {
        setEmptyImage(true);
      }
      return toast.error("Chưa điền đủ thông tin mẫu");
    }

    const newVariant = {
      name,
      image,
      price,
      inventory,
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

        <AddInventory setInventory={setInventory} inventory={inventory}/>
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
