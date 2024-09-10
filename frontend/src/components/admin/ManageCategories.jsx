import React, { Fragment, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import DataTable from "../layout/DataTable";
import { useDispatch, useSelector } from "react-redux";
import { getCategories, deleteCategory } from "../../actions/categoryActions";
import Pagination from "react-js-pagination";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  DELETE_CATEGORY_RESET,
  UPDATE_CATEGORY_RESET,
  CREATE_CATEGORY_RESET,
} from "../../constants/categoryConstants";
import NewCategory from "./NewCategory";

const ManageCategories = () => {
  const dispatch = useDispatch();
  const { loading, error, categories, totalCategories, deleted } = useSelector(
    (state) => state.category
  );

  const [currentPage, setCurrentPage] = useState(1);
  const [keyword, setKeyword] = useState("");
  const [show, setShow] = useState(false);
  const [addCategory, setAddCategory] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);

  useEffect(() => {
    dispatch(getCategories(currentPage, keyword));

    if (deleted) {
      toast.success("Xóa Thành Công Danh Mục");
      dispatch({ type: DELETE_CATEGORY_RESET });
    }

    if (error) {
      toast.error(error);
    }
  }, [dispatch, deleted, error, currentPage, keyword]);

  const deleteHandler = (id) => {
    setShow(true);
    setCategoryToDelete(id);
  };

  const confirmDelete = () => {
    dispatch(deleteCategory(categoryToDelete));
    setShow(false);
  };

  const cancelDelete = () => {
    setShow(false);
    setCategoryToDelete(null);
  };

  const setCategories = () => {
    const data = {
      columns: [
        {
          label: "Tên danh mục (EN)",
          field: "categoryName",
        },
        {
          label: "Tên danh mục (VI)",
          field: "vietnameseName",
        },
        {
          label: "Tác vụ",
          field: "action",
        },
      ],
      rows: [],
    };

    if (categories && categories.length > 0) {
      categories.forEach((category) => {
        data.rows.push({
          categoryName: category.categoryName,
          vietnameseName: category.vietnameseName,
          action: (
            <Fragment>
              <div className="manage-category-table-btns">
                <Link
                  to={`/admin/category/update/${category._id}`}
                  className="btn btn-primary py-1 px-2"
                >
                  <i className="fa fa-pencil"></i>
                </Link>
                <button
                  className="btn btn-danger py-1 px-2 ml-2"
                  onClick={() => deleteHandler(category._id)}
                >
                  <i className="fa fa-trash"></i>
                </button>
              </div>
            </Fragment>
          ),
        });
      });
    } else {
      data.rows.push({
        categoryName: "Trống",
        vietnameseName: "Trống",
        action: "Trống",
      });
    }

    return data;
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1);
    dispatch(getCategories(1, keyword));
  };

  return (
    <Fragment>
      <ToastContainer />
      <div className="admin-layout">
        <div className="admin-container">
          <div className="manage-category-body">
            <div className="manage-category-head">
              <h1>Quản Lý Danh Mục</h1>
            </div>
            <div className="manage-category-form">
              <div className="horizontal-1 size-1 manage-category-form-btns">
                <button onClick={() => setAddCategory(true)}>
                  <i className="fa fa-plus" />
                  <p>Tạo Danh Mục</p>
                </button>
                <form onSubmit={handleSearch}>
                  <input
                    type="text"
                    placeholder="Tìm kiếm danh mục..."
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                  />
                </form>
              </div>
              <DataTable data={setCategories()} />
            </div>
            <Pagination
              className="pagination"
              activePage={currentPage}
              itemsCountPerPage={10}
              totalItemsCount={totalCategories}
              onChange={handlePageChange}
              nextPageText={"Next"}
              prevPageText={"Prev"}
              firstPageText={"First"}
              lastPageText={"Last"}
              itemClass="page-item"
              linkClass="page-link"
            />
            {show && (
              <div className="delete-notify-container">
                <div className="delete-notify-form">
                  <h1 style={{ marginBottom: "20px" }}>Xóa Danh Mục Này?</h1>
                  <div className="delete-notify-btn-container">
                    <button
                      className="delete-notify-btn-container-yes"
                      onClick={confirmDelete}
                    >
                      Yes
                    </button>
                    <button
                      className="delete-notify-btn-container-no"
                      onClick={cancelDelete}
                    >
                      No
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {addCategory && <NewCategory onClose={() => setAddCategory(false)} />}
    </Fragment>
  );
};

export default ManageCategories;
