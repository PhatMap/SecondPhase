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
      <div className="progress-bar-stick" />
      <div className="progress-bar-low">
        <div className="progress-bar-point-label-container">
          <div className="progress-bar-point" />
          <label>Thông tin cửa hàng</label>
        </div>
        <div className="progress-bar-point-label-container">
          <div className="progress-bar-point" />
          <label>Cài đặt vận chuyển</label>
        </div>
        <div className="progress-bar-point-label-container">
          <div className="progress-bar-point" />
          <label>Thông tin thuế</label>
        </div>
        <div className="progress-bar-point-label-container">
          <div className="progress-bar-point" />
          <label>Thông tin định danh</label>
        </div>
        <div className="progress-bar-point-label-container">
          <div className="progress-bar-point" />
          <label>Hoàn Thành</label>
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
