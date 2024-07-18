import React, { useState } from "react";
import BusinessAddress from "./BusinessAddress";

const TaxInfor = ({ taxInfor, setTaxInfor }) => {
  const [show, setShow] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTaxInfor({ ...taxInfor, [name]: value });
  };

  return (
    <>
      {show && (
        <BusinessAddress
          onClose={() => setShow(false)}
          businessAddress={taxInfor.businessAddress}
          setBusinessAddress={(businessAddress) =>
            setTaxInfor({ ...taxInfor, businessAddress })
          }
        />
      )}
      <div className="box-container">
        <div className="shop-infor-form">
          <label>Mã số thuế:</label>
          <input
            type="text"
            name="taxCode"
            value={taxInfor.taxCode}
            onChange={(e) => handleChange(e)}
          />
          <label>Email nhận hóa đơn:</label>
          <input
            type="text"
            name="billingEmail"
            value={taxInfor.billingEmail}
            onChange={(e) => handleChange(e)}
          />
          <label>Địa chỉ đăng ký kinh doanh:</label>
          {taxInfor.businessAddress ? (
            <div className="pickup-address-form">
              <label>{taxInfor.businessAddress.detailed}</label>
              <label>{taxInfor.businessAddress.province}</label>
              <label>{taxInfor.businessAddress.district}</label>
              <label>{taxInfor.businessAddress.ward}</label>
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

export default TaxInfor;
