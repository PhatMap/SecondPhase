import React, { useEffect, useState } from "react";
import PickupAddress from "./PickupAddress";

const ShopInfor = ({ shopInfor, setShopInfor }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setShopInfor({ ...shopInfor, [name]: value });
  };

  const [show, setShow] = useState(false);

  return (
    <>
      {show && (
        <PickupAddress
          onClose={() => setShow(false)}
          pickupAddress={shopInfor.pickupAddress}
          setPickupAddress={(pickupAddress) =>
            setShopInfor({ ...shopInfor, pickupAddress })
          }
        />
      )}
      <div className="box-container">
        <div className="shop-infor-form">
          <label>Tên cửa hàng:</label>
          <input
            type="text"
            value={shopInfor.shopName}
            name="shopName"
            onChange={(e) => handleChange(e)}
          />
          <label>Tên chủ cửa hàng:</label>
          <input
            type="text"
            value={shopInfor.ownerName}
            name="ownerName"
            onChange={(e) => handleChange(e)}
          />
          <label>Số điện thoại:</label>
          <input
            type="text"
            value={shopInfor.primaryPhone}
            name="primaryPhone"
            onChange={(e) => handleChange(e)}
          />
          <label>Email:</label>
          <input
            type="text"
            value={shopInfor.email}
            name="email"
            onChange={(e) => handleChange(e)}
          />
          <label>Địa chỉ lấy hàng: </label>
          {shopInfor.pickupAddress.contactName !== "" ? (
            <div className="pickup-address-form">
              <label>
                {shopInfor.pickupAddress.contactName} {" | "}
                {shopInfor.pickupAddress.contactPhone}
              </label>
              <label>{shopInfor.pickupAddress.address.detailed}</label>
              <label>{shopInfor.pickupAddress.address.province}</label>
              <label>{shopInfor.pickupAddress.address.district}</label>
              <label>{shopInfor.pickupAddress.address.ward}</label>
              <button onClick={() => setShow(true)}>Chỉnh sửa</button>
            </div>
          ) : (
            <i
              className="fa fa-plus"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "5px",
                cursor: "pointer",
              }}
              onClick={() => setShow(true)}
            >
              Thêm địa chỉ
            </i>
          )}
        </div>
      </div>
    </>
  );
};

export default ShopInfor;
