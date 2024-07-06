import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { newReview, clearErrors } from "../../actions/productActions";
import { NEW_REVIEW_RESET } from "../../constants/productConstants";

const Review = ({ productId, user, hasPurchased }) => {
  const dispatch = useDispatch();
  const { error: reviewError, success } = useSelector((state) => state.newReview);

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  useEffect(() => {
    if (reviewError) {
      toast.error(reviewError);
      dispatch(clearErrors());
    }

    if (success) {
      toast.success("Đánh Giá Thành Công");
      dispatch({ type: NEW_REVIEW_RESET });
    }
  }, [dispatch, reviewError, success]);

  const setUserRatings = () => {
    const stars = document.querySelectorAll(".star");

    stars.forEach((star, index) => {
      star.starValue = index + 1;

      ["click", "mouseover", "mouseout"].forEach(function (e) {
        star.addEventListener(e, showRatings);
      });
    });

    function showRatings(e) {
      stars.forEach((star, index) => {
        if (e.type === "click") {
          if (index < this.starValue) {
            star.classList.add("orange");

            setRating(this.starValue);
          } else {
            star.classList.remove("orange");
          }
        }

        if (e.type === "mouseover") {
          if (index < this.starValue) {
            star.classList.add("yellow");
          } else {
            star.classList.remove("yellow");
          }
        }

        if (e.type === "mouseout") {
          star.classList.remove("yellow");
        }
      });
    }
  };

  const reviewHandler = () => {
    const formData = new FormData();

    formData.set("rating", rating);
    formData.set("comment", comment);
    formData.set("productId", productId);

    dispatch(newReview(formData));
  };

  return (
    <div className="row mt-2 mb-5">
      <div className="rating w-50">
        {user ? (
          hasPurchased ? (
            <button
              id="review_btn"
              type="button"
              className="btn btn-primary mt-4"
              data-toggle="modal"
              data-target="#ratingModal"
              onClick={setUserRatings}
              style={{ marginTop: '1rem' }}
            >
              Đánh Giá Sản Phẩm
            </button>
          ) : (
            <div
              className="alert alert-danger mt-4"
              type="alert"
              style={{ marginTop: '1rem' }}
            >
              Vui lòng mua sản phẩm để đánh giá sản phẩm.
            </div>
          )
        ) : (
          <div
            className="alert alert-danger mt-4"
            type="alert"
            style={{ marginBottom: '1rem' }}
          >
            Đăng nhập để gửi đánh giá của bạn.
          </div>
        )}
        <div
          className="modal fade"
          id="ratingModal"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="ratingModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="ratingModalLabel">
                  Submit Review
                </h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <ul
                  className="stars"
                  style={{ padding: 0, display: 'flex', gap: '0.5rem', listStyle: 'none', marginBottom: '1rem' }}
                >
                  <li className="star" style={{ cursor: 'pointer' }}>
                    <i className="fa fa-star"></i>
                  </li>
                  <li className="star" style={{ cursor: 'pointer' }}>
                    <i className="fa fa-star"></i>
                  </li>
                  <li className="star" style={{ cursor: 'pointer' }}>
                    <i className="fa fa-star"></i>
                  </li>
                  <li className="star" style={{ cursor: 'pointer' }}>
                    <i className="fa fa-star"></i>
                  </li>
                  <li className="star" style={{ cursor: 'pointer' }}>
                    <i className="fa fa-star"></i>
                  </li>
                </ul>
  
                <textarea
                  name="review"
                  id="review"
                  className="form-control mt-3"
                  style={{ marginBottom: '1rem' }}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                ></textarea>
  
                <button
                  className="btn my-3 float-right review-btn px-4 text-white"
                  onClick={reviewHandler}
                  data-dismiss="modal"
                  aria-label="Close"
                  style={{ marginBottom: '1rem' }}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  
  
};

export default Review;
