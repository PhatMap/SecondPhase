import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getApplications } from "../../actions/applicationActions";
import DataTable from "../layout/DataTable";
import Pagination from "react-js-pagination";

const ManageApplications = () => {
  const dispatch = useDispatch();

  const { applications, loading, error, total } = useSelector(
    (state) => state.applications
  );

  const [currentPage, setCurrentPage] = useState(1);
  const [resPerPage, setResPerPage] = useState(5);
  const [keyword, setKeyword] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    dispatch(getApplications(currentPage, resPerPage, keyword, status));
  }, []);

  useEffect(() => {
    if (currentPage || resPerPage || keyword || status) {
      dispatch(getApplications(currentPage, resPerPage, keyword, status));
    }
  }, [currentPage, resPerPage, keyword, status]);

  const setCurrentPageNo = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSegmentedTab = (choose) => {
    if (choose !== status) {
      setCurrentPage(1);
      if (choose === "all") {
        setStatus("");
      }
      if (choose === "active") {
        setStatus("active");
      }
      if (choose === "inactive") {
        setStatus("inactive");
      }
    }
  };

  const handleResPerPage = (amount) => {
    if (amount !== resPerPage) {
      setResPerPage(amount);
      setCurrentPage(1);
    }
  };

  const setApplications = () => {
    const data = {
      columns: [
        {
          label: "Tên Cửa Hàng",
          field: "shopName",
        },
        {
          label: "Tên chủ cửa hàng",
          field: "ownerName",
        },
        {
          label: "Email",
          field: "email",
        },
        {
          label: "Số Liên hệ",
          field: "primaryPhone",
        },
        {
          label: "Ngày Đăng ký",
          field: "createdAt",
        },
        {
          label: "Trạng Thái",
          field: "status",
        },
      ],
      rows: [],
    };

    if (applications.length > 0) {
      applications.forEach((application) => {
        data.rows.push({
          shopName: application.shopInfor.shopName,
          ownerName: application.shopInfor.ownerName,
          email: application.shopInfor.email,
          primaryPhone: application.shopInfor.primaryPhone,
          createdAt: application.createdAt,
          status:
            application.status === "pending"
              ? "Chờ Duyệt"
              : application.status === "approved"
              ? "Đã Duyệt"
              : "Từ Chối",
          action: (
            <Fragment>
              <div className="flex-horizental"></div>
            </Fragment>
          ),
        });
      });
    } else {
      data.rows.push({
        shopName: "Trông",
        ownerName: "Trông",
        email: "Trông",
        primaryPhone: "Trông",
        createdAt: "Trông",
        status: "Trông",
      });
    }

    return data;
  };

  return (
    <Fragment>
      <div className="manage-application-container">
        <div>
          <h1 className="display-4 text-center">
            Quản Lý Đơn Đăng Ký Bán Hàng
          </h1>
          <p className="lead text-center">Manage Applications</p>
          <hr />
        </div>
        <div className="tabs">
          <label htmlFor="all" className={status === "" ? "marked" : ""}>
            <input
              type="radio"
              id="all"
              name="status"
              value="all"
              onChange={() => handleSegmentedTab("all")}
              checked={status === ""}
            />
            Tất cả trạng thái
          </label>

          <label
            htmlFor="active"
            className={status === "active" ? "marked" : ""}
          >
            <input
              type="radio"
              id="active"
              name="status"
              value="active"
              onChange={() => handleSegmentedTab("active")}
              checked={status === "active"}
            />
            Chờ Duyệt
          </label>
          <label
            htmlFor="inactive"
            className={status === "inactive" ? "marked" : ""}
          >
            <input
              type="radio"
              id="inactive"
              name="status"
              value="inactive"
              onChange={() => handleSegmentedTab("inactive")}
              checked={status === "inactive"}
            />
            Đã Duyệt
          </label>
          <label
            htmlFor="inactive"
            className={status === "inactive" ? "marked" : ""}
          >
            <input
              type="radio"
              id="inactive"
              name="status"
              value="inactive"
              onChange={() => handleSegmentedTab("inactive")}
              checked={status === "inactive"}
            />
            Từ Chối
          </label>
        </div>
        <div className="select-bar">
          <button onClick={() => handleResPerPage(3)}>3</button>
          <button onClick={() => handleResPerPage(10)}>10</button>
          <button onClick={() => handleResPerPage(100)}>100</button>
        </div>
        <DataTable data={setApplications()} />
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

export default ManageApplications;
