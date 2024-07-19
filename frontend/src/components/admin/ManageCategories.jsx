import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DataTable from "../layout/DataTable";
import { useDispatch, useSelector } from "react-redux";
import { getCategories, deleteCategory } from "../../actions/categoryActions";
import Pagination from "react-js-pagination";
import DeleteNotify from "../layout/DeleteNotify";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { DELETE_CATEGORY_RESET } from "../../constants/categoryConstants";

const ManageCategories = () => {
  const dispatch = useDispatch();
  const { categories, isDeleted } = useSelector((state) => state.category);
  const [show, setShow] = useState(false);
  const [deletedCategory, setDeletedCategory] = useState("");

  useEffect(() => {
 

    if (isDeleted) {
      toast.success("Xóa danh mục thành công");
      dispatch({ type: DELETE_CATEGORY_RESET });
    }

    dispatch(getCategories());
  }, [dispatch, isDeleted]);

  const handleDeleteCategory = (categoryId) => {
    setShow(true);
    setDeletedCategory(categoryId);
  };

  const handleConfirmDelete = () => {
    dispatch(deleteCategory(deletedCategory));
    setShow(false);
  };

  const setCategories = () => {
    const data = {
      columns: [
        {
          label: "Tên",
          field: "name",
        },
        {
          label: "Ảnh",
          field: "image",
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
          name: category.name,
          image: (
            <img
              src={category.image} // Thay đổi source hình ảnh tương ứng
              alt={category.name}
              style={{ width: "50px", height: "50px" }}
            />
          ),
          action: (
            <Fragment>
              <Link
                to={`/admin/category/${category._id}`}
                className="btn btn-primary py-1 px-2"
              >
                <i className="fa fa-pencil"></i>
              </Link>
              <button
                className="btn btn-danger py-1 px-2 ml-2"
                onClick={() => handleDeleteCategory(category._id)}
              >
                <i className="fa fa-trash"></i>
              </button>
            </Fragment>
          ),
        });
      });
    }

    return data;
  };

  return (
    <Fragment>
      {show && (
        <DeleteNotify show={setShow} func={handleConfirmDelete} paras={[]} />
      )}
      <ToastContainer />
      <div className="flex-center-screen">
        <DataTable data={setCategories()} />
      </div>
    </Fragment>
  );
};

export default ManageCategories;
