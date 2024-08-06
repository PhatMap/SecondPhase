import React, { Fragment, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import DataTable from "../layout/DataTable";
import { useDispatch, useSelector } from "react-redux";
import { getAllCoupons, deleteCoupon,toggleStatus  } from "../../actions/couponActions";
import Pagination from "react-js-pagination";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  DELETE_COUPON_RESET,
  UPDATE_COUPON_RESET,
  TOGGLE_STATUS_RESET,
  CREATE_COUPON_RESET,
  CLEAR_ERRORS
} from "../../constants/couponConstants";

const ManageCoupons = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, coupons, totalCoupons, success,isStatusUpdated } = useSelector(
    (state) => state.coupon // Ensure this matches the slice name in your root reducer
  );

  const [currentPage, setCurrentPage] = useState(1);
  const [keyword, setKeyword] = useState("");
  const [show, setShow] = useState(false);
  const [couponToDelete, setCouponToDelete] = useState(null);
  useEffect(() => {
    if (isStatusUpdated) {
      toast.success("Cập nhật trạng thái thành công");
      dispatch({ type: TOGGLE_STATUS_RESET });
      dispatch(getAllCoupons(currentPage, keyword));
    }
  }, [dispatch, isStatusUpdated, currentPage, keyword]);

  useEffect(() => {
    dispatch(getAllCoupons(currentPage, keyword));

    if (success) {
      toast.success("Xóa Thành Công Phiếu Giảm Giá");
      dispatch({ type: DELETE_COUPON_RESET });
      dispatch({ type: UPDATE_COUPON_RESET });
      dispatch({ type: CREATE_COUPON_RESET });
    }

    if (error) {
      toast.error(error);
      dispatch({ type: CLEAR_ERRORS });
    }
  }, [dispatch, success, error, currentPage, keyword]);

  const deleteHandler = (id) => {
    setShow(true);
    setCouponToDelete(id);
  };

  const confirmDelete = () => {
    dispatch(deleteCoupon(couponToDelete));
    dispatch(getAllCoupons(currentPage, keyword));
    setShow(false);

  };

  const cancelDelete = () => {
    setShow(false);
    setCouponToDelete(null);
  };
  const handleBanCoupon = (id) => {
    dispatch(toggleStatus(id));
  };

  const setCoupons = () => {
    const data = {
      columns: [
        {
          label: "Phần trăm giảm",
          field: "percentage",
        },
        {
          label: "Vai trò",
          field: "role",
        },
        {
          label: "Mô tả",
          field: "description",
        },
        {
          label: "Số lượng",
          field: "quantity",
        },
        {
          label: "Hạn sử dụng",
          field: "expiry",
        },
        {
          label: "Tác vụ",
          field: "action",
        },
      ],
      rows: [],
    };

    if (coupons && coupons.length > 0) {
      coupons.forEach((coupon) => {
        data.rows.push({
          percentage: `${coupon.percentage}%`,
          role: coupon.role,
          description: coupon.description,
          quantity: coupon.quantity,
          expiry: new Date(coupon.expiry).toLocaleDateString(),
          action: (
            <Fragment>
              <div className="flex-horizontal">
                <Link
                  to={`/admin/coupon/update/${coupon._id}`}
                  className="btn btn-primary py-1 px-2"
                >
                  <i className="fa fa-pencil"></i>
                </Link>
                <button
                  className="btn btn-danger py-1 px-2 ml-2"
                  onClick={() => deleteHandler(coupon._id)}
                >
                  <i className="fa fa-trash"></i>
                </button>
                <button
                  className="btn btn-warning py-1 ml-2"
                  onClick={() => handleBanCoupon (coupon._id)}
                >
                  <i
                    className={`fa ${
                      coupon.status === "active" ? "fa fa-unlock" : "fa fa-lock"
                    }`}
                  ></i>
                </button>
              </div>
            </Fragment>
          ),
        });
      });
    } else {
      data.rows.push({
        percentage: "Trống",
        role: "Trống",
        description: "Trống",
        quantity: "Trống",
        expiry: "Trống",
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
    dispatch(getCoupons(1, keyword));
  };

  return (
    <Fragment>
      <ToastContainer />
      <h1
        className="my-5"
        style={{ fontWeight: "bold", textAlign: "center", fontSize: "24px" }}
      >
        Quản lý Phiếu Giảm Giá
      </h1>

      <div className="mb-4" style={{ display: "flex", marginLeft: "5rem" }}>
        <Link to="/admin/coupon/new" className="btn btn-primary">
          Thêm phiếu giảm giá mới
        </Link>
      </div>
      <form
        onSubmit={handleSearch}
        style={{
          display: "flex",
          marginLeft: "5rem",
          gap: "10px",
          marginBottom: "20px",
        }}
      >
        <input
          type="text"
          placeholder="Tìm kiếm phiếu giảm giá..."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          style={{
            padding: "10px",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
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
            <DataTable data={setCoupons()} />
          </div>
          <div
            className="d-flex justify-content-center mt-5"
            style={{
              display: "flex",
              justifyContent: "center",
              marginBottom: "2rem",
            }}
          >
            <Pagination
              activePage={currentPage}
              itemsCountPerPage={10}
              totalItemsCount={totalCoupons}
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
        <div className="delete-notify-container">
          <div className="delete-notify-form">
            <h1 style={{ marginBottom: "20px" }}>Xóa Phiếu Giảm Giá Này?</h1>
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
    </Fragment>
  );
};

export default ManageCoupons;
