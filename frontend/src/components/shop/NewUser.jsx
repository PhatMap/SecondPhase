import React, { Fragment, useState, useEffect } from "react";
import MetaData from "../layout/MetaData";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";
import Address from "../user/Address";
import { newUser, clearErrors, clearMessage } from "../../actions/userActions";
import Back from "../layout/Back";

const NewUser = () => {
  const history = useNavigate();
  const [formError, setFormError] = useState("");
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [emailFormatError, setEmailFormatError] = useState("");
  const [addressSelected, setAddressSelected] = useState(false);

  const [selectedAddressInfo, setSelectedAddressInfo] = useState(null);

  const isCompleteAddress = (address) => {
    if (
      address &&
      address.province &&
      address.district &&
      address.town &&
      address.location
    ) {
      return (
        address.province.trim() !== "" &&
        address.district.trim() !== "" &&
        address.town.trim() !== "" &&
        address.location.trim() !== ""
      );
    }
    return false;
  };

  const handleAddressChange = (key, value) => {
    const updatedAddress = [...user.address];
    updatedAddress[0][key] = value;

    setUser((prevState) => ({
      ...prevState,
      address: updatedAddress,
    }));

    const complete = isCompleteAddress(user.address[0]);

    setAddressSelected(complete);

    if (!complete && value.trim() === "") {
      setFormError("Vui lòng chọn địa chỉ");
    } else {
      setFormError("");
    }
  };

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    address: [
      { province: "", district: "", town: "", location: "", phone: "" },
    ],
  });

  const { name, email, password, confirmPassword, address } = user;

  const [avatar, setAvatar] = useState("");
  const [avatarPreview, setAvatarPreview] = useState(
    "../images/default_avatar.jpg"
  );

  const dispatch = useDispatch();

  const { message, error, loading } = useSelector((state) => state.auth);
  const successAddUser = useSelector((state) => state.user.success);
  useEffect(() => {
    console.log("asdsdad", message);
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    toast.success("Thêm thành công");
    if (message) {
      toast.error("Thêm thành công");
      dispatch(clearMessage());
      history("/shop/users");
    }
  }, [dispatch, message, error, history]);

  const isValidPhoneNumber = (phone) => {
    const phoneRegex = /^[0-9]{10}$/;
    return phoneRegex.test(phone);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setFormError("");

    const phone = address[0].phone;

    if (!name) {
      setNameError("Họ Tên Không Được Để Trống");
    } else {
      setNameError("");
    }

    if (!email) {
      setEmailError("Email Không Được để trống");
    } else if (!email.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i)) {
      setEmailError("Email Chưa đúng định dạng");
    } else {
      setEmailError("");
    }

    if (!phone) {
      setPhoneError("Số Điện Thoại Không Được Để Trống");
    } else if (!isValidPhoneNumber(phone)) {
      setPhoneError("Số Điện Thoại Không Đúng Định Dạng");
    } else {
      setPhoneError("");
    }

    if (!password) {
      setPasswordError("Mật Khẩu Không Được Để Trống");
    } else if (password.length < 6) {
      setPasswordError(`Mật khẩu phải chứa ít nhất 6 ký tự`);
    } else {
      setPasswordError("");
    }

    if (!confirmPassword) {
      setConfirmPasswordError("Nhập Lại Mật Khẩu Không Được Để Trống");
    } else if (password !== confirmPassword) {
      setConfirmPasswordError("Nhập Lại Mật Khẩu Không Đúng");
    } else {
      setConfirmPasswordError("");
    }

    if (!addressSelected) {
      setFormError("Vui lòng chọn địa chỉ");
      return;
    }

    if (
      nameError ||
      emailError ||
      phoneError ||
      passwordError ||
      confirmPasswordError ||
      errorMessage
    ) {
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("avatar", avatar);
    address.forEach((address, index) => {
      formData.append(`address[${index}][province]`, address.province);
      formData.append(`address[${index}][district]`, address.district);
      formData.append(`address[${index}][town]`, address.town);
      formData.append(`address[${index}][location]`, address.location);
      formData.append(`address[${index}][phone]`, address.phone);
    });
    await dispatch(newUser(formData));
  };

  const onChange = (e) => {
    const { name, value } = e.target;

    if (name === "avatar") {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setAvatar(reader.result);
        }
      };

      reader.readAsDataURL(e.target.files[0]);
    } else {
      setUser((prevState) => {
        if (name === "phone") {
          const updatedAddress = [...prevState.address];
          address[0].phone = value;
          return { ...prevState, address: updatedAddress };
        } else {
          return { ...prevState, [name]: value };
        }
      });
    }

    switch (name) {
      case "name":
        setNameError("");
        break;
      case "email":
        setEmailError("");
        setEmailFormatError("");
        break;
      case "phone":
        setPhoneError("");
        break;
      case "password":
        setPasswordError("");
        break;
      case "confirmPassword":
        setConfirmPasswordError("");
        break;
      default:
        break;
    }
  };

  return (
    <Fragment>
      <MetaData title={"Register User"} />
      <div className="register-wrapper">
        <form
          className="register-form-container"
          onSubmit={submitHandler}
          encType="multipart/form-data"
        >
          <Back />

          <h1 className="register-heading">Khách Hàng </h1>
          <div className="register-form-group">
            <label htmlFor="name_field">Họ Tên</label>
            <input
              type="text"
              id="name_field"
              className="register-form-control"
              placeholder="Name"
              name="name"
              value={name}
              onChange={onChange}
            />
            {nameError && (
              <p className="error" style={{ color: "red", fontSize: "0.8em" }}>
                {nameError}
              </p>
            )}
          </div>
          <div className="register-form-group">
            <label htmlFor="email_field">Email</label>
            <input
              type="email"
              id="email_field"
              className="register-form-control"
              placeholder="Email"
              name="email"
              value={email}
              onChange={onChange}
            />
            {emailError && (
              <p className="error" style={{ color: "red", fontSize: "0.8em" }}>
                {emailError}
              </p>
            )}
            {emailFormatError && (
              <p className="error" style={{ color: "red", fontSize: "0.8em" }}>
                {emailFormatError}
              </p>
            )}
            {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
          </div>
          <div className="register-form-group">
            <label htmlFor="phone_field">Số Điện Thoại</label>
            <input
              type="text"
              id="phone_field"
              className="register-form-control"
              placeholder="Phone"
              name="phone"
              value={address[0].phone}
              onChange={onChange}
            />
            {phoneError && (
              <p className="error" style={{ color: "red", fontSize: "0.8em" }}>
                {phoneError}
              </p>
            )}
          </div>
          <div className="register-form-group">
            <label htmlFor="password_field">Mật Khẩu</label>
            <input
              type="password"
              id="password_field"
              className="register-form-control"
              name="password"
              placeholder="Password"
              value={password}
              onChange={onChange}
            />
            {passwordError && (
              <p className="error" style={{ color: "red", fontSize: "0.8em" }}>
                {passwordError}
              </p>
            )}
          </div>
          <div className="register-form-group">
            <label htmlFor="confirm_password_field">Nhập Lại Mật Khẩu</label>
            <input
              type="password"
              id="confirm_password_field"
              className="register-form-control"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={onChange}
            />
            {confirmPasswordError && (
              <p className="error" style={{ color: "red", fontSize: "0.8em" }}>
                {confirmPasswordError}
              </p>
            )}
          </div>
          <div className="register-form-group">
            <Address handleAddressChange={handleAddressChange} />
            {formError && (
              <p className="error" style={{ color: "red", fontSize: "0.8em" }}>
                {formError}
              </p>
            )}
          </div>
          <div className="register-form-group">
            <label htmlFor="avatar_upload">Ảnh Đại Diện</label>
            <div className="d-flex align-items-center">
              <div>
                <figure className="register-avatar">
                  <img src={avatarPreview} alt="Avatar Preview" />
                </figure>
              </div>
              <div className="register-custom-file">
                <input
                  type="file"
                  name="avatar"
                  className="register-custom-file-input"
                  id="customFile"
                  accept="image/*"
                  onChange={onChange}
                />
                <label
                  className="register-custom-file-label"
                  htmlFor="customFile"
                >
                  Chọn Ảnh
                </label>
              </div>
            </div>
          </div>
          <button
            id="register_button"
            type="submit"
            className="register-btn"
            disabled={loading ? true : false}
          >
            {errorMessage && (
              <p style={{ color: "red", fontSize: "0.8em" }}>{errorMessage}</p>
            )}
            Đăng Kí
          </button>
        </form>
      </div>
    </Fragment>
  );
};

export default NewUser;
