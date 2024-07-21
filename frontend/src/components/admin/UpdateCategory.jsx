import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCategoryDetails, updateCategory } from "../../actions/categoryActions";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UPDATE_CATEGORY_RESET } from "../../constants/categoryConstants";
import { useNavigate, useParams } from "react-router-dom";
import Back from "../layout/Back";

const UpdateCategory = () => {
  const { id: categoryId } = useParams();
  const [newCategoryName, setNewCategoryName] = useState("");
  const [newVietnameseName, setNewVietnameseName] = useState("");
  const [errors, setErrors] = useState({});
  const [disableSubmit, setDisableSubmit] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const { category, loading, error, success } = useSelector((state) => state.category);

  useEffect(() => {
    if (!category || category._id !== categoryId) {
      dispatch(getCategoryDetails(categoryId));
    } else {
      setNewCategoryName(category.categoryName);
      setNewVietnameseName(category.vietnameseName);
    }

    if (success) {
      toast.success("Category updated successfully");
      dispatch({ type: UPDATE_CATEGORY_RESET });
      setDisableSubmit(true); // Disable the submit button
      setTimeout(() => {
        navigate("/admin/categories");
      }, 3000);
    }

    if (error) {
      toast.error(error);
    }
  }, [dispatch, success, error, category, categoryId, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();
    const validationErrors = {};

    if (!newCategoryName.trim()) {
      validationErrors.newCategoryName = "Tên danh mục mới (EN) không được để trống";
    }

    if (!newVietnameseName.trim()) {
      validationErrors.newVietnameseName = "Tên danh mục mới (VI) không được để trống";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    dispatch(updateCategory({ _id: categoryId, categoryName: newCategoryName, vietnameseName: newVietnameseName }));
  };

  return (
    <div className="update-category-container">
      <div className="update-category-box">
        <ToastContainer />
        {loading ? (
          <p>Đang tải...</p>
        ) : category ? (
          <form onSubmit={submitHandler} className="update-category-form-box">
            <div className="update-category-header">
              <h1>Chỉnh sửa danh mục</h1>
              {category && (
                <h3 className="category-old-names">{category.categoryName} - {category.vietnameseName}</h3>
              )}
            </div>
            <div className="update-category-form-group">
              <label htmlFor="newCategoryName">Tên danh mục mới (EN)</label>
              <input
                type="text"
                id="newCategoryName"
                className="update-category-form-control"
                placeholder={category.categoryName}
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
              />
              {errors.newCategoryName && (
                <p className="error-message">{errors.newCategoryName}</p>
              )}
            </div>
            <div className="update-category-form-group">
              <label htmlFor="newVietnameseName">Tên danh mục mới (VI)</label>
              <input
                type="text"
                id="newVietnameseName"
                className="update-category-form-control"
                placeholder={category.vietnameseName}
                value={newVietnameseName}
                onChange={(e) => setNewVietnameseName(e.target.value)}
              />
              {errors.newVietnameseName && (
                <p className="error-message">{errors.newVietnameseName}</p>
              )}
            </div>
            <div className="update-category-button-container">
              <button type="submit" className="btn update-category-btn-primary" disabled={loading || disableSubmit}>
                Cập nhật danh mục
              </button>
              <Back />
            </div>
          </form>
        ) : (
          <p>Không tìm thấy danh mục</p>
        )}
      </div>
    </div>
  );
};

export default UpdateCategory;
