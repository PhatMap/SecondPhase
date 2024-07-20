import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createCategory } from "../../actions/categoryActions";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CREATE_CATEGORY_RESET } from "../../constants/categoryConstants";
import { useNavigate } from "react-router-dom";
const NewCategory = () => {
    const history = useNavigate();
  const [categoryName, setCategoryName] = useState("");
  const [vietnameseName, setVietnameseName] = useState("");

  const dispatch = useDispatch();
  const { loading, error, success } = useSelector((state) => state.category);

  useEffect(() => {
    if (success) {
      toast.success("Category created successfully");
      dispatch({ type: CREATE_CATEGORY_RESET });
      history("/admin/categories");
    }

    if (error) {
      toast.error(error);
    }
  }, [dispatch, success, error, history]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createCategory({ categoryName, vietnameseName }));
  };

  return (
    <div className="container">
      <ToastContainer />
      <form onSubmit={submitHandler}>
        <h1>Thêm danh mục mới</h1>
        <div className="form-group">
          <label htmlFor="categoryName">Tên danh mục (EN)</label>
          <input
            type="text"
            id="categoryName"
            className="form-control"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="vietnameseName">Tên danh mục (VI)</label>
          <input
            type="text"
            id="vietnameseName"
            className="form-control"
            value={vietnameseName}
            onChange={(e) => setVietnameseName(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary" disabled={loading}>
          Thêm danh mục
        </button>
      </form>
    </div>
  );
};

export default NewCategory;
