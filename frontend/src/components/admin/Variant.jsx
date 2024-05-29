import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddInventory from "./AddInventory";
import { set } from "mongoose";

const variant = ({
  variant,
  index,
  updateVariant,
  removeVariant,
  variantError,
}) => {
  const [name, setName] = useState(variant.name);
  const [images, setImages] = useState(variant.images);
  const [inventory, setInventory] = useState(variant.inventory);
  const [totalStock, setTotalStock] = useState(variant.totalStock);

  const [emptyName, setEmptyName] = useState(false);
  const [emptyImages, setEmptyImages] = useState(false);
  const [emptyInventory, setEmptyInventory] = useState(false);

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

  useEffect(() => {
    setEmptyName(false);
    setEmptyImages(false);
    setEmptyInventory(false);

    let newTotalStock = 0;
    inventory.forEach((item) => {
      newTotalStock += item.stock;
    });

    setTotalStock(newTotalStock);

    const updatedVariant = {
      name,
      images,
      inventory,
      totalStock: newTotalStock,
    };

    if (name === "" || images.length === 0 || inventory.length === 0) {
      if (name === "") {
        setEmptyName(true);
      }
      if (images.length === 0) {
        setEmptyImages(true);
      }
      if (inventory.length === 0) {
        setEmptyInventory(true);
      }
      variantError(true);
    } else {
      updateVariant(updatedVariant, index);
    }
  }, [name, images, inventory, updateVariant, index]);

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
                      src={image.url ? image.url : image}
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
          <AddInventory setInventory={setInventory} inventory={inventory} />
          {emptyInventory ? (
            <p
              style={{
                fontWeight: "normal",
                color: "red",
                fontSize: "13px",
              }}
            >
              Mẫu chưa có kích cỡ
            </p>
          ) : (
            ""
          )}
        </div>
        <p>Total Variant Stock: {totalStock}</p>

        <i
          className="fa fa-remove variant-remove-btn"
          onClick={() => removeVariant(index)}
        ></i>
      </div>
    </div>
  );
};

export default variant;
