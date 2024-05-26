import React, { Fragment, useState, useEffect, useCallback } from "react";

import MetaData from "../layout/MetaData";
import Sidebar from "./Sidebar";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import {
  newProduct,
  clearErrors,
  uploadImages,
} from "../../actions/productActions";
import { NEW_PRODUCT_RESET } from "../../constants/productConstants";
import { useNavigate } from "react-router-dom";
import Back from "../layout/Back";
import Variant from "./Variant";
import AddVariant from "./AddVariant";

const NewProduct = () => {
  const history = useNavigate();
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [variants, setVariants] = useState([]);
  const [show, setShow] = useState(false);

  const [emptyPrice, setEmptyPrice] = useState(false);
  const [emptyName, setEmptyName] = useState(false);
  const [emptyDescription, setEmptyDescription] = useState(false);
  const [emptyCategory, setEmptyCategory] = useState(false);
  const [emptyVariants, setEmptyVariants] = useState(false);
  const [variantError, setVariantError] = useState(false);

  const categories = ["Trousers", "Shirt", "Dress", "Shoe", "Belt"];
  const { loading, error, success } = useSelector((state) => state.newProduct);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      history("/admin/products");
      toast.success("Product created successfully");
      dispatch({ type: NEW_PRODUCT_RESET });
    }
  }, [dispatch, error, success, history]);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (
      name === "" ||
      price === 0 ||
      description === "" ||
      category === "" ||
      variants.length === 0
    ) {
      if (name === "") {
        setEmptyName(true);
      }
      if (price === "") {
        setEmptyPrice(true);
      }
      if (description === "") {
        setEmptyDescription(true);
      }
      if (category === "") {
        setEmptyCategory(true);
      }
      if (variants.length === 0) {
        setEmptyVariants(true);
      }
      return toast.error("Chưa điền đủ thông tin sản phẩm");
    }

    if (variantError) {
      return toast.error("Sản phẩm có mẫu chưa đủ thông tin");
    }

    const formData = new FormData();
    formData.set("name", name);
    formData.set("price", price);
    formData.set("description", description);
    formData.set("category", category);

    let variantsImages = [];

    await Promise.all(
      variants.map(async (variant, index) => {
        await Promise.all(
          variant.images.map(async (image) => {
            const upload = new FormData();
            upload.append("images", image);
            try {
              const result = await dispatch(uploadImages(upload));
              variantsImages.push({
                id: index,
                image: result,
              });
            } catch (error) {
              console.error("Error uploading image:", error);
            }
          })
        );
      })
    );

    const variantsResult = await Promise.all(variantsImages);

    const updatedVariants = [...variants];

    updatedVariants.forEach((variant, index) => {
      let variantImages = [];
      console.log(variantsResult);

      variantsResult.forEach((result) => {
        if (result.id === index) {
          variantImages.push({
            public_id: result.image.image.public_id,
            url: result.image.image.url,
          });
        }
      });

      const updatedVariant = {
        ...updatedVariants[index],
        images: variantImages,
      };

      updatedVariants[index] = updatedVariant;
    });

    let totalStock = 0;
    updatedVariants.forEach((variant) => {
      totalStock += variant.stock;
    });

    formData.set("totalStock", totalStock);
    formData.set("variants", JSON.stringify(updatedVariants));
    console.log(JSON.stringify(updatedVariants));
    dispatch(newProduct(formData));
  };

  const updateVariant = useCallback(
    (updatedVariant, index) => {
      setVariants((prevVariants) => {
        const currentVariants = [...prevVariants];
        currentVariants[index] = updatedVariant;
        return currentVariants;
      });
    },
    [setVariants]
  );

  const removeVariant = useCallback(
    (index) => {
      setVariants((prevVariants) => {
        const updatedVariants = [...prevVariants];
        updatedVariants.splice(index, 1);
        return updatedVariants;
      });
    },
    [setVariants]
  );

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

  return (
    <Fragment>
      <MetaData title={"New Product"} />
      <div className="row">
        <div className="col-12 col-md-2">
          <Sidebar />
        </div>

        <div className="col-12 col-md-10">
          <Fragment>
            <div className="wrapper my-5">
              <form
                className="new-product-form"
                onSubmit={submitHandler}
                encType="multipart/form-data"
              >
                <Back />
                <h1
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    fontSize: "25px",
                  }}
                >
                  Thêm sản phẩm
                </h1>
                <div className="form-group">
                  <label htmlFor="category_field">Danh mục</label>
                  <select
                    className={`form-control ${emptyCategory ? "invalid" : ""}`}
                    id="category_field"
                    value={category}
                    onChange={(e) => {
                      setEmptyCategory(false);
                      if (e.target.value !== "") {
                        setCategory(e.target.value);
                      }
                    }}
                  >
                    <option value="">Chọn một danh mục</option>
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                  {emptyCategory ? (
                    <p
                      style={{
                        fontWeight: "normal",
                        color: "red",
                        fontSize: "13px",
                      }}
                    >
                      Sản phẩm chưa chọn danh mục
                    </p>
                  ) : (
                    ""
                  )}
                </div>
                <div className="form-group">
                  <label htmlFor="name_field">Tên sản phẩm</label>
                  <input
                    type="text"
                    id="name_field"
                    placeholder="Nhập tên sản phẩm"
                    className={`form-control ${emptyName ? "invalid" : ""}`}
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
                      Sản phẩm chưa có tên
                    </p>
                  ) : (
                    ""
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="description_field">Mô tả</label>
                  <textarea
                    placeholder="Nhập mô tả sản phẩm"
                    className={`form-control ${
                      emptyDescription ? "invalid" : ""
                    }`}
                    id="description_field"
                    rows="8"
                    value={description}
                    onChange={(e) => {
                      setEmptyDescription(false);
                      setDescription(e.target.value);
                    }}
                  ></textarea>
                  {emptyDescription ? (
                    <p
                      style={{
                        fontWeight: "normal",
                        color: "red",
                        fontSize: "13px",
                      }}
                    >
                      Sản phẩm chưa có mô tả
                    </p>
                  ) : (
                    ""
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="price_field">Giá cơ bản</label>
                  <input
                    type="text"
                    placeholder="Nhập giá sản phẩm"
                    className={`form-control ${emptyPrice ? "invalid" : ""}`}
                    value={price < 0 ? 0 : price}
                    onChange={(e) => handlePriceChange(e)}
                  />
                  {emptyPrice ? (
                    <p
                      style={{
                        fontWeight: "normal",
                        color: "red",
                        fontSize: "13px",
                      }}
                    >
                      Sản phẩm chưa có giá
                    </p>
                  ) : (
                    ""
                  )}
                </div>

                <div>
                  <div
                    style={{
                      display: "flex",
                      gap: "20px",
                      alignItems: "center",
                      marginBottom: "20px",
                    }}
                  >
                    <label htmlFor="sizes_field">Mẫu mã</label>
                    <button
                      type="button"
                      className="varient-btn"
                      onClick={() => {
                        setShow(true);
                      }}
                    >
                      <i className="fa fa-plus"></i>Thêm
                    </button>
                  </div>
                  {emptyVariants ? (
                    <p
                      style={{
                        fontWeight: "normal",
                        color: "red",
                        fontSize: "13px",
                      }}
                    >
                      Sản phẩm chưa có mẫu
                    </p>
                  ) : (
                    ""
                  )}
                  {show && <AddVariant show={setShow} variants={setVariants} />}
                  <div className="varient-list">
                    {variants &&
                      variants.map((variant, index) => (
                        <Variant
                          key={index}
                          variant={variant}
                          index={index}
                          updateVariant={updateVariant}
                          removeVariant={removeVariant}
                          variantError={setVariantError}
                        />
                      ))}
                  </div>
                </div>

                <button
                  type="submit"
                  className="new-product-btn"
                  disabled={loading ? true : false}
                >
                  THÊM SẢN PHẨM
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
