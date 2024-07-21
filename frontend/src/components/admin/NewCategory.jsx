import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createCategory } from "../../actions/categoryActions";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CREATE_CATEGORY_RESET } from "../../constants/categoryConstants";
import { useNavigate } from "react-router-dom";
import Back from "../layout/Back";

const NewCategory = () => {
  const history = useNavigate();
  const [categoryName, setCategoryName] = useState("");
  const [vietnameseName, setVietnameseName] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [wait, setWait] = useState(false); // State to handle the wait time

  const dispatch = useDispatch();
  const { loading, error, success } = useSelector((state) => state.category);

  useEffect(() => {
    if (success) {
      toast.success("Category created successfully");
      dispatch({ type: CREATE_CATEGORY_RESET });
      setSubmitted(false); // Reset the submitted state
      setWait(true); // Start the wait state

      // Delay the navigation by 3 seconds
      setTimeout(() => {
        history("/admin/categories");
      }, 3000);
    }

    if (error) {
      toast.error(error);
      setSubmitted(false); // Allow retrying submission on error
    }
  }, [dispatch, success, error, history]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (categoryName.trim() === "" || vietnameseName.trim() === "") {
      toast.error("Please fill in all fields");
      return;
    }
    dispatch(createCategory({ categoryName, vietnameseName }));
    setSubmitted(true);
  };

  return (
    
    
    <div className="NewCategory-container">
      
      <ToastContainer />
      <form onSubmit={submitHandler} className="NewCategory-form-box">
        <h1 className="NewCategory-heading">Danh Mục mới</h1>
        <div className="NewCategory-form-group">
          <label htmlFor="categoryName" className="NewCategory-label">Tên danh mục (EN)</label>
          <input
            type="text"
            id="categoryName"
            className="NewCategory-form-control"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
          />
        </div>
        <div className="NewCategory-form-group">
          <label htmlFor="vietnameseName" className="NewCategory-label">Tên danh mục (VI)</label>
          <input
            type="text"
            id="vietnameseName"
            className="NewCategory-form-control"
            value={vietnameseName}
            onChange={(e) => setVietnameseName(e.target.value)}
          />
        </div>
        <div className="button-container">
      <button type="submit" className="NewCategory-button" disabled={loading || submitted || wait}>
        Thêm danh mục
      </button>
      <Back />
    </div>
      </form>
    </div>
  );
};

export default NewCategory;
