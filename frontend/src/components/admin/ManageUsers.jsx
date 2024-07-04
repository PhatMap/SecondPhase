import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DataTable from "../layout/DataTable";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../../actions/userActions";
import Pagination from "react-js-pagination";
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
                onClick={() => handleDeleteUser(user._id)}
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
  const { loading, error, users, total } = useSelector(
    (state) => state.getUsers
  );

  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState("");
  const [keyword, setKeyword] = useState("");
  const [resPerPage, setResPerPage] = useState(1);

  const setCurrentPageNo = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

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

  return (
    <Fragment>
      <div className="flex-center-screen">
        <div className="flex-horizental">
          <div className="select-bar">
            <button onClick={() => setResPerPage(1)}>1</button>
            <button onClick={() => setResPerPage(10)}>10</button>
            <button onClick={() => setResPerPage(100)}>100</button>
          </div>
          <div className="select-bar">
            <button onClick={() => setFilter("")}>Tất cả</button>
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
    </Fragment>
  );
};

export default ManageUsers;
