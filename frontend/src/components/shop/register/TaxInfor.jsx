import React from "react";

const TaxInfor = ({ taxInfor, setTaxInfor }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setTaxInfor({ ...taxInfor, [name]: value });
  };

  return (
    <div className="box-container">
      <div className="shop-infor-form">
        <label>Mã số thuế:</label>
        <input type="text" name="taxCode" onChange={(e) => handleChange(e)} />
        <label>Email nhận hóa đơn:</label>
        <input
          type="text"
          name="billingEmail"
          onChange={(e) => handleChange(e)}
        />
        <label>Địa chỉ đăng ký kinh doanh:</label>
        <input
          type="text"
          name="businessAddress"
          onChange={(e) => handleChange(e)}
        />
      </div>
    </div>
  );
};

export default TaxInfor;
