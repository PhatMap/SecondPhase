import React, { Fragment, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import DataTable from "../layout/DataTable";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, getUsers, updateUser } from "../../actions/userActions";
import Pagination from "react-js-pagination";
import DeleteNotify from "../layout/DeleteNotify";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { DELETE_USER_RESET } from "../../constants/userConstants";
import { set } from "mongoose";

const ManageUsers = () => {
  const setUsers = () => {
    const data = {
      columns: [
        {
          label: "Họ Tên",
          field: "name",
        },
        {
          label: "Ảnh Đại Diện",
          field: "image",
        },
        {
          label: "Email",
          field: "email",
        },
        {
          label: "Vai trò",
          field: "role",
        },
        {
          label: "Tác vụ",
          field: "action",
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
        action: (
          <Fragment>
            <div className="flex-horizental">
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
            </div>
          </Fragment>
        ),
      });
    });

    return data;
  };
  const dispatch = useDispatch();
  const history = useNavigate();
  const [deleteMessage, setDeleteMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [deleteUserId, setDeleteUserId] = useState(null);
  const [deleteUserRole, setDeleteUserRole] = useState(null);
  const [prevUsersCount, setPrevUsersCount] = useState(0);

  const { loading, error, users, total } = useSelector(
    (state) => state.getUsers
  );

  const { isDeleted } = useSelector((state) => state.user);

  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [resPerPage, setResPerPage] = useState(1);
  const [checkList, setCheckList] = useState([]);

  const setCurrentPageNo = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      toast.success("Xóa Người Dùng Thành Công");
      dispatch({ type: DELETE_USER_RESET });
      setDeleteMessage("");
    }
  }, [dispatch, error, isDeleted]);

  useEffect(() => {
    dispatch(getUsers());
  }, []);

  useEffect(() => {
    if (currentPage || filter || keyword || resPerPage) {
      dispatch(getUsers(currentPage, filter, keyword, resPerPage));
    }
  }, [currentPage, filter, keyword, resPerPage]);

  useEffect(() => {
    if (users) {
      setUsers();
    }
  }, [users]);

  const handleSearch = (e) => {
    const keyword = e.target.value;
    setKeyword(keyword);
    setCurrentPage(1);
  };

  const handleDeleteUser = (id, role) => {
    if (role === "admin") {
      toast.error("Tài Khoản Admin Không Thể Xóa.");
    } else {
      setDeleteUserId(id);
      setDeleteUserRole(role);
      setShowModal(true);
    }
  };

  const handleDeleteConfirmed = () => {
    if (deleteUserRole === "user") {
      const formData = new FormData();
      formData.set("role", "banned");
      dispatch(updateUser(deleteUserId, formData));
      dispatch(getUsers());
      toast.success(
        "Người dùng đã được chuyển sang vai trò 'banned' thành công"
      );
    } else {
      dispatch(deleteUser(deleteUserId));
      dispatch(getUsers());
    }
    setShowModal(false);
  };

  const handleResPerPage = (amount) => {
    if (amount !== resPerPage) {
      setResPerPage(amount);
      setCurrentPage(1);
    }
  };

  const roles = ["user", "shopkeepper", "admin"];

  const handleCheckbox = (index) => {
    const list = [...checkList];
    list[index] = !list[index];
    setCheckList(list);

    if (list[index] === true) {
      setFilter([...filter, roles[index]]);
    } else {
      setFilter(filter.filter((role) => role !== roles[index]));
    }
  };

  const handleCheckAll = () => {
    setCheckList([false, false, false]);
    setFilter([]);
  };

  return (
    <Fragment>
      <ToastContainer />
      <div className="flex-center-screen">
        <button className="add-btn" onClick={() => history("/admin/addUser")}>
          <i className="fa fa-plus"></i> Thêm người dùng
        </button>
        <div className="flex-horizental">
          <div className="select-bar">
            <button onClick={() => handleResPerPage(1)}>1</button>
            <button onClick={() => handleResPerPage(10)}>10</button>
            <button onClick={() => handleResPerPage(100)}>100</button>
          </div>
          <div className="select-bar">
            <button onClick={() => handleCheckAll()}>Tất cả</button>
            <label className="check-btn">
              <input
                type="checkbox"
                checked={checkList[0]}
                onChange={() => handleCheckbox(0)}
                className="cart-checkbox"
              />
              <p>Khách hàng</p>
            </label>
            <label className="check-btn">
              <input
                type="checkbox"
                checked={checkList[1]}
                onChange={() => handleCheckbox(1)}
                className="cart-checkbox"
              />
              <p>Chủ cửa hàng</p>
            </label>
            <label className="check-btn">
              <input
                type="checkbox"
                checked={checkList[2]}
                onChange={() => handleCheckbox(2)}
                className="cart-checkbox"
              />
              <p>Quản trị viên</p>
            </label>
            <button onClick={() => setFilter("user")}>Khách hàng</button>
            <button onClick={() => setFilter("shopkeepper")}>Người bán</button>
            <button onClick={() => setFilter("admin")}>Quản trị viên</button>
          </div>
          <input
            className="Search-input"
            type="search"
            placeholder="Search here..."
            onChange={(e) => handleSearch(e)}
          />
        </div>
        <DataTable data={setUsers()} />
        <Pagination
          activePage={currentPage}
          itemsCountPerPage={total > resPerPage ? resPerPage : total}
          totalItemsCount={total > resPerPage ? total : 1}
          onChange={setCurrentPageNo}
          nextPageText={"Tiếp"}
          prevPageText={"Trước"}
          firstPageText={"Đầu"}
          lastPageText={"Cuối"}
          itemClass="page-item"
          linkClass="page-link"
        />
      </div>
      {showModal && (
        <DeleteNotify
          show={setShowModal}
          func={handleDeleteConfirmed}
          paras={[]}
        />
      )}
    </Fragment>
  );
};

export default ManageUsers;
