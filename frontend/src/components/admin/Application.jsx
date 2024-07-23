import React, { Fragment, useEffect } from "react";

const Application = ({ data, onClose }) => {
  const handleOverlayClick = (event) => {
    if (event.target.className === "application-overlay") {
      onClose();
    }
  };

  return (
    <Fragment>
      <div className="application-overlay" onClick={handleOverlayClick}>
        <div className="application-form">
          <div>
            <h1>Thông Tin Cửa Hàng</h1>
            <p>
              <strong>Tên Cửa Hàng:</strong> {data.shopInfor.shopName}
            </p>
            <p>
              <strong>Tên Chủ Cửa Hàng:</strong> {data.shopInfor.ownerName}
            </p>
            <p>
              <strong>Email:</strong> {data.shopInfor.email}
            </p>
            <p>
              <strong>Số Liên Hệ:</strong> {data.shopInfor.primaryPhone}
            </p>
            <p>
              <strong>Tên Người Nhận:</strong>
              {data.shopInfor.pickupAddress.contactName}
            </p>
            <p>
              <strong>Số Liên Hệ:</strong>
              {data.shopInfor.pickupAddress.contactPhone}
            </p>
            <p>
              <strong>Tỉnh/Thành Phố:</strong>
              {data.shopInfor.pickupAddress.address.province}
            </p>
            <p>
              <strong>Quận/Huyện</strong>
              {data.shopInfor.pickupAddress.address.district}
            </p>
            <p>
              <strong>Phường/Xã:</strong>
              {data.shopInfor.pickupAddress.address.ward}
            </p>
            <p>
              <strong>Số, Đường...:</strong>
              {data.shopInfor.pickupAddress.address.detail}
            </p>
          </div>
          <hr />
          <div>
            <h1>Phương Thức Giao Hàng</h1>
            <>
              {data.shippingMethod.map(
                (method, index) =>
                  method.active && <p key={index}>{method.name}</p>
              )}
            </>
          </div>
          <hr />
          <div>
            <h1>Thông Tin Thuế</h1>
            <p>
              <strong>Mã Số Thuế:</strong>
              {data.taxInfor.taxCode}
            </p>
            <p>
              <strong>Email nhận hóa đơn:</strong>
              {data.taxInfor.taxCode}
            </p>
            <p>
              <strong>Địa Chỉ Kinh Doanh:</strong>
              {data.taxInfor.businessAddress.province}
              {data.taxInfor.businessAddress.district}
              {data.taxInfor.businessAddress.ward}
              {data.taxInfor.businessAddress.detail}
            </p>
          </div>
          <hr />
          <div>
            <h1>Thông Tin Định Danh</h1>
            <p>
              <strong>Số CCCD:</strong>
              {data.identificationInfor.citizenId}
            </p>
            <p>
              <strong>Ảnh thẻ:</strong>
              <img src={data.identificationInfor.idCardImage.url}></img>
            </p>
            <p>
              <strong>Ảnh chụp bản thân cầm thẻ:</strong>
              <img src={data.identificationInfor.selfieWithId.url}></img>
            </p>
          </div>
          <hr />
          <div>
            <p>
              <strong>Created At:</strong> {data.createdAt}
            </p>
            <p>
              <strong>Status:</strong> {data.status}
            </p>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Application;
