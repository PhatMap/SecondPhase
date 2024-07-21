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

const ManageCategories = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, categories, totalCategories, success } = useSelector((state) => state.category);

  const [currentPage, setCurrentPage] = useState(1);
  const [keyword, setKeyword] = useState("");
  const [show, setShow] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);

  useEffect(() => {
    dispatch(getCategories(currentPage, keyword));

    if (success) {
      toast.success("Xóa Thành Công Danh Mục và Tất Cả Sản Phẩm Liên Quan");
      dispatch({ type: DELETE_CATEGORY_RESET });
      dispatch({ type: UPDATE_CATEGORY_RESET });
      dispatch({ type: CREATE_CATEGORY_RESET });
    }

    if (error) {
      toast.error(error);
    }
  }, [dispatch, success, error, currentPage, keyword]);

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
              <div className="flex-horizontal">
                <Link to={`/admin/category/update/${category._id}`} className="btn btn-primary py-1 px-2">
                  <i className="fa fa-pencil"></i>
                </Link>
                <button className="btn btn-danger py-1 px-2 ml-2" onClick={() => deleteHandler(category._id)}>
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
      <h1 className="my-5" style={{ fontWeight: "bold", textAlign: "center", fontSize: "24px" }}>Quản lý Danh mục</h1>

      <div className="mb-4" style={{ display: "flex", marginLeft: "5rem" }}>
        <Link to="/admin/category/new" className="btn btn-primary">
          Thêm danh mục mới
        </Link>
      </div>
      <form onSubmit={handleSearch} style={{ display: "flex", marginLeft: "5rem", gap: "10px", marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Tìm kiếm danh mục..."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
        />
        <button type="submit" className="btn btn-primary">
          Tìm kiếm
        </button>
      </form>
      {loading ? (
        <h2 style={{ textAlign: "center" }}>Đang tải...</h2>
      ) : (
        <Fragment>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <DataTable data={setCategories()} />
          </div>
          <div className="d-flex justify-content-center mt-5"style={{ display: "flex", justifyContent: "center",marginBottom:"2rem" }}>
            <Pagination
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
          </div>
        </Fragment>
      )}
      {show && (
        <div className="delete-notify-container" >
          <div className="delete-notify-form" >
            <h1 style={{ marginBottom: "20px" }}>Xóa Danh Mục Này?</h1>
            <div className="delete-notify-btn-container">
              <button className="delete-notify-btn-container-yes" onClick={confirmDelete} >
                Yes
              </button>
              <button className="delete-notify-btn-container-no" onClick={cancelDelete} >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default ManageCategories;
