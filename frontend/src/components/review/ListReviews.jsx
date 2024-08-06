import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Pagination from "react-js-pagination";
import { getReviewsInProduct } from "../../actions/productActions";
import Loader from "../layout/Loader";

const ListReviews = ({ productId }) => {
  const dispatch = useDispatch();
  const { reviews, totalReviews, loading, error } = useSelector((state) => state.reviewsInProduct);
  const [currentPage, setCurrentPage] = useState(1);
  const resPerPage = 10; // Số lượng kết quả mỗi trang

  useEffect(() => {
    if (productId) {
      dispatch(getReviewsInProduct(productId, currentPage, resPerPage));
    }
  }, [dispatch, productId, currentPage, resPerPage]);
  console.log("totalReviews",totalReviews);
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : error ? (
        <p className="redColor">{error}</p>
      ) : (
        <Fragment>
          <div className="reviews">
            {reviews && reviews.length > 0 ? (
              reviews.map((review) => (
                <div key={review._id} className="review-card">
                  <p className="review-user">{review.name}</p>
                  <div className="rating-outer">
                    <div className="rating-inner" style={{ width: `${(review.rating / 5) * 100}%` }}></div>
                  </div>
                  <p className="review-comment">{review.comment}</p>
                </div>
              ))
            ) : (
              <p>No Reviews</p>
            )}
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
              itemsCountPerPage={resPerPage}
              totalItemsCount={totalReviews}
              onChange={handlePageChange}
              nextPageText={"Tiếp"}
              prevPageText={"Trước"}
              firstPageText={"Đầu"}
              lastPageText={"Cuối"}
              itemClass="page-item"
              linkClass="page-link"
              pageRangeDisplayed={3} // Hiển thị số trang
            />
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default ListReviews;
