import React from "react";

const OrderProgressBar = ({ currentStatus }) => {
  // Object mapping English steps to Vietnamese
  const stepTranslations = {
    "Processing": "Xử Lý",
    "Order Confirmed": "Xác Nhận",
    "Shipping": "Giao Hàng",
    "Received": "Đã Nhận",
    "Delivered": "Hoàn Thành",
    
    // Thêm các trạng thái khác nếu cần
  };

  // Define the English steps array
  let steps = Object.keys(stepTranslations);

  // Thêm trạng thái "Received" vào mảng steps nếu chưa tồn tại
  if (!steps.includes("Received")) {
    steps.push("Received");
  }

  // Get the current step index
  const currentStepIndex = steps.indexOf(currentStatus);

  return (
    <div className="order-progress-container">
      <div className="progress-track"></div>
      {steps.map((step, index) => (
        <div
          key={step}
          className={`progress-step ${
            index <= currentStepIndex ? "active" : ""
          }`}
        >
          {index <= currentStepIndex ? (
            <span className="checkmark">&#10003;</span>
          ) : (
            <span className="step-number">{index + 1}</span>
          )}
          <div className="step-label">{stepTranslations[step]}</div>
        </div>
      ))}
    </div>
  );
};

export default OrderProgressBar;
