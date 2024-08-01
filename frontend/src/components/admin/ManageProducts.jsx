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

const ManageProducts = () => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [resPerPage, setResPerPage] = useState(5);
  const [keyword, setKeyword] = useState("");
  const [approved, setApproved] = useState("pending");
  const [show, setShow] = useState(false);

  const { products, total } = useSelector((state) => state.products);
  const { categories: allCategories } = useSelector((state) => state.category);

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
      if (choose === "notApproved") {
        setStatus("notApproved");
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

  const handleSearch = (e) => {
    const keyword = e.target.value;
    setKeyword(keyword);
    setCurrentPage(1);
  };

  useEffect(() => {
    dispatch(getAdminProducts(approved, keyword, currentPage, resPerPage));
    dispatch(getCategoryAll());
  }, []);

  useEffect(() => {
    dispatch(getAdminProducts(approved, keyword, currentPage, resPerPage));
  }, [dispatch, keyword, approved, currentPage, resPerPage]);

  const setApplications = () => {
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
          <div style={{ display: "flex" }}>
            <Link
              to={`/shop/product/${product._id}`}
              className="btn btn-primary py-1 px-2"
            >
              <i className="fa fa-pencil"></i>
            </Link>
            <button
              className="btn btn-danger py-1 px-2 ml-2"
              onClick={() => {
                setShow(true);
                setId(product._id);
              }}
            >
              <i className="fa fa-trash"></i>
            </button>
          </div>
        ),
      });
    });

    return data;
  };

  return (
    <Fragment>
      <ToastContainer />
      {show && <Application data={detail} onClose={() => setShow(false)} />}
      <div className="manage-application-container">
        <div>
          <h1 className="display-4 text-center">Quản Lý Sản Phẩm</h1>
          <p className="lead text-center">Manage Products</p>
          <hr />
        </div>
        <div className="tabs">
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
            htmlFor="notApproved"
            className={status === "notApproved" ? "marked" : ""}
          >
            <input
              type="radio"
              id="notApproved"
              name="status"
              value="notApproved"
              onChange={() => handleSegmentedTab("notApproved")}
              checked={status === "notApproved"}
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

export default ManageProducts;
