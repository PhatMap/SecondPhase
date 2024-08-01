import React, { Fragment, useState, useEffect } from "react";
import { MDBDataTable } from "mdbreact";
import { useNavigate } from "react-router-dom";
import MetaData from "../layout/MetaData";
import Sidebar from "./Sidebar";
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

const ProductReviews = () => {
  const [productId, setProductId] = useState("");
  const history = useNavigate();
  const [currentProduct, setCurrentProduct] = useState(null);
  const dispatch = useDispatch();
  const { loading, products } = useSelector((state) => state.products);
  const { error, reviews } = useSelector((state) => state.productReviews);
  const { isDeleted, error: deleteError } = useSelector(
    (state) => state.review
  );
  const [deleteReviewId, setDeleteReviewId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  useEffect(() => {
    dispatch(getShopProducts());

    if (error) {
      toast.error(error);
      dispatch(clearErrors());

      history("/shop/products");
    }
  }, [dispatch, error, deleteError, isDeleted, history]);

  const setProducts = () => {
    const data = {
      columns: [
        {
          label: "Tên Sản Phẩm",
          field: "name",
          sort: "asc",
        },
        {
          label: "Ảnh",
          field: "image",
          sort: "asc",
        },
        {
          label: "Đánh Giá",
          field: "ratings",
          sort: "asc",
        },
        { label: "Tác vụ", field: "actions", sort: "asc" },
      ],
      rows: [],
    };

    products.forEach((product) => {
      data.rows.push({
        name: product.name,
        image: (
          <img
            src={product.images[0].url}
            alt={product.name}
            style={{ width: "50px", height: "50px" }}
          />
        ),
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

    return data;
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (deleteError) {
      toast.error(deleteError);
      dispatch(clearErrors());
    }

    if (productId !== "") {
      dispatch(getProductReviews(productId));
    }

    if (isDeleted) {
      toast.success("Xóa đánh Giá Thành Công");
      dispatch({ type: DELETE_REVIEW_RESET });
    }
  }, [dispatch, error, productId, isDeleted, deleteError]);

  const deleteReviewHandler = (id) => {
    setDeleteReviewId(id);
    setShowModal(true);
  };
  const handleDeleteConfirmed = () => {
    dispatch(deleteReview(deleteReviewId, productId));
    setShowModal(false);
  };

  const submitHandler = (e) => {
    e.preventDefault();
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

  useEffect(() => {
    if (reviews) {
      window.scrollTo(0, document.body.scrollHeight);
    }
  }, [reviews]);

  return (
    <Fragment>
      <MetaData title={"Product Reviews"} />
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
              Quản Lý Đánh Giá
            </h1>

            {loading ? (
              <Loader />
            ) : (
              <MDBDataTable
                data={setProducts()}
                className="px-3"
                bordered
                striped
                hover
                noBottomColumns
              />
            )}

            {reviews && reviews.length > 0 ? (
              <MDBDataTable
                data={setReviews()}
                className="px-3"
                bordered
                striped
                hover
                noBottomColumns
              />
            ) : (
              <p className="mt-5 text-center" style={{ fontSize: "24px" }}>
                Không có đánh giá
              </p>
            )}
          </Fragment>
        </div>
      </div>
      {showModal && (
        <div className="delete-notify-container">
          <div className="delete-notify-form">
            <h1> Xóa bình luận này?</h1>
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
