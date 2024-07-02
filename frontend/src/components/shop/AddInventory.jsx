import { set } from "mongoose";
import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddInventory = ({ setInventory, inventory }) => {
  const sizeType = ["XS", "S", "M", "L", "XL", "XXL"];
  const [stock, setStock] = useState("");
  const [size, setSize] = useState("");
  const [price, setPrice] = useState("");

  const [emptyStock, setEmptyStock] = useState(false);
  const [emptySize, setEmptySize] = useState(false);
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

  const ChooseSize = (size) => {
    setEmptySize(false);
    if (size === "") {
      return;
    }
    setSize(size);
  };

  const AddInventory = () => {
    if (size === "" || stock === "" || price === "") {
      if (size === "") {
        setEmptySize(true);
      }
      if (stock === "") {
        setEmptyStock(true);
      }
      if (price === "") {
        setEmptyPrice(true);
      }
      return toast.error("Chưa điền đủ thông tin kho");
    }

    if (inventory.length > 0) {
      const checkSize = inventory.find((item) => item.size === size);
      if (checkSize) {
        return toast.error("Kích thước đã tồn tại");
      }
    }

    setInventory((prev) => [
      ...prev,
      { size: size, price: price, stock: stock },
    ]);
    setStock("");
    setSize("");
    setPrice("");
  };

  const handlerInventoryRemove = (index) => {
    const newInventory = inventory.filter((inv, i) => i !== index);
    setInventory(newInventory);
  };

  return (
    <div style={{ display: "flex", gap: "10px" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
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
          {emptySize ? (
            <p
              style={{
                fontWeight: "normal",
                color: "red",
                fontSize: "13px",
              }}
            >
              Chưa có kích thước
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
              Chưa có số lượng
            </p>
          ) : (
            ""
          )}
        </div>
        <button
          type="button"
          className="varient-btn"
          onClick={() => {
            AddInventory();
          }}
        >
          <i className="fa fa-plus"></i>Thêm
        </button>
      </div>

      <div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            height: "50px",
            gap: "5px",
          }}
        >
          {inventory.length > 0
            ? inventory.map((item, index) => (
                <div key={index} style={{ display: "flex", gap: "5px" }}>
                  <p>{item.size}</p>
                  <p>- Giá: {item.price}</p>
                  <p>- SL: {item.stock}</p>
                  <i
                    className="fa fa-remove variant-remove-btn"
                    onClick={() => handlerInventoryRemove(index)}
                  ></i>
                </div>
              ))
            : ""}
        </div>
      </div>
    </div>
  );
};

export default AddInventory;
