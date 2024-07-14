import React from "react";

const ProgressBar = ({ step }) => {
  const stepsList = {
    shopInfor: "Thông tin cửa hàng",
    shippingMethod: "Cài đặt vận chuyển",
    taxInfor: "Thông tin thuế",
    identificationInfor: "Thông tin định danh",
    finish: "Hoàn Thành",
  };

  let steps = Object.keys(stepsList);

  const currentStep = steps.indexOf(step);

  return (
    <div className="progress-bar-container">
      <div className="progress-bar-stick">
        {steps.slice(1).map((_, index) => (
          <div
            key={index}
            className={`progress-bar-stick-section ${
              index < currentStep ? "completed" : ""
            }`}
          />
        ))}
      </div>
      <div className="progress-bar-low">
        {steps.map((stepKey, index) => (
          <div key={stepKey} className="progress-bar-point-label-container">
            <div
              className={`progress-bar-point ${
                index <= currentStep ? "completed" : ""
              }`}
            />
            <label>{stepsList[stepKey]}</label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgressBar;
