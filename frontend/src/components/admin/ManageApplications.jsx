import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getApplications,
  updateApplication,
} from "../../actions/applicationActions";
import DataTable from "../layout/DataTable";
import Pagination from "react-js-pagination";
import Application from "./Application";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  CLEAR_UPDATE_APPLICATION_ERRORS,
  UPDATE_APPLICATION_RESET,
} from "../../constants/applicationConstants";

const ManageApplications = () => {
  const dispatch = useDispatch();

  const { applications, loading, error, total } = useSelector(
    (state) => state.applications
  );

  const { isUpdated, updatedError } = useSelector((state) => state.application);

  const [currentPage, setCurrentPage] = useState(1);
  const [resPerPage, setResPerPage] = useState(5);
  const [keyword, setKeyword] = useState("");
  const [status, setStatus] = useState("");
  const [show, setShow] = useState(false);
  const [detail, setDetail] = useState({});

  useEffect(() => {
    dispatch(getApplications(currentPage, resPerPage, keyword, status));
  }, []);

  useEffect(() => {
    if (currentPage || resPerPage || keyword || status) {
      dispatch(getApplications(currentPage, resPerPage, keyword, status));
    }
  }, [currentPage, resPerPage, keyword, status]);

  useEffect(() => {
    if (isUpdated) {
      toast.success("Cập nhật thành công");
      dispatch({ type: UPDATE_APPLICATION_RESET });
      dispatch(getApplications(currentPage, resPerPage, keyword, status));
    }
    if (updatedError) {
      toast.error(updatedError);
      dispatch({ type: CLEAR_UPDATE_APPLICATION_ERRORS });
      dispatch(getApplications(currentPage, resPerPage, keyword, status));
    }
  }, [isUpdated, updatedError]);

  const setCurrentPageNo = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSegmentedTab = (choose) => {
    if (choose !== status) {
      setCurrentPage(1);
      if (choose === "all") {
        setStatus("");
      }
      if (choose === "approved") {
        setStatus("approved");
      }
      if (choose === "rejected") {
        setStatus("rejected");
      }
      if (choose === "pending") {
        setStatus("pending");
      }
    }
  };

  const handleResPerPage = (amount) => {
    if (amount !== resPerPage) {
      setResPerPage(amount);
      setCurrentPage(1);
    }
  };

  const handleApplicationDetail = (application) => {
    setShow(true);
    setDetail(application);
  };

  const handleSearch = (e) => {
    const keyword = e.target.value;
    setKeyword(keyword);
    setCurrentPage(1);
  };

  const handleApprove = (id, status) => {
    dispatch(updateApplication(id, status));
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
        {
          label: "TácVụ",
          field: "action",
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
              <div className="flex-horizental">
                <button
                  title="Xem chi tiết"
                  className={`btn btn-primary`}
                  onClick={() => handleApplicationDetail(application)}
                >
                  <i className="fa fa-eye"> </i>
                </button>
                <button
                  className="btn btn-success"
                  title="Duyệt"
                  onClick={() => {
                    if (application.status === "approved") {
                      return;
                    }
                    handleApprove(application._id, "approved");
                  }}
                >
                  <i className="fa fa-check-circle-o"> </i>
                </button>
                <button
                  className="btn btn-danger"
                  title="Từ Chối"
                  onClick={() => {
                    if (application.status === "rejected") {
                      return;
                    }
                    handleApprove(application._id, "rejected");
                  }}
                >
                  <i className="fa fa-window-close"> </i>
                </button>
              </div>
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
      <ToastContainer />
      {show && <Application data={detail} onClose={() => setShow(false)} />}
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
            htmlFor="pending"
            className={status === "pending" ? "marked" : ""}
          >
            <input
              type="radio"
              id="pending"
              name="status"
              value="pending"
              onChange={() => handleSegmentedTab("pending")}
              checked={status === "pending"}
            />
            Chờ Duyệt
          </label>
          <label
            htmlFor="approved"
            className={status === "approved" ? "marked" : ""}
          >
            <input
              type="radio"
              id="approved"
              name="status"
              value="approved"
              onChange={() => handleSegmentedTab("approved")}
              checked={status === "approved"}
            />
            Đã Duyệt
          </label>
          <label
            htmlFor="rejected"
            className={status === "rejected" ? "marked" : ""}
          >
            <input
              type="radio"
              id="rejected"
              name="status"
              value="rejected"
              onChange={() => handleSegmentedTab("rejected")}
              checked={status === "rejected"}
            />
            Từ Chối
          </label>
        </div>
        <div className="select-bar">
          <button onClick={() => handleResPerPage(5)}>5</button>
          <button onClick={() => handleResPerPage(10)}>10</button>
          <button onClick={() => handleResPerPage(100)}>100</button>
        </div>
        <input
          className="Search-input"
          type="search"
          placeholder="Search here..."
          onChange={(e) => handleSearch(e)}
        />
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
