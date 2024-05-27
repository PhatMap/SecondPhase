import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddInventory = ({ setInventory, inventory }) => {
  const sizeType = ["XS", "S", "M", "L", "XL", "XXL"];
  const [stock, setStock] = useState("");
  const [size, setSize] = useState("");

  const [emptyStock, setEmptyStock] = useState(false);
  const [emptySize, setEmptySize] = useState(false);

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
    if (size === "") {
      return;
    }
    setSize(size);
  };

  const AddInventory = () => {
    if (size === "" || stock === "") {
      if (size === "") {
        setEmptySize(true);
      }
      if (stock === "") {
        setEmptyStock(true);
      }
      return toast.error("Chưa điền đủ thông tin kho");
    }

    setInventory((prev) => [...prev, { size: size, stock: stock }]);
    setStock("");
    setSize("");
  };

  return (
    <div>
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
      <div
        style={{
          display: "flex",
          alignItems: "center",
          height: "50px",
          gap: "5px",
        }}
      >
        {inventory.length > 0
          ? inventory.map((item, index) => (
              <div key={index}>
                <p>{item.size}</p>
                <p>{item.stock}</p>
              </div>
            ))
          : ""}
      </div>
    </div>
  );
};

export default AddInventory;
