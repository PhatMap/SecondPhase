import React, { useState, useEffect, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createCategory } from "../../actions/categoryActions";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CREATE_CATEGORY_RESET } from "../../constants/categoryConstants";
import { useNavigate } from "react-router-dom";

const NewCategory = ({ onClose }) => {
  const history = useNavigate();
  const [image, setImage] = useState(null);
  const [categoryName, setCategoryName] = useState("");
  const [vietnameseName, setVietnameseName] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const dispatch = useDispatch();
  const { loading, error, success } = useSelector((state) => state.category);

  useEffect(() => {
    if (success) {
      toast.success("Tạo Danh Mục Thành Công");
      setSubmitted(false);
      dispatch({ type: CREATE_CATEGORY_RESET });
      onClose();
    }

    if (error) {
      toast.error(error);
      setSubmitted(false);
    }
  }, [dispatch, success, error, history]);

  const submitHandler = (e) => {
    e.preventDefault();

    if (
      categoryName.trim() === "" ||
      vietnameseName.trim() === "" ||
      image === null
    ) {
      toast.error("Hãy điền đầy đủ thông tin");
      setSubmitted(false);
      return;
    }
    setSubmitted(true);

    dispatch(createCategory({ categoryName, vietnameseName, image }));
  };

  const handlerOverlayClick = (e) => {
    if (e.target.className === "new-category-overlay" && !submitted) {
      onClose();
    }
  };

  const onChange = (e) => {
    const files = Array.from(e.target.files);

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setImage((prev) => ({
            ...prev,
            public_id: "",
            url: reader.result,
          }));
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
            {image && (
              <img src={image.url} alt="Category" width={50} height={50} />
            )}
            <label htmlFor="categoryName" className="NewCategory-label">
              Tên danh mục (EN)
            </label>
            <input
              type="text"
              id="categoryName"
              className="NewCategory-form-control"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
            />
          </div>
          <div className="NewCategory-form-group">
            <label htmlFor="vietnameseName" className="NewCategory-label">
              Tên danh mục (VI)
            </label>
            <input
              type="text"
              id="vietnameseName"
              className="NewCategory-form-control"
              value={vietnameseName}
              onChange={(e) => setVietnameseName(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className={`add-btn ${submitted ? "disabled" : ""}`}
          >
            Tạo
          </button>
        </form>
      </div>
    </Fragment>
  );
};

export default NewCategory;
