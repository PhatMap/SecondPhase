import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCategoryDetails, updateCategory } from "../../actions/categoryActions";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UPDATE_CATEGORY_RESET } from "../../constants/categoryConstants";
import { useNavigate, useParams } from "react-router-dom";

const UpdateCategory = () => {
  const { id: categoryId } = useParams();
  const [newCategoryName, setNewCategoryName] = useState("");
  const [newVietnameseName, setNewVietnameseName] = useState("");

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
      navigate("/admin/categories");
    }

    if (error) {
      toast.error(error);
    }
  }, [dispatch, success, error, category, categoryId, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateCategory({ _id: categoryId, categoryName: newCategoryName, vietnameseName: newVietnameseName }));
  };

  return (
    <div className="container">
      <ToastContainer />
      <h1>Chỉnh sửa danh mục</h1>
      {loading ? (
        <p>Đang tải...</p>
      ) : category ? (
        <form onSubmit={submitHandler}>
          <div className="form-group">
            <label htmlFor="categoryNameOld">Tên danh mục hiện tại (EN)</label>
            <input
              type="text"
              id="categoryNameOld"
              className="form-control"
              value={category.categoryName || ""}
              readOnly
            />
          </div>
          <div className="form-group">
            <label htmlFor="newCategoryName">Tên danh mục mới (EN)</label>
            <input
              type="text"
              id="newCategoryName"
              className="form-control"
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="vietnameseNameOld">Tên danh mục hiện tại (VI)</label>
            <input
              type="text"
              id="vietnameseNameOld"
              className="form-control"
              value={category.vietnameseName || ""}
              readOnly
            />
          </div>
          <div className="form-group">
            <label htmlFor="newVietnameseName">Tên danh mục mới (VI)</label>
            <input
              type="text"
              id="newVietnameseName"
              className="form-control"
              value={newVietnameseName}
              onChange={(e) => setNewVietnameseName(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-primary" disabled={loading}>
            Cập nhật danh mục
          </button>
        </form>
      ) : (
        <p>Không tìm thấy danh mục</p>
      )}
    </div>
  );
};

export default UpdateCategory;
