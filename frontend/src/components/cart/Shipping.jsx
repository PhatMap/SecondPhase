import React, { Fragment, useState } from "react";
import { countries } from "countries-list";

import MetaData from "../layout/MetaData";
import CheckoutSteps from "./CheckoutSteps";

import { useDispatch, useSelector } from "react-redux";
import { saveShippingInfo } from "../../actions/cartActions";
import { useNavigate } from "react-router-dom";
import ShippingAddress from './ShippingAddress';
import { getUserAddress } from "../../actions/userActions";

const Shipping = () => {
  const history = useNavigate();
  const countriesList = Object.values(countries);
  const dispatch = useDispatch();
  const { shippingInfo } = useSelector((state) => state.cart);

  const [province, setProvince] = useState(shippingInfo.province || "");
  const [district, setDistrict] = useState(shippingInfo.district || "");
  const [town, setTown] = useState(shippingInfo.town || "");
  const [location, setLocation] = useState(shippingInfo.location || "");
  const [phoneNo, setPhoneNo] = useState(shippingInfo.phone || "");

  const handleAddressChange = (field, value) => {
    switch (field) {
      case 'province':
        setProvince(value);
        break;
      case 'district':
        setDistrict(value);
        break;
      case 'town':
        setTown(value);
        break;
      case 'location':
        setLocation(value);
        break;
      default:
        break;
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    console.log({ province, district, town,location, phone: phoneNo });
    dispatch(saveShippingInfo({ province, district, town, location, phone: phoneNo }));
    history("/confirm");
  };

  return (
    <Fragment>
      <MetaData title={"Shipping Info"} />

      <CheckoutSteps shipping />

      <div className="shipping-wrapper">
        <form className="shipping-form-container" onSubmit={submitHandler}>
          <h1 className="shipping-heading">Shipping Info</h1>

          <ShippingAddress handleAddressChange={handleAddressChange} />

          <div className="shipping-form-group">
            <label htmlFor="phone_field">Phone No</label>
            <input
              type="tel"
              id="phone_field"
              className="shipping-form-control"
              value={phoneNo}
              onChange={(e) => setPhoneNo(e.target.value)}
              required
            />
          </div>

          <button id="shipping_btn" type="submit" className="shipping-btn">
            CONTINUE
          </button>
        </form>
      </div>
    </Fragment>
  );
};

export default Shipping;
