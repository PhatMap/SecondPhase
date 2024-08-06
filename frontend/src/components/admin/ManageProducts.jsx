import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DataTable from "../layout/DataTable";
import Pagination from "react-js-pagination";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getAdminProducts } from "../../actions/productActions";
import { getCategoryAll } from "../../actions/categoryActions";
import { formatToVNDWithVND } from "../../utils/formatHelper";
import { Link } from "react-router-dom";
import ProductDetails from "./ProductDetails";
import {
  UPDATE_PRODUCT_RESET,
  CLEAR_ERRORS,
} from "../../constants/productConstants";

const ManageProducts = () => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [resPerPage, setResPerPage] = useState(5);
  const [keyword, setKeyword] = useState("");
  const [approved, setApproved] = useState("pending");
  const [show, setShow] = useState(false);
  const [detail, setDetail] = useState({});
  const [decide, setDecide] = useState("");

  const { products, total } = useSelector((state) => state.products);
  const { categories: allCategories } = useSelector((state) => state.category);
  const { error, isUpdated } = useSelector((state) => state.product);

  const setCurrentPageNo = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSegmentedTab = (choose) => {
    if (choose !== approved) {
      setCurrentPage(1);
      if (choose === "approved") {
        setApproved("approved");
      }
      if (choose === "notApproved") {
        setApproved("notApproved");
      }
      if (choose === "pending") {
        setApproved("pending");
      }
    }
  };

  const handleResPerPage = (amount) => {
    if (amount !== resPerPage) {
      setResPerPage(amount);
      setCurrentPage(1);
    }
  };

  const handleSearch = (e) => {
    const keyword = e.target.value;
    setKeyword(keyword);
    setCurrentPage(1);
  };

  const loadData = () => {
    dispatch(getAdminProducts(approved, keyword, currentPage, resPerPage));
    dispatch(getCategoryAll());
  };

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    if (keyword || approved || currentPage || resPerPage) {
      loadData();
    }
  }, [dispatch, keyword, approved, currentPage, resPerPage]);

  useEffect(() => {
    if (products.length === 0 && currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  }, [currentPage]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: CLEAR_ERRORS });
    }

    if (isUpdated) {
      decide === "approved"
        ? toast.success("Đã duyệt sản phẩm")
        : toast.warn("Đã từ chối sản phẩm");
      dispatch({ type: UPDATE_PRODUCT_RESET });
    }
    loadData();
  }, [error, isUpdated]);

  const setProducts = () => {
    const data = {
      columns: [
        {
          label: "Danh Mục",
          field: "category",
        },
        {
          label: "Ảnh Sản Phẩm",
          field: "image",
        },
        {
          label: "Tên Sản Phẩm",
          field: "name",
        },
        {
          label: "Giá",
          field: "price",
        },
        {
          label: "Tổng Số Lượng",
          field: "totalStock",
        },
        {
          label: "Duyệt",
          field: "approved",
        },
        {
          label: "Trạng Thái",
          field: "status",
        },
        {
          label: "Tác Vụ",
          field: "actions",
        },
      ],
      rows: [],
    };

    const categoryMap = allCategories.reduce((acc, category) => {
      acc[category._id] = category.vietnameseName;
      return acc;
    }, {});

    if (products.length > 0) {
      products.forEach((product) => {
        data.rows.push({
          category: categoryMap[product.category] || "Trống",
          image: (
            <img
              src={product.images[0].url}
              alt={product.name}
              style={{ width: "50px", height: "50px" }}
            />
          ),
          name: product.name,
          price: `${formatToVNDWithVND(product.price)}`,
          totalStock: product.totalStock,
          approved:
            product.approved === "approved"
              ? "Đã Duyệt"
              : product.approved === "notApproved"
              ? "Chưa Duyệt"
              : "Đang Chờ",
          status: product.status === "active" ? "Hoạt Động" : "Bị Ngưng",
          actions: (
            <button
              className="btn btn-info py-1 px-2 ml-2"
              onClick={() => {
                setShow(true);
                setDetail(product);
              }}
            >
              <i className="fa fa-eye"></i>
            </button>
          ),
        });
      });
    } else {
      data.rows.push({
        category: "Trống",
        image: "Trống",
        name: "Trống",
        price: "Trống",
        totalStock: "Trống",
        approved: "Trống",
        status: "Trống",
        actions: "Trống",
      });
    }

    return data;
  };

  return (
    <Fragment>
      <ToastContainer position="top-center" />
      {show && (
        <ProductDetails
          data={detail}
          onClose={() => setShow(false)}
          setDecide={setDecide}
        />
      )}
      <div className="manage-application-container">
        <div>
          <h1 className="display-4 text-center">Quản Lý Sản Phẩm</h1>
          <p className="lead text-center">Manage Products</p>
          <hr />
        </div>
        <div className="tabs">
          <label
            htmlFor="pending"
            className={approved === "pending" ? "marked" : ""}
          >
            <input
              type="radio"
              id="pending"
              name="status"
              value="pending"
              onChange={() => handleSegmentedTab("pending")}
              checked={approved === "pending"}
            />
            Chờ Duyệt
          </label>
          <label
            htmlFor="approved"
            className={approved === "approved" ? "marked" : ""}
          >
            <input
              type="radio"
              id="approved"
              name="status"
              value="approved"
              onChange={() => handleSegmentedTab("approved")}
              checked={approved === "approved"}
            />
            Đã Duyệt
          </label>
          <label
            htmlFor="notApproved"
            className={approved === "notApproved" ? "marked" : ""}
          >
            <input
              type="radio"
              id="notApproved"
              name="status"
              value="notApproved"
              onChange={() => handleSegmentedTab("notApproved")}
              checked={approved === "notApproved"}
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
        <DataTable data={setProducts()} />
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

export default ManageProducts;
