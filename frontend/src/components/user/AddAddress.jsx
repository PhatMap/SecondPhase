import React, { Fragment, useState, useEffect } from "react";
import Address from './Address';
import { useDispatch ,useSelector} from 'react-redux';
import { addAddress } from "../../actions/userActions"; // Đảm bảo import action từ module hoặc file tương ứng
import { useNavigate } from "react-router-dom";
import { getUserAddress,clearErrors } from "../../actions/userActions";

const AddAddress = () => {
  const navigate = useNavigate();
  const [address, setAddress] = useState({
    province: '',
    district: '',
    town: '',
    location: '',
    phone: ''
  });
  const [successMessage, setSuccessMessage] = useState(''); // Thêm state cho thông báo thành công
  const [errorMessage, setErrorMessage] = useState('');
  const {  error } = useSelector((state) => state.auth);
  const [AddressError, setAddressError] = useState("");
  const dispatch = useDispatch();

  const handleAddressChange = (field, value) => {
    setAddress({
      ...address,
      [field]: value
    });
  };

  const handlePhoneChange = (event) => {
    const { value } = event.target;
    setAddress({
      ...address,
      phone: value
    });
  };
  useEffect(() => {
    if (isValidPhoneNumber(address.phone)) {
        setErrorMessage(""); 
      }
    if (address.province && address.district && address.town && address.location) {
        setAddressError(""); // Ẩn thông báo lỗi khi đã nhập đầy đủ thông tin địa chỉ
      }
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    
  }, [dispatch, address.phone,address ,error]);
  const isValidPhoneNumber = (phone) => {
    // Sử dụng biểu thức chính quy để kiểm tra định dạng số điện thoại
    const phoneRegex = /^[0-9]{10}$/;
    return phoneRegex.test(phone);
  };
  
  const handleAddAddress = (event) => {
    event.preventDefault(); // Ngăn chặn hành động mặc định của form submit
    if (!address.province || !address.district || !address.town || !address.location) {
        setAddressError("Vui lòng nhập đầy đủ thông tin địa chỉ.");
        return;
      }
    // Kiểm tra xem số điện thoại đã nhập và đúng định dạng chưa
    if (!isValidPhoneNumber(address.phone)) {
      setErrorMessage("Số điện thoại không hợp lệ. Vui lòng kiểm tra lại.");
      return;
    }
  
    const formData = new FormData();
    formData.append('province', address.province);
    formData.append('district', address.district);
    formData.append('town', address.town);
    formData.append('location', address.location);
    formData.append('phone', address.phone);
  
    dispatch(addAddress(formData))
      .then(() => {
        setSuccessMessage('Địa chỉ đã được thêm thành công.');
        dispatch(getUserAddress());
        navigate("/me/user-address");
      })
      .catch((error) => {
        setErrorMessage(error.response.data.message);
      });
  };
  
  return (
    <div className="addaddress-wrapper">
      <form className="register-form-container" encType="multipart/form-data">
        <h1 className="addaddress-heading">Thêm Địa Chỉ</h1>
        <Address handleAddressChange={handleAddressChange} />
        {AddressError && <p className="error" style={{ color: "red", fontSize: "0.8em" }}>{AddressError}</p>}
        <div className="addaddress-form-group">
          <label htmlFor="phone">Số điện thoại</label>
          <input
            type="text"
            id="phone"
            className="addaddress-form-control"
            value={address.phone}
            onChange={handlePhoneChange}
            placeholder="Nhập số điện thoại"
          />
           {errorMessage && <p className="error" style={{ color: "red", fontSize: "0.8em" }}>{errorMessage}</p>}
        </div>
        <button onClick={handleAddAddress} className="register-btn">Thêm Địa Chỉ </button>
        {successMessage && <p className="success-message">{successMessage}</p>}
      </form>
    </div>
  );
};

export default AddAddress;
