import React from "react";

const ListReviews = ({ reviews }) => {
  return (
    <div className="reviews">
      <h3>Reviews:</h3>
      {reviews &&
        reviews.map((review) => (
          <div
            key={review._id}
            style={{ display: "flex", flexDirection: "column", gap:"5px" }}
          >
            <hr />
            <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
              <div className="rating-outer">
                <div
                  className="rating-inner"
                  style={{ width: `${(review.rating / 5) * 100}%` }}
                ></div>
              </div>
              <p className="review_user">by {review.name}</p>
            </div>
            <div>
              <p className="review_comment">{review.comment}</p>
              <hr />
            </div>
          </div>
        ))}
    </div>
  );
};

export default ListReviews;
