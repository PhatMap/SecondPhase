import React, { Fragment, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { countries } from "countries-list";

import MetaData from "../layout/MetaData";
import CheckoutSteps from "./CheckoutSteps";

import { useDispatch, useSelector } from "react-redux";
import { saveShippingInfo } from "../../actions/cartActions";
import Address from "../user/Address";

const Shipping = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { shippingInfo } = useSelector((state) => state.cart);

  const [province, setProvince] = useState("");
  const [district, setDistrict] = useState("");
  const [town, setTown] = useState("");
  const [location, setLocation] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [showPhoneInput, setShowPhoneInput] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [formError, setFormError] = useState("");

  useEffect(() => {
    localStorage.removeItem("shippingInfo");
  }, []);

  const isValidPhoneNumber = (phoneNo) => {
    const phoneRegex = /^[0-9]{10}$/;
    return phoneRegex.test(phoneNo);
  };

  const handleAddressChange = (field, value) => {
    switch (field) {
      case "province":
        setProvince(value);
        break;
      case "district":
        setDistrict(value);
        break;
      case "town":
        setTown(value);
        break;
      case "location":
        setLocation(value);
        break;
      default:
        break;
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    setErrorMessage("");
    setFormError("");
    if (!province || !district || !town || !location) {
      setFormError("Vui lòng chọn địa chỉ");
      return;
    } else {
      setFormError("");
    }
    if (!isValidPhoneNumber(phoneNo)) {
      setPhoneError("Số Điện Thoại Không Đúng Định Dạng");
      return;
    } else {
      setPhoneError("");
    }
    dispatch(
      saveShippingInfo({ province, district, town, location, phone: phoneNo })
    );
    navigate("/confirm");
  };
  return (
    <Fragment>
      <MetaData title={"Shipping Info"} />

      <CheckoutSteps shipping />

      <div className="shipping-wrapper">
        <form className="shipping-form-container" onSubmit={submitHandler}>
          <h1 className="shipping-heading">Địa Chỉ Giao Hàng </h1>

          <Fragment>
            <button
              className="shipping-btn"
              style={{ marginTop: "1rem", marginBottom: "1rem" }}
              onClick={() => navigate("/shipping/address")}
            >
              Địa Chỉ Đã Lưu
            </button>
          </Fragment>
          {showAddressForm && (
            <div className="register-form-group">
              <Address handleAddressChange={handleAddressChange} />
              {formError && (
                <p
                  className="error"
                  style={{ color: "red", fontSize: "0.8em" }}
                >
                  {formError}
                </p>
              )}
            </div>
          )}

          {!showPhoneInput && (
            <div className="shipping-form-group">
              <label htmlFor="phone_field">Số Điện Thoại</label>
              <input
                type="number"
                id="phone_field"
                className="shipping-form-control"
                value={phoneNo}
                onChange={(e) => setPhoneNo(e.target.value)}
                required
              />
              {phoneError && (
                <p
                  className="error"
                  style={{ color: "red", fontSize: "0.8em" }}
                >
                  {phoneError}
                </p>
              )}
            </div>
          )}

          {!showAddressForm && (
            <button
              type="button"
              onClick={() => {
                setShowAddressForm(true);
                setShowPhoneInput(false);
              }}
              className="shipping-btn"
            >
              Tạo Địa Chỉ Mới
            </button>
          )}

          {showAddressForm && (
            <Fragment>
              <button type="submit" className="shipping-btn">
                Tiếp Tục
              </button>
            </Fragment>
          )}
          <Link
            to="/cart"
            className="btn btn-outline-danger"
            style={{ marginTop: "20px" }}
          >
            Quay lại
          </Link>
        </form>
      </div>
    </Fragment>
  );
};

export default Shipping;
