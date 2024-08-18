import React, { Fragment, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MetaData from "../layout/MetaData";
import Loader from "../layout/Loader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import {
  getShopProducts,
  getProductReviews,
  deleteReview,
  clearErrors,
} from "../../actions/productActions";
import { DELETE_REVIEW_RESET } from "../../constants/productConstants";
import { formatToVNDWithVND } from "../../utils/formatHelper";
import Pagination from "react-js-pagination";

const ProductReviews = () => {
  const [productId, setProductId] = useState("");
  const history = useNavigate();
  const [currentProduct, setCurrentProduct] = useState(null);
  const dispatch = useDispatch();
  const { loading, products, productsCount } = useSelector((state) => state.shopProducts);
  const { error, reviews } = useSelector((state) => state.productReviews);
  const { isDeleted, error: deleteError } = useSelector((state) => state.review);
  const { categories: allCategories } = useSelector((state) => state.category);
  const { shop } = useSelector((state) => state.auth);

  const [approved, setApproved] = useState("");
  const [keyword, setKeyword] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteReviewId, setDeleteReviewId] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const [itemsPerPage] = useState(3);

  useEffect(() => {
    dispatch(getShopProducts(shop._id, approved, keyword, currentPage, itemsPerPage));
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
      history("/shop/products");
    }
  }, [dispatch, error, deleteError, isDeleted, history, approved, keyword, currentPage]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1);
    dispatch(getShopProducts(shop._id, approved, keyword, 1, itemsPerPage));
  };

  const handleApprovedChange = (e) => {
    setApproved(e.target.value);
    setCurrentPage(1);
    dispatch(getShopProducts(shop._id, e.target.value, keyword, 1, itemsPerPage));
  };

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
          label: "Đánh Giá",
          field: "ratings",
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

    if (products && products.length > 0) {
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
          ratings: product.ratings,
          actions: (
            <button
              className="btn btn-primary py-1 px-2"
              onClick={() => {
                setProductId(product._id);
                setCurrentProduct(product);
                dispatch(getProductReviews(product._id));
              }}
            >
              Xem Đánh Giá
            </button>
          ),
        });
      });
    }

    return data;
  };

  const setReviews = () => {
    const data = {
      columns: [
        {
          label: "Tên Sản Phẩm",
          field: "name",
          sort: "asc",
        },
        {
          label: "Đánh Giá",
          field: "rating",
          sort: "asc",
        },
        {
          label: "Bình Luận",
          field: "comment",
          sort: "asc",
        },
        {
          label: "Khách Hàng",
          field: "user",
          sort: "asc",
        },
        {
          label: "Tác vụ",
          field: "actions",
        },
      ],
      rows: [],
    };

    reviews.forEach((review) => {
      data.rows.push({
        name: currentProduct ? currentProduct.name : "Unknown Product",
        rating: review.rating,
        comment: review.comment,
        user: review.name,
        actions: (
          <button
            className="btn btn-danger py-1 px-2 ml-2"
            onClick={() => deleteReviewHandler(review._id)}
          >
            <i className="fa fa-trash"></i>
          </button>
        ),
      });
    });

    return data;
  };

  const deleteReviewHandler = (id) => {
    setDeleteReviewId(id);
    setShowModal(true);
  };

  const handleDeleteConfirmed = () => {
    dispatch(deleteReview(deleteReviewId, productId));
    setShowModal(false);
  };

  return (
    <Fragment>
      <MetaData title={"Product Reviews"} />
      <ToastContainer />
      <div className="sidebar-content-container">
        <div className="manage-product-container">
          <h1 className="my-4" style={{ fontSize: "40px", fontWeight: "bold", textAlign: "center" }}>
            Quản Lý Đánh Giá
          </h1>
          <div>
            <input
              type="text"
              placeholder="Tìm kiếm sản phẩm..."
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ccc", marginRight: "10px" }}
            />
            <select
              value={approved}
              onChange={handleApprovedChange}
              style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
            >
              <option value="">Tất cả vai trò</option>
              <option value="waiting">Chưa Gửi</option>
              <option value="pending">Đang Xử Lý</option>
              <option value="approved">Đã Duyệt</option>
              <option value="rejected">Chưa Duyệt</option>
            </select>
          </div>
          {loading ? (
            <Loader />
          ) : (
            <Fragment>
              <div className="table-responsive">
                <table className="table table-bordered table-striped">
                  <thead>
                    <tr>
                      {setProducts().columns.map((column, index) => (
                        <th key={index}>{column.label}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {setProducts().rows.map((row, index) => (
                      <tr key={index}>
                        {Object.values(row).map((value, idx) => (
                          <td key={idx}>{value}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="d-flex justify-content-center mt-5" style={{ marginBottom: "2rem" }}>
                <Pagination
                  activePage={currentPage}
                  itemsCountPerPage={itemsPerPage}
                  totalItemsCount={productsCount}
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

          {reviews && reviews.length > 0 ? (
            <div className="mt-5">
              <h2>Đánh giá sản phẩm</h2>
              <table className="table table-bordered table-striped">
                <thead>
                  <tr>
                    {setReviews().columns.map((column, index) => (
                      <th key={index}>{column.label}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {setReviews().rows.map((row, index) => (
                    <tr key={index}>
                      {Object.values(row).map((value, idx) => (
                        <td key={idx}>{value}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="mt-5 text-center" style={{ fontSize: "24px" }}>
              Không có đánh giá
            </p>
          )}
        </div>
      </div>
      {showModal && (
        <div className="delete-notify-container">
          <div className="delete-notify-form">
            <h1>Xóa bình luận này?</h1>
            <div className="delete-notify-btn-container">
              <button
                className="delete-notify-btn-container-yes"
                onClick={() => handleDeleteConfirmed(deleteReviewId)}
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

export default ProductReviews;