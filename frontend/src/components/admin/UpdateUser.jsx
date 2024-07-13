import React, { Fragment, useState, useEffect } from "react";

import MetaData from "../layout/MetaData";
import Sidebar from "./Sidebar";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import {
  updateUser,
  getUserDetails,
  clearErrors,
} from "../../actions/userActions";
import { UPDATE_USER_RESET } from "../../constants/userConstants";
import { useNavigate, useParams } from "react-router-dom";
import Back from "../layout/Back";
import Address from "../user/Address";
import { set } from "mongoose";

const UpdateUser = () => {
  const { error, isUpdated } = useSelector((state) => state.user);
  const { loading, user } = useSelector((state) => state.userDetails);

  const history = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  const [formError, setFormError] = useState("");
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [emailFormatError, setEmailFormatError] = useState("");
  const [addressSelected, setAddressSelected] = useState(false);
  const [avatar, setAvatar] = useState("");

  const [userData, setUserData] = useState({
    name: "",
    email: "",
    role: "",
    avatar: { public_id: "", url: "" },
  });

  useEffect(() => {
    dispatch(getUserDetails(id));
  }, []);

  useEffect(() => {
    if (user && user._id !== id) {
      dispatch(getUserDetails(id));
    } else {
      setUserData(user);
    }
  }, [user]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      toast.success("Thay Đổi Thành Công");

      history("/admin/users");

      dispatch({
        type: UPDATE_USER_RESET,
      });
    }
  }, [error, isUpdated]);

  const submitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.set("updatedUser", JSON.stringify(userData));

    dispatch(updateUser(user._id, formData));
  };

  const onChangeAvatar = (e) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatar(reader.result);
        setUserData((prevState) => ({
          ...prevState,
          avatar: reader.result,
        }));
      }
    };

    reader.readAsDataURL(e.target.files[0]);
  };

  return (
    <Fragment>
      <MetaData title={`Update User`} />
      <div className="register-wrapper">
        <form
          className="register-form-container"
          onSubmit={submitHandler}
          encType="multipart/form-data"
        >
          <Back />
          <h1 className="register-heading">Cập Nhật người dùng</h1>
          {error && <p className="error">{error}</p>}

          <div className="register-form-column">
            <div className="register-form-row">
              <div className="register-form-up">
                <div className="register-form-group">
                  <label htmlFor="name_field">Họ Tên</label>
                  <input
                    type="text"
                    id="name_field"
                    className="register-form-control"
                    placeholder="Name"
                    name="name"
                    value={userData.name}
                    onChange={(e) =>
                      setUserData({ ...userData, name: e.target.value })
                    }
                  />
                  {nameError && (
                    <p
                      className="error"
                      style={{ color: "red", fontSize: "0.8em" }}
                    >
                      {nameError}
                    </p>
                  )}
                </div>
                <div className="register-form-group">
                  <label htmlFor="avatar_upload">Ảnh Đại Diện</label>
                  <div className="d-flex align-items-center">
                    <div>
                      <figure className="register-avatar">
                        <img
                          src={avatar ? avatar : userData.avatar.url}
                          alt="Avatar Preview"
                        />
                      </figure>
                    </div>
                    <div className="register-custom-file">
                      <input
                        type="file"
                        name="avatar"
                        className="register-custom-file-input"
                        id="customFile"
                        accept="image/*"
                        onChange={onChangeAvatar}
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
              </div>
              <div className="register-form-up">
                <div className="register-form-group">
                  <label htmlFor="email_field">Email</label>
                  <input
                    type="email"
                    id="email_field"
                    className="register-form-control"
                    placeholder="Email"
                    name="email"
                    value={userData.email}
                    onChange={(e) =>
                      setUserData({ ...userData, email: e.target.value })
                    }
                  />
                  {emailError && (
                    <p
                      className="error"
                      style={{ color: "red", fontSize: "0.8em" }}
                    >
                      {emailError}
                    </p>
                  )}
                  {emailFormatError && (
                    <p
                      className="error"
                      style={{ color: "red", fontSize: "0.8em" }}
                    >
                      {emailFormatError}
                    </p>
                  )}
                  {errorMessage && (
                    <p style={{ color: "red" }}>{errorMessage}</p>
                  )}
                </div>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="role_field">Role</label>

              <select
                id="role_field"
                className="form-control"
                name="role"
                value={userData.role}
                onChange={(e) =>
                  setUserData({ ...userData, role: e.target.value })
                }
              >
                <option value="customer">Khách hàng</option>
                <option value="shopkeeper">Chủ cửa hàng</option>
                <option value="admin">Quản trị viên</option>
              </select>
            </div>
          </div>
          <button
            id="register_button"
            type="submit"
            className="register-btn"
            disabled={loading ? true : false}
          >
            Cập Nhật người dùng
          </button>
        </form>
      </div>
    </Fragment>
  );
};

export default UpdateUser;
