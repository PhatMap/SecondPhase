import React, { Fragment, useEffect, useState } from "react";
import DataTable from "../layout/DataTable";
import { useDispatch, useSelector } from "react-redux";
import { getCategories, deleteCategory } from "../../actions/categoryActions";
import Pagination from "react-js-pagination";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { DELETE_CATEGORY_RESET } from "../../constants/categoryConstants";
import CategoryForm from "./CategoryForm";
import DeleteNotify from "../layout/DeleteNotify";

const ManageCategories = () => {
  const dispatch = useDispatch();
  const { error, categories, totalCategories, deleted } = useSelector(
    (state) => state.category
  );

  const [currentPage, setCurrentPage] = useState(1);
  const [keyword, setKeyword] = useState("");
  const [show, setShow] = useState(false);
  const [action, setAction] = useState("");
  const [categoryData, setCategoryData] = useState(null);
  const [categoryId, setCategoryId] = useState(null);

  useEffect(() => {
    dispatch(getCategories(currentPage, keyword));

    if (deleted) {
      toast.success("Xóa Thành Công Danh Mục");
      dispatch({ type: DELETE_CATEGORY_RESET });
    }

    if (error) {
      toast.error(error);
    }
  }, [dispatch, deleted, error, currentPage, keyword, action]);

  const handlerDelete = () => {
    dispatch(deleteCategory(categoryId));
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
                <button
                  className="btn-container-1 update"
                  onClick={() => {
                    setCategoryData(category);
                    setAction("update");
                  }}
                >
                  <i className="fa fa-pencil"></i>
                </button>
                <button
                  className="btn-container-1 delete"
                  onClick={() => {
                    setShow(true);
                    setCategoryId(category._id);
                  }}
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
                <button onClick={() => setAction("add")}>
                  <i className="fa fa-plus" />
                  <p>Tạo Danh Mục</p>
                </button>
                <form onSubmit={handleSearch}>
                  <input
                    className="input-style-1"
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
          </div>
        </div>
      </div>
      {show && <DeleteNotify show={setShow} func={handlerDelete} paras={[]} />}
      {action === "add" && <CategoryForm onClose={() => setAction("")} />}
      {action === "update" && (
        <CategoryForm onClose={() => setAction("")} data={categoryData} />
      )}
    </Fragment>
  );
};

export default ManageCategories;
