import React, { useState, useEffect, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createCategory, updateCategory } from "../../actions/categoryActions";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  CREATE_CATEGORY_RESET,
  UPDATE_CATEGORY_RESET,
} from "../../constants/categoryConstants";
import { useNavigate } from "react-router-dom";

const CategoryForm = ({ onClose, data }) => {
  const { error, success, updated } = useSelector((state) => state.category);

  const history = useNavigate();
  const [formData, setFormData] = useState(
    data || {
      image: null,
      categoryName: "",
      vietnameseName: "",
    }
  );
  const [submitted, setSubmitted] = useState(false);
  const [update, setUpdate] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    if (success) {
      toast.success("Tạo Danh Mục Thành Công");
      setSubmitted(false);
      dispatch({ type: CREATE_CATEGORY_RESET });
      onClose();
    }

    if (updated) {
      toast.success("Cập Nhật Danh Mục Thành Công");
      setUpdate(false);
      dispatch({ type: UPDATE_CATEGORY_RESET });
    }

    if (error) {
      toast.error(error);
      setSubmitted(false);
    }
  }, [dispatch, success, error, updated]);

  const submitHandler = (e) => {
    e.preventDefault();

    if (
      formData.categoryName.trim() === "" ||
      formData.vietnameseName.trim() === "" ||
      formData.image === null
    ) {
      toast.error("Hãy điền đầy đủ thông tin");
      setSubmitted(false);
      setUpdate(false);
      return;
    }

    if (!data) {
      setSubmitted(true);
      dispatch(createCategory(formData));
    } else {
      setUpdate(true);
      dispatch(updateCategory(formData));
    }
  };

  const handlerOverlayClick = (e) => {
    if (
      e.target.className === "new-category-overlay" &&
      (!submitted || !update)
    ) {
      onClose();
    }
  };

  const onChange = (e) => {
    const files = Array.from(e.target.files);

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setFormData({
            ...formData,
            image: { public_id: "", url: reader.result },
          });
        }
      };
      formData;
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

  return (
    <Fragment>
      <div
        className="new-category-overlay"
        onClick={(e) => handlerOverlayClick(e)}
      >
        <form onSubmit={submitHandler} className="NewCategory-form-box">
          <h1 className="NewCategory-heading">Tạo Danh Mục</h1>
          <div className="NewCategory-form-group">
            <label
              className={`upload-form `}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
            >
              <input type="file" name="images" onChange={onChange} hidden />
              <i
                className="fa fa-cloud-upload"
                aria-hidden="true"
                style={{ fontSize: "30px" }}
              ></i>
              <p>
                <strong>Kéo Thả </strong>hoặc <strong>Nhấn </strong>
                để đưa ảnh lên
              </p>
            </label>
            {formData.image && (
              <img
                src={formData.image.url}
                alt="Category"
                width={50}
                height={50}
              />
            )}
            <label htmlFor="categoryName" className="NewCategory-label">
              Tên danh mục (EN)
            </label>
            <input
              type="text"
              id="categoryName"
              className="NewCategory-form-control input-style-1"
              value={formData.categoryName}
              onChange={(e) =>
                setFormData({ ...formData, categoryName: e.target.value })
              }
            />
          </div>
          <div className="NewCategory-form-group">
            <label htmlFor="vietnameseName" className="NewCategory-label">
              Tên danh mục (VI)
            </label>
            <input
              type="text"
              id="vietnameseName"
              className="NewCategory-form-control input-style-1"
              value={formData.vietnameseName}
              onChange={(e) =>
                setFormData({ ...formData, vietnameseName: e.target.value })
              }
            />
          </div>
          {!data && (
            <button
              type="submit"
              className={`add-btn ${submitted ? "disabled" : ""}`}
            >
              Tạo
            </button>
          )}
          {data && (
            <button
              type="submit"
              className={`add-btn ${update ? "disabled" : ""}`}
            >
              Cập Nhật
            </button>
          )}
        </form>
      </div>
    </Fragment>
  );
};

export default CategoryForm;
