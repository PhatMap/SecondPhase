import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import { MDBDataTable } from "mdbreact";
import MetaData from "../layout/MetaData";
import Loader from "../layout/Loader";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { myOrders, clearErrors } from "../../actions/orderActions";
import { formatToVNDWithVND } from "../../utils/formatHelper";

const ListOrders = () => {
  const dispatch = useDispatch();

  const { loading, error, orders } = useSelector((state) => state.myOrders);
  const statusTranslations = {
    Processing: "Xử Lý",
    canceled: " Đơn đã Hủy",
    "Order Confirmed": "Xác Nhận",
    Received: "Đã Nhận",
    Shipping: "Giao Hàng",
    Delivered: "Hoàn Thành",
  };

  useEffect(() => {
    dispatch(myOrders());

    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, error]);

  const setOrders = () => {
    const data = {
      columns: [
        {
          label: "ID",
          field: "id",
          sort: "asc",
        },
        {
          label: "Số sản phẩm",
          field: "numOfItems",
          sort: "asc",
        },
        {
          label: "Tổng tiền",
          field: "amount",
          sort: "asc",
        },
        {
          label: "Trạng thái",
          field: "status",
          sort: "asc",
        },
        {
          label: "Tác vụ",
          field: "actions",
          sort: "asc",
        },
      ],
      rows: [],
    };

    orders.forEach((order) => {
      data.rows.push({
        id: order._id,
        numOfItems: order.orderItems.length,
        amount: `${formatToVNDWithVND(order.totalPrice)}`,
        status: (
          <p
            style={{
              color:
                order.orderStatus === "Delivered"
                  ? "green"
                  : order.orderStatus === "Received"
                  ? "orange"
                  : "red",
            }}
          >
            {statusTranslations[order.orderStatus]}
          </p>
        ),
        actions: (
          <Link to={`/order/${order._id}`} className="btn btn-primary">
            <i className="fa fa-eye"></i>
          </Link>
        ),
      });
    });

    return data;
  };

  return (
    <Fragment>
      <MetaData title={"My Orders"} />
      <div className="user-order-container">
        <h1>My Orders</h1>
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
      </div>
    </Fragment>
  );
};

export default ListOrders;
