import React, { Fragment, useEffect } from "react";

const OrderProgressBar = ({ currentStatus }) => {
  const steps = [
    "Processing",
    "Order Confirmed",
    "Out For Delivery",
    "Delivered",
  ];
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
          <div className="step-label">{step}</div>
        </div>
      ))}
    </div>
  );
};

export default OrderProgressBar;
