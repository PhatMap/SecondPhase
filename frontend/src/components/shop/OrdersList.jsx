import React, { Fragment, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import DataTable from "../layout/DataTable";
import MetaData from "../layout/MetaData";
import Loader from "../layout/Loader";
import Pagination from "react-js-pagination";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import {
  allOrders,
  deleteOrder,
  clearErrors,
} from "../../actions/orderActions";
import { DELETE_ORDER_RESET } from "../../constants/orderConstants";
import { formatToVNDWithVND } from "../../utils/formatHelper";

const OrdersList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [deleteOrderId, setDeleteOrderId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [keyword, setKeyword] = useState("");
  const [status, setStatus] = useState("");
  const [resPerPage] = useState(10);

  const { loading, error, orders, totalOrders, filteredOrdersCount } = useSelector((state) => state.allOrders);
  const { isDeleted } = useSelector((state) => state.order);

  const statusTranslations = {
    Processing: "Xử Lý",
    canceled: "Đơn đã Hủy",
    "Order Confirmed": "Xác Nhận",
    Shipping: "Giao Hàng",
    Delivered: "Hoàn Thành",
  };

  useEffect(() => {
    console.log("Fetching orders with:", { currentPage, keyword, status, resPerPage });
    dispatch(allOrders(currentPage, keyword, status, resPerPage));

    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      toast.success("Xóa Đơn Hàng Thành Công");
      navigate("/shopkeeper/orders");
      dispatch({ type: DELETE_ORDER_RESET });
    }
  }, [dispatch, error, isDeleted, navigate, currentPage, keyword, status]);

  const deleteOrderHandler = (id, orderStatus) => {
    if (orderStatus === "Delivered") {
      toast.error("Không thể xóa đơn hàng hoàn thành.");
      return;
    }
    setDeleteOrderId(id);
    setShowModal(true);
  };

  const handleDeleteConfirmed = (id) => {
    dispatch(deleteOrder(id));
    setShowModal(false);
  };

  const setOrders = () => {
    const data = {
      columns: [
        {
          label: "Tên Khách Hàng",
          field: "name",
          sort: "asc",
        },
        {
          label: "Số Sản Phẩm",
          field: "numofItems",
          sort: "asc",
        },
        {
          label: "Tổng Tiền",
          field: "amount",
          sort: "asc",
        },
        {
          label: "Trạng thái đơn",
          field: "status",
          sort: "asc",
        },
        {
          label: "Tác vụ",
          field: "actions",
        },
      ],
      rows: [],
    };

    orders.forEach((order) => {
      data.rows.push({
        name: order.userName,
        numofItems: order.orderItems.length,
        amount: `${formatToVNDWithVND(order.totalPrice)}`,
        status: (
          <p
            style={{
              color: order.orderStatus === "Delivered" ? "green" : "red",
            }}
          >
            {statusTranslations[order.orderStatus]}
          </p>
        ),
        actions: (
          <Fragment>
            <Link
              to={`/shop/order/${order._id}`}
              className="btn btn-primary py-1 px-2"
            >
              <i className="fa fa-eye"></i>
            </Link>
            <button
              className="btn btn-danger py-1 px-2 ml-2"
              onClick={() => deleteOrderHandler(order._id, order.orderStatus)}
            >
              <i className="fa fa-trash"></i>
            </button>
          </Fragment>
        ),
      });
    });

    return data;
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1);
    dispatch(allOrders(1, keyword, status, resPerPage));
  };

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
    setCurrentPage(1);
    dispatch(allOrders(1, keyword, e.target.value, resPerPage));
  };

  return (
    <Fragment>
      <MetaData title={"All Orders"} />
      <ToastContainer />
      <div className="sidebar-content-container">
        <div className="manage-product-container">
          <Fragment>
            <h1
              className="my-4"
              style={{
                fontSize: "40px",
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              Tất Cả Đơn Hàng
            </h1>

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
                placeholder="Tìm kiếm đơn hàng..."
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                style={{
                  padding: "10px",
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                }}
              />
              <select
                value={status}
                onChange={handleStatusChange}
                style={{
                  padding: "10px",
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                }}
              >
                <option value="">Tất cả trạng thái</option>
                <option value="Processing">Xử Lý</option>
                <option value="canceled">Đơn đã Hủy</option>
                <option value="Order Confirmed">Xác Nhận</option>
                <option value="Shipping">Giao Hàng</option>
                <option value="Delivered">Hoàn Thành</option>
              </select>
              
            </form>

            {loading ? (
              <Loader />
            ) : (
              <Fragment>
                <DataTable data={setOrders()} />
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
                    itemsCountPerPage={resPerPage}
                    totalItemsCount={filteredOrdersCount}
                    onChange={handlePageChange}
                    nextPageText={"Next"}
                    prevPageText={"Prev"}
                    firstPageText={"First"}
                    lastPageText={"Last"}
                    itemClass="page-item"
                    linkClass="page-link"
                    pageRangeDisplayed={5}
                  />
                </div>
              </Fragment>
            )}
          </Fragment>
        </div>
      </div>
      {showModal && (
        <div className="delete-notify-container">
          <div className="delete-notify-form">
            <h1> Bạn có chắc chắn muốn xóa đơn hàng này không?</h1>
            <div className="delete-notify-btn-container">
              <button
                className="delete-notify-btn-container-yes"
                onClick={() => handleDeleteConfirmed(deleteOrderId)}
              >
                Yes
              </button>
              <button
                className="delete-notify-btn-container-no"
                onClick={() => setShowModal(false)}
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

export default OrdersList;