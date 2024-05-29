import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUserAddress, getUserAddress } from "../../actions/userActions";
import MetaData from "../layout/MetaData";
import Address from "./Address"; // Import component Address

const UpdateAddress = ({ match, history }) => {
  const [addressData, setAddressData] = useState({
    province: "",
    district: "",
    town: "",
    location: "",
    phone: ""
  });

  const dispatch = useDispatch();

  const { address } = useSelector((state) => state.user);

  useEffect(() => {
    if (address && address._id !== match.params.id) {
      dispatch(getUserAddress(match.params.id));
    } else {
      setAddressData({
        province: address.province,
        district: address.district,
        town: address.town,
        location: address.location,
        phone: address.phone
      });
    }
  }, [dispatch, address, match.params.id]);

  const handleAddressChange = (field, value) => {
    setAddressData({
      ...addressData,
      [field]: value
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(updateUserAddress(address._id, addressData));
    history.push("/me/user-address");
  };

  return (
    <div className="container container-fluid">
      <MetaData title={"Update Address"} />
      <div className="row wrapper">
        <div className="col-10 col-lg-5">
          <form className="shadow-lg" onSubmit={submitHandler}>
            <h1 className="mb-3">Update Address</h1>
            {/* Pass handleAddressChange as prop to Address component */}
            <Address handleAddressChange={handleAddressChange} />
            <button
              id="update_button"
              type="submit"
              className="btn btn-block py-3"
            >
              UPDATE
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateAddress;
