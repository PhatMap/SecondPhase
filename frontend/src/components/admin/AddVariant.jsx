import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddInventory from "./AddInventory";

const AddVariant = ({ show, variants }) => {
  const [name, setName] = useState("");
  const [images, setImages] = useState([]);
  const [inventory, setInventory] = useState([]);

  const [emptyName, setEmptyName] = useState(false);
  const [emptyImages, setEmptyImages] = useState(false);

  const CloseHandler = () => {
    show(false);
  };

  const ConfirmHandler = () => {
    if (name === "" || images.length === 0) {
      if (name === "") {
        setEmptyName(true);
      }
      if (images.length === 0) {
        setEmptyImages(true);
      }
      return toast.error("Chưa điền đủ thông tin mẫu");
    }

    let totalStock = 0;
    inventory.forEach((item) => {
      totalStock += item.stock;
    });

    const newVariant = {
      name,
      images,
      inventory,
      totalStock,
    };

    variants((prev) => [...prev, newVariant]);

    show(false);
  };

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

        <AddInventory setInventory={setInventory} inventory={inventory} />
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
