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
  const [showStars, setShowStars] = useState(false);
  const [selectedStars, setSelectedStars] = useState(0);

  useEffect(() => {
    if (reviewError) {
      toast.error(reviewError);
      dispatch(clearErrors());
    }

    if (success) {
      toast.success("Đánh Giá Thành Công");
      dispatch({ type: NEW_REVIEW_RESET });
      setRating(0);
      setComment("");
      setShowStars(false);
      setSelectedStars(0);
    }
  }, [dispatch, reviewError, success]);

  const handleStarHover = (starValue) => {
    if (!showStars) {
      setShowStars(true);
    }
    setSelectedStars(starValue);
  };

  const handleStarClick = (starValue) => {
    setRating(starValue);
  };

  const reviewHandler = () => {
    const formData = new FormData();

    formData.set("rating", rating);
    formData.set("comment", comment);
    formData.set("productId", productId);

    dispatch(newReview(formData));
  };

  const handleCommentChange = (e) => {
    setComment(e.target.value);
    setShowStars(e.target.value.length > 0);
  };

  return (
    <div className="row mt-2 mb-5">
      <div className="rating w-50">
        {user ? (
          hasPurchased ? (
            <div style={{ marginTop: '1rem' }}>
              <p>{user.name}</p> {/* Display the current user's name */}
              <textarea
                name="review"
                id="review"
                className="form-control mt-3"
                style={{
                  border: 'none',
                  borderBottom: '1px solid #000',
                  borderRadius: '0',
                  height: '30px',
                  padding: '0',
                  outline: 'none',
                  width: '100%',
                  marginBottom: '5px'
                }}
                value={comment}
                onChange={handleCommentChange}
              ></textarea>
              <div className="d-flex align-items-center" style={{ marginTop: '5px' }}>
                <ul
                  className="stars"
                  style={{ padding: 0, display: showStars ? 'flex' : 'none', gap: '0.5rem', listStyle: 'none' }}
                >
                  {[1, 2, 3, 4, 5].map((star) => (
                    <li
                      key={star}
                      className={`star ${star <= selectedStars ? 'orange' : ''}`}
                      style={{ cursor: 'pointer', fontSize: '24px' }}
                      onMouseOver={() => handleStarHover(star)}
                      onClick={() => handleStarClick(star)}
                    >
                      <i className="fa fa-star"></i>
                    </li>
                  ))}
                </ul>
                {comment && (
                  <button
                    className="btn review-btn text-white"
                    onClick={reviewHandler}
                    style={{ marginLeft: 'auto', padding: '5px 10px' }}
                  >
                    Submit
                  </button>
                )}
              </div>
            </div>
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
      </div>
    </div>
  );
};

export default Review;
