import React from "react";

const Finish = ({ formData }) => {
  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setShopInfor({ ...shopInfor, [name]: value });
  // };

  return (
    <div className="box-container">
      <div className="shop-infor-form">
        <label>Tên cửa hàng:</label>
        <input type="text" />
        <label>Số điện thoại:</label>
        <input type="text" />
        <label>Email:</label>
        <input type="text" />
        <label>Địa chỉ lấy hàng:</label>
        <input type="text" />
      </div>
    </div>
  );
};

export default Finish;
