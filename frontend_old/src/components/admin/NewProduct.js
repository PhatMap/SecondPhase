import React, { Fragment, useState, useEffect } from "react";

import MetaData from "../layout/MetaData";
import Sidebar from "./Sidebar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { newProduct, clearErrors } from "../../actions/productActions";
import { NEW_PRODUCT_RESET } from "../../constants/productConstants";
import { useNavigate } from "react-router-dom";

const NewProduct = () => {
  const history = useNavigate();
  const [name, setName] = useState("");
  const [colorName, setColorName] = useState("");

  const [colorHex, setColorHex] = useState("");

  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [sizes, setSizes] = useState([]);
  const [size, setSize] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState(0);
  const [seller, setSeller] = useState("");
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);
  const categories = ["Trousers", "Shirt", "Dress", "Shoe", "Belt"];
  const sizeType = ["XS", "S", "M", "L", "XL", "XXL"];
  const dispatch = useDispatch();
  const { loading, error, success } = useSelector((state) => state.newProduct);
  const colors = [
    { colorName: "black", colorHex: ["#222222", "#111111", "#000000"] },
    { colorName: "white", colorHex: ["#FFFFFF", "#F8F8F8", "#F0F0F0"] },
    { colorName: "red", colorHex: ["#FF0000", "#E60000", "#CC0000"] },
    { colorName: "blue", colorHex: ["#0000FF", "#0000CC", "#000099"] },
    { colorName: "green", colorHex: ["#00FF00", "#00E600", "#00CC00"] },
    { colorName: "yellow", colorHex: ["#FFFF00", "#FFFF33", "#FFFF66"] },
    { colorName: "orange", colorHex: ["#FFA500", "#FF8C00", "#FF7F50"] },
    { colorName: "purple", colorHex: ["#800080", "#9932CC", "#9400D3"] },
    { colorName: "pink", colorHex: ["#FFC0CB", "#FFB6C1", "#FF69B4"] },
    { colorName: "gray", colorHex: ["#808080", "#A9A9A9", "#C0C0C0"] },
    // Add other colors as needed
  ];

  useEffect(() => {
    if (error) {
      toast.error(error, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      dispatch(clearErrors());
    }

    if (success) {
      history("/admin/products");
      toast.success("Product created successfully", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      dispatch({ type: NEW_PRODUCT_RESET });
    }
    if (size) {
      AddSize();
      setSize("");
    }
  }, [dispatch, error, success, history, size]);

  const AddSize = () => {
    for (let i = 0; i < sizes.length; i++) {
      if (sizes[i] === size) {
        return;
      }
    }
    setSizes((oldArray) => [...oldArray, size]);
  };

  const submitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.set("name", name);
    formData.set("colors[colorName]", colorName);
    formData.set("colors[colorHex]", colorHex);
    formData.set("price", price);
    formData.set("description", description);
    formData.set("category", category);
    formData.set("stock", stock);
    formData.set("seller", seller);

    sizes.forEach((size, index) => {
      formData.append(`sizes[${index}]`, size);
    });

    images.forEach((image) => {
      formData.append("images", image);
    });

    dispatch(newProduct(formData));
  };

  const onChange = (e) => {
    const files = Array.from(e.target.files);

    setImagesPreview([]);
    setImages([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((oldArray) => [...oldArray, reader.result]);
          setImages((oldArray) => [...oldArray, reader.result]);
        }
      };

      reader.readAsDataURL(file);
    });
  };

  const handleColorNameChange = (e) => {
    setColorName(e.target.value);
    // Reset hex value when color name changes
    setColorHex("");
  };

  const handleDeleteSize = (index) => {
    sizes.splice(index, 1);
  };

  const ChooseSize = (size) => {
    if (size === "") {
      return;
    }
    setSize(size);
  };

  return (
    <Fragment>
      <ToastContainer />
      <MetaData title={"New Product"} />
      <div className="row">
        <div className="col-12 col-md-2">
          <Sidebar />
        </div>

        <div className="col-12 col-md-10">
          <Fragment>
            <div className="wrapper my-5">
              <form
                className="shadow-lg"
                onSubmit={submitHandler}
                encType="multipart/form-data"
              >
                <h1 className="mb-4">New Product</h1>

                <div className="form-group">
                  <label htmlFor="name_field">Name</label>
                  <input
                    type="text"
                    id="name_field"
                    className="form-control"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="color_name_field">Color Name</label>
                  <select
                    id="color_name_field"
                    className="form-control"
                    value={colorName}
                    onChange={handleColorNameChange}
                  >
                    <option value="">Select Color</option>
                    {colors.map((color) => (
                      <option key={color.colorName} value={color.colorName}>
                        {color.colorName}
                      </option>
                    ))}
                  </select>
                </div>

                {colorName && (
                  <div id="color_hex_field" className="d-flex flex-wrap">
                    {colors
                      .find((color) => color.colorName === colorName)
                      ?.colorHex.map((hex, index) => (
                        <div
                          key={index}
                          style={{
                            backgroundColor: hex,
                            width: hex === colorHex ? "32px" : "36px",
                            height: hex === colorHex ? "32px" : "36px",
                            margin: "4px",
                            cursor: "pointer",
                            border:
                              hex === colorHex ? "2px solid black" : "none",
                            transition: "all 0.2s ease",
                          }}
                          onClick={() => setColorHex(hex)}
                        ></div>
                      ))}
                  </div>
                )}

                {colorName && colorHex && (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      marginBottom: "10px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        marginBottom: "5px",
                      }}
                    >
                      <div style={{ minWidth: "100px", marginRight: "10px" }}>
                        {colorName}
                      </div>
                      <div
                        style={{
                          width: "20px",
                          height: "20px",
                          backgroundColor: colorHex,
                          border: "1px solid #ddd",
                          marginRight: "10px",
                        }}
                      />
                    </div>
                  </div>
                )}
                <div className="form-group">
                  <label htmlFor="price_field">Price</label>
                  <input
                    type="text"
                    id="price_field"
                    className="form-control"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="description_field">Description</label>
                  <textarea
                    className="form-control"
                    id="description_field"
                    rows="8"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  ></textarea>
                </div>

                <div className="form-group">
                  <label htmlFor="sizes_field">Sizes</label>
                  <div className="delete-size-container">
                    {sizes.map((size, index) => (
                      <div key={size} className="name-deleteBtn-container">
                        <span>{size}</span>
                        <button
                          className="delete-size-btn"
                          onClick={() => handleDeleteSize(index)}
                        >
                          -
                        </button>
                      </div>
                    ))}
                  </div>

                  <select
                    className="form-control"
                    id="sizes_field"
                    value={size}
                    onChange={(e) => ChooseSize(e.target.value)}
                  >
                    <option value="">Select and add sizes</option>
                    {sizeType.map((size, index) => (
                      <option key={index} value={size}>
                        {size}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="category_field">Category</label>
                  <select
                    className="form-control"
                    id="category_field"
                    value={category}
                    onChange={(e) => {
                      if (e.target.value !== "") {
                        setCategory(e.target.value);
                      }
                    }}
                  >
                    <option value="">Select a catagory</option>
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="stock_field">Stock</label>
                  <input
                    type="number"
                    id="stock_field"
                    className="form-control"
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="seller_field">Seller Name</label>
                  <input
                    type="text"
                    id="seller_field"
                    className="form-control"
                    value={seller}
                    onChange={(e) => setSeller(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label>Images</label>

                  <div className="custom-file">
                    <input
                      type="file"
                      name="product_images"
                      className="custom-file-input"
                      id="customFile"
                      onChange={onChange}
                      multiple
                    />
                    <label className="custom-file-label" htmlFor="customFile">
                      Choose Images
                    </label>
                  </div>

                  {imagesPreview.map((img, index) => (
                    <img
                      src={img}
                      key={index}
                      alt="Images Preview"
                      className="mt-3 mr-2"
                      width="55"
                      height="52"
                    />
                  ))}
                </div>

                <button
                  id="login_button"
                  type="submit"
                  className="btn btn-block py-3"
                  disabled={loading ? true : false}
                >
                  CREATE
                </button>
              </form>
            </div>
          </Fragment>
        </div>
      </div>
    </Fragment>
  );
};

export default NewProduct;
