import React, { Fragment, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MetaData from "../layout/MetaData";
import Loader from "../layout/Loader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import {
  getShopProducts,
  getReviewsInProduct,
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
  const {products, productsCount } = useSelector((state) => state.shopProducts);

  const { reviews, totalReviews, loading, error } = useSelector((state) => state.reviewsInProduct);
 
  const { isDeleted, error: deleteError } = useSelector((state) => state.review);
  const { categories: allCategories } = useSelector((state) => state.category);
  
  const { shop } = useSelector((state) => state.shop);
  const [approved, setApproved] = useState("");
  const [keyword, setKeyword] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteReviewId, setDeleteReviewId] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const [itemsPerPage] = useState(3);
  const [currentPageReviews, setcurrentPageReviews] = useState(1);
  const resPerPage = 10; // Số lượng kết quả mỗi trang
  useEffect(() => {
    console.log("shop._id", shop._id);
    dispatch(getShopProducts("SHOP_1723385468288_gf585", approved, keyword, currentPage, itemsPerPage));
    if (productId) {
      dispatch(getReviewsInProduct(productId, currentPageReviews, resPerPage));
    }
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
      history("/shop/products");
    }
  }, [dispatch, error, deleteError, isDeleted, history, approved, keyword, currentPageReviews, currentPage, productId]);

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
                console.log("product._id",product._id);
                setProductId(product._id);
                setCurrentProduct(product);
                dispatch(getReviewsInProduct(product._id,"1","10"));
                
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
  console.log("productId",productId);

  const setReviews = () => {
    return (
      <div className="ProductReview_container">
      <h2 className="ProductReview_title">Đánh giá sản phẩm</h2>
      <div className="ProductReview_list">
        {reviews && reviews.length > 0 ? (
          reviews.map((review) => (
            <div key={review._id} className="ProductReview_item">
              <div className="ProductReview_user">
                <div className="ProductReview_userInfo">
                  <span className="ProductReview_username">{review.name}</span>
                  <span className="ProductReview_stars">
                    {Array(5).fill().map((_, index) => (
                      <span key={index}>
                        {index < review.rating ? '★' : '☆'}
                      </span>
                    ))}
                    ({review.rating})
                  </span>
                </div>
                <button
                  className="ProductReview_deleteBtn"
                  onClick={() => deleteReviewHandler(review._id)}
                >
                  Xóa
                </button>
              </div>
              <p className="ProductReview_comment">{review.comment}</p>
            </div>
          ))
        ) : (
          <p>Không có đánh giá</p>
        )}
      </div>
      <div className="ProductReview_pagination">
        <Pagination
          activePage={currentPageReviews}
          itemsCountPerPage={resPerPage}
          totalItemsCount={totalReviews || 0}
          onChange={handleReviewPageChange}
          nextPageText={"Tiếp"}
          prevPageText={"Trước"}
          firstPageText={"Đầu"}
          lastPageText={"Cuối"}
          itemClass="page-item"
          linkClass="page-link"
          pageRangeDisplayed={3}
        />
      </div>
    </div>
    );
  };
  const handleReviewPageChange = (pageNumber) => {
    setCurrentPageReviews(pageNumber);
    dispatch(getReviewsInProduct(productId, pageNumber, resPerPage));
  };
  const deleteReviewHandler = (id) => {
    setDeleteReviewId(id);
    setShowModal(true);
    dispatch(getReviewsInProduct(productId, pageNumber, resPerPage));
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
            {setReviews()}
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