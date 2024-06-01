import React, { Fragment, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MDBDataTable } from "mdbreact";

import MetaData from "../layout/MetaData";
import Loader from "../layout/Loader";
import Sidebar from "./Sidebar";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { allUsers, updateUser, deleteUser, clearErrors } from "../../actions/userActions";
import { DELETE_USER_RESET } from "../../constants/userConstants";
import DeleteNotify from "../layout/DeleteNotify";

const UsersList = () => {
  const [deleteMessage, setDeleteMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [deleteUserId, setDeleteUserId] = useState(null);
  const [deleteUserRole, setDeleteUserRole] = useState(null);
  const history = useNavigate();

  const dispatch = useDispatch();

  const { loading, error, users } = useSelector((state) => state.allUsers);
  const { isDeleted } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(allUsers());

    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      toast.success("Xóa Người Dùng Thành Công");
      dispatch({ type: DELETE_USER_RESET });
      setDeleteMessage(""); // Reset delete message
    }
  }, [dispatch, error, isDeleted]);

  const handleDeleteUser = (id, role) => {
    if (role === "admin") {
      toast.error("Tài Khoản Admin Không Thể Xóa.");
    } else {
      setDeleteUserId(id);
      setDeleteUserRole(role);
      setShowModal(true); // Hiển thị modal
    }
  };

  const handleDeleteConfirmed = () => {
    if (deleteUserRole === "user") {
      const formData = new FormData();
      formData.set("role", "banned");
      dispatch(updateUser(deleteUserId, formData))
      dispatch(allUsers());
      toast.success("Người dùng đã được chuyển sang vai trò 'banned' thành công");
    } else {
      dispatch(deleteUser(deleteUserId))
      dispatch(allUsers());

    }
    setShowModal(false); // Ẩn modal sau khi xác nhận xóa
  };

  const handleDeleteCancel = () => {
    setShowModal(false); // Ẩn modal khi hủy xóa
  };

  const setUsers = () => {
    const data = {
      columns: [
        {
          label: "Họ Tên",
          field: "name",
          sort: "asc",
        },
        {
          label: "Ảnh Đại Diện",
          field: "image",
          sort: "asc",
        },
        {
          label: "Email",
          field: "email",
          sort: "asc",
        },
        {
          label: "Vai trò",
          field: "role",
          sort: "asc",
        },
        {
          label: "Tác vụ",
          field: "actions",
        },
      ],
      rows: [],
    };

    users.forEach((user) => {
      data.rows.push({
        name: user.name,
        image: (
          <img
            src={user.avatar.url}
            alt={user.name}
            style={{ width: "50px", height: "50px" }}
          />
        ),
        email: user.email,
        role: user.role,
        actions: (
          <Fragment>
            <Link
              to={`/admin/user/${user._id}`}
              className="btn btn-primary py-1 px-2"
            >
              <i className="fa fa-pencil"></i>
            </Link>
            <button
              className="btn btn-danger py-1 px-2 ml-2"
              onClick={() => handleDeleteUser(user._id, user.role)}
            >
              <i className="fa fa-trash"></i>
            </button>
          </Fragment>
        ),
      });
    });

    return data;
  };

  return (
    <Fragment>
      <MetaData title={"All Users"} />
      <div className="row">
        <div className="col-12 col-md-2">
          <Sidebar />
        </div>

        <div className="manage-alluser-container">
          <Fragment>
          <h1 className="my-4" style={{ fontSize: '40px', fontWeight: 'bold', textAlign: 'center' }}>Danh Sách Khách Hàng</h1>
            <Link to="/admin/users/new" className="alluser-add-btn-container">
              <i className="fa fa-plus alluser-add-btn"></i>
              <p>Khách Hàng Mới</p>
            </Link>

            {deleteMessage && (
              <div className="alert alert-danger">{deleteMessage}</div>
            )}

            {loading ? (
              <Loader />
            ) : (
              <MDBDataTable
                data={setUsers()}
                className="px-3"
                bordered
                striped
                hover
                noBottomColumns
              />
            )}
          </Fragment>
        </div>
      </div>
      {showModal && (
        <DeleteNotify
          show={setShowModal}
          func={handleDeleteConfirmed}
          paras={[]}
        />
      )}
      <ToastContainer />
    </Fragment>
  );
};

export default UsersList;
