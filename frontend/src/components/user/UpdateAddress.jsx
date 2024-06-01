import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUserAddress, getUserAddress } from "../../actions/userActions";
import MetaData from "../layout/MetaData";
import Address from "./Address";
import { useParams } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";

const UpdateAddress = ( ) => {
  const { user, error, isDeleted } = useSelector((state) => state.auth);
  const history = useNavigate();
  const { id } = useParams();
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
    dispatch(getUserAddress(id));
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
    console.log("Address Data:",id, addressData);
    dispatch(updateUserAddress(id, addressData));
    history("/me/user-address");
  };

  return (
    <div className="container container-fluid">
      <MetaData title={"Update Address"} />
      <div className="row wrapper">
        <div className="col-10 col-lg-5">
          <form className="shadow-lg" onSubmit={submitHandler}>
            <h1 className="addaddress-heading">Cập Nhật Địa Chỉ </h1>
            <div className="current-address">
              <h2 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '10px' }}>Địa chỉ hiện tại:</h2>
            </div>

            {user.address.map((address) => (
              <div key={address._id} className="address-info">
                
                <div>
                  <div className="label">Tỉnh/Thành phố:</div>
                  <div className="value">{address.province}</div>
                </div>
                <div>
                  <div className="label">Quận/Huyện:</div>
                  <div className="value">{address.district}</div>
                </div>
                <div>
                  <div className="label">Phường/Xã:</div>
                  <div className="value">{address.town}</div>
                </div>
                <div>
                  <div className="label">Địa chỉ cụ thể:</div>
                  <div className="value">{address.location}</div>
                </div>
                <div>
                  <div className="label">Số Điện Thoại:</div>
                  <div className="value">{address.phone}</div>
                </div>
              </div>
            ))}
           <div className="current-address">
            <h2 style={{ fontSize: '2rem', fontWeight: 'bold' , marginBottom: '20px'}}>Địa Chỉ Mới:</h2>
             </div>


            <Address handleAddressChange={handleAddressChange} addressData={addressData} />
            <div className="form-group">
              <label htmlFor="phone_field">Số Điện Thoại </label>
              <input
                type="text"
                id="phone_field"
                className="form-control"
                value={addressData.phone} // Access phone from addressData
                onChange={(e) => handleAddressChange("phone", e.target.value)}
              />
            </div>
            <button
              id="update_button"
              type="submit"
              className="btn btn-block py-3"
            >
              Cập Nhật
            </button>
            <Link to="/me/user-address" className="btn btn-outline-danger btn-sm"  style={{  marginTop: '1rem',marginLeft:'225px'}}>Quay lại</Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateAddress;
