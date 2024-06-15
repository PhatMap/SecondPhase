import React, { useState } from "react";

const Review = () => {
  const [review, setReview] = useState("");

  return (
    <div className="review-container">
      <textarea style={{ width: "400px" }}></textarea>
      <button>Hủy</button>
      <button>Bình luận</button>
      <div>Pha Bình luận</div>
    </div>
  );
};

export default Review;
