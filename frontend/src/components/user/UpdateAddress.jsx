import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUserAddress, getUserAddress } from "../../actions/userActions";
import MetaData from "../layout/MetaData";
import Address from "./Address";
import { useParams } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UpdateAddress = () => {
  const { user, error, isDeleted } = useSelector((state) => state.auth);
  const history = useNavigate();
  const { id } = useParams();
  const [addressData, setAddressData] = useState({
    province: "",
    district: "",
    town: "",
    location: "",
    phone: "",
  });

  const dispatch = useDispatch();
  const { address } = useSelector((state) => state.user);
  const [isupdateAddress, setIsupdateAddress] = useState(false);

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
        phone: address.phone,
      });
    }
  }, [address]);

  const handleAddressChange = (field, value) => {
    setAddressData({
      ...addressData,
      [field]: value,
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setIsupdateAddress(true);
    await dispatch(updateUserAddress(id, addressData));
    toast.success("Cập Nhật Địa Chỉ Thành Công");
    setTimeout(() => {
      history("/me/user-address");
    }, 2000);
  };

  return (
    <div className="container container-fluid">
      <MetaData title={"Update Address"} />
      <div className="row wrapper">
        <ToastContainer />
        <div className="col-15 col-lg-6">
          <form className="shadow-lg" onSubmit={submitHandler}>
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "flex-start",
              }}
            >
              <Link to="/me/user-address" className="btn-one">
                Quay lại
              </Link>
            </div>
            <h1 className="addaddress-heading">Cập Nhật Địa Chỉ </h1>
            <div className="current-address">
              <h2
                style={{
                  fontSize: "2rem",
                  fontWeight: "bold",
                  marginBottom: "10px",
                }}
              >
                Địa chỉ hiện tại:
              </h2>
            </div>
            {user.address.map((addressItem) => (
              <React.Fragment key={addressItem._id}>
                {addressItem._id === id && (
                  <div className="address-info">
                    <div>
                      <div className="label">Tỉnh/Thành phố:</div>
                      <div className="value">{addressItem.province}</div>
                    </div>
                    <div>
                      <div className="label">Quận/Huyện:</div>
                      <div className="value">{addressItem.district}</div>
                    </div>
                    <div>
                      <div className="label">Phường/Xã:</div>
                      <div className="value">{addressItem.town}</div>
                    </div>
                    <div>
                      <div className="label">Địa chỉ cụ thể:</div>
                      <div className="value">{addressItem.location}</div>
                    </div>
                    <div>
                      <div className="label">Số Điện Thoại:</div>
                      <div className="value">{addressItem.phone}</div>
                    </div>
                  </div>
                )}
              </React.Fragment>
            ))}

            <div className="current-address">
              <h2
                style={{
                  fontSize: "2rem",
                  fontWeight: "bold",
                  marginBottom: "20px",
                }}
              >
                Địa Chỉ Mới:
              </h2>
            </div>

            <Address
              handleAddressChange={handleAddressChange}
              addressData={addressData}
            />
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
              disabled={isupdateAddress}
              className="register-btn"
              style={{ marginBottom: "2rem" }}
            >
              Cập Nhật
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateAddress;
