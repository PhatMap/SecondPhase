import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUserAddress, getUserAddress } from "../../actions/userActions";
import MetaData from "../layout/MetaData";
import Address from "./Address";
import { useParams } from "react-router-dom"; // Import useParams

const UpdateAddress = ({ history }) => {
  const { id } = useParams(); // Lấy id từ URL
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
    dispatch(getUserAddress(id)); // Sử dụng id từ URL để lấy địa chỉ
  }, [dispatch, id]);

  useEffect(() => {
    if (address) {
      setAddressData({
        province: address.province,
        district: address.district,
        town: address.town,
        location: address.location,
        phone: address.phone
      });
    }
  }, [address]);

  const handleAddressChange = (field, value) => {
    setAddressData({
      ...addressData,
      [field]: value
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateUserAddress(id, addressData)); // Sử dụng id từ URL khi gửi yêu cầu cập nhật
    history.push("/me/user-address");
  };

  return (
    <div className="container container-fluid">
      <MetaData title={"Update Address"} />
      <div className="row wrapper">
        <div className="col-10 col-lg-5">
          <form className="shadow-lg" onSubmit={submitHandler}>
            <h1 className="mb-3">Update Address</h1>
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
