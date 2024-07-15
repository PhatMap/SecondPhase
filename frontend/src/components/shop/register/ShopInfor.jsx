import React, { useState } from "react";

const ShopInfor = ({ shopInfor, setShopInfor }) => {
  // {
  //       fullName: "",
  //       phoneNumber: "",
  //       address: {
  //         province: "",
  //         town: "",
  //         district: "",
  //         ward: "",
  //         detailed: "",
  //       },
  //     }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setShopInfor({ ...shopInfor, [name]: value });
  };

  return (
    <div className="box-container">
      <div className="shop-infor-form">
        <label>Tên cửa hàng:</label>
        <input
          type="text"
          value={shopInfor.shopName}
          name="shopName"
          onChange={(e) => handleChange(e)}
        />
        <label>Số điện thoại:</label>
        <input
          type="text"
          value={shopInfor.phoneNumber}
          name="phoneNumber"
          onChange={(e) => handleChange(e)}
        />
        <label>Email:</label>
        <input
          type="text"
          value={shopInfor.email}
          name="email"
          onChange={(e) => handleChange(e)}
        />
        <label>Địa chỉ lấy hàng:</label>
        <input
          type="text"
          value={shopInfor.pickupAddress}
          name="pickupAddress"
          onChange={(e) => handleChange(e)}
        />
      </div>
    </div>
  );
};

export default ShopInfor;
