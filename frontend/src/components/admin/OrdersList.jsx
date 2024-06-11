import React, { Fragment, useState,useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MDBDataTable } from "mdbreact";
import MetaData from "../layout/MetaData";
import Loader from "../layout/Loader";
import Sidebar from "./Sidebar";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import {
  allOrders,
  deleteOrder,
  clearErrors,
} from "../../actions/orderActions";
import { DELETE_ORDER_RESET } from "../../constants/orderConstants";

const OrdersList = () => {
  const history = useNavigate();
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const { loading, error, orders } = useSelector((state) => state.allOrders);
  const { isDeleted } = useSelector((state) => state.order);
  const [deleteOrderId, setDeleteOrderId] = useState(null);

  const statusTranslations = {
    "Processing": "Xử Lý",
    "canceled": "Đơn đã Hủy",
    "Order Confirmed": "Xác Nhận",
    "Shipping": "Giao Hàng",
    "Received": "Đã Nhận",
    "Delivered": "Hoàn Thành",
  };

  useEffect(() => {
    dispatch(allOrders());

    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      toast.success("Xóa Đơn Hàng Thành Công");
      history("/admin/orders");
      dispatch({ type: DELETE_ORDER_RESET });
    }
  }, [dispatch, error, isDeleted, history]);

  const deleteOrderHandler = (id, orderStatus) => {
    if (orderStatus === "Delivered" || orderStatus === "Received") {
      toast.error("Không thể xóa đơn hàng đã giao hoặc đã nhận.");
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
          label: "Customer name",
          field: "name",
          sort: "asc",
        },
        {
          label: "No of Items",
          field: "numofItems",
          sort: "asc",
        },
        {
          label: "Total Amount",
          field: "amount",
          sort: "asc",
        },
        {
          label: "Status",
          field: "status",
          sort: "asc",
        },
        {
          label: "Actions",
          field: "actions",
        },
      ],
      rows: [],
    };

    orders.forEach((order) => {
      data.rows.push({
        name: order.userName,
        numofItems: order.orderItems.length,
        amount: `${order.totalPrice} VND`,
        status: (
          <p style={{ 
            color: order.orderStatus === "Delivered" ? "green" : 
                   order.orderStatus === "Received" ? "orange" : "red"
          }}>
            {statusTranslations[order.orderStatus]}
          </p>
        ),
        actions: (
          <Fragment>
            <Link
              to={`/admin/order/${order._id}`}
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

  return (
    <Fragment>
      <MetaData title={"All Orders"} />
      <ToastContainer />
      <div className="sidebar-content-container">
        <div className="">
          <Sidebar />
        </div>

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
              All Orders
            </h1>

            {loading ? (
              <Loader />
            ) : (
              <MDBDataTable
                data={setOrders()}
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
