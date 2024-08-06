import React, { Fragment, useState, useEffect } from "react";

import MetaData from "../layout/MetaData";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import {
  updateProfile,
  loadUser,
  clearErrors,
} from "../../actions/userActions";
import { UPDATE_PROFILE_RESET } from "../../constants/userConstants";
import { useNavigate } from "react-router-dom";

const UpdateProfile = () => {
  const history = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [avatarPreview, setAvatarPreview] = useState(
    "/images/default_avatar.jpg"
  );

  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { error, isUpdated, loading } = useSelector((state) => state.user);
  const [avatar, setAvatar] = useState(user.avatar.url);

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setAvatarPreview(user.avatar.url);
    }

    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      toast.success("User updated successfully");
      dispatch(loadUser());

      history("/me");

      dispatch({
        type: UPDATE_PROFILE_RESET,
      });
    }
  }, [dispatch, error, history, isUpdated, user]);

  const submitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.set("name", name);
    formData.set("email", email);
    formData.set("avatar", avatar);
    dispatch(updateProfile(formData));
  };

  const onChange = (e) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatarPreview(reader.result);
        setAvatar(reader.result);
      }
    };

    reader.readAsDataURL(e.target.files[0]);
  };
  return (
    <Fragment>
      <MetaData title={"Update Profile"} />

      <div className="profile-update-container">
        <div className="profile-update-box">
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "flex-start",
              marginLeft: "40px",
            }}
          >
            <Link to="/me" className="btn-one">
              Quay lại
            </Link>
          </div>
          <form onSubmit={submitHandler} encType="multipart/form-data">
            <h1
              style={{
                fontFamily: "sans-serif",
                display: "flex",
                justifyContent: "center",
                fontSize: "50px",
                fontWeight: "bold",
                marginBottom: "50px",
              }}
            >
              Thông Tin Cá Nhân
            </h1>

            <div className="form-group">
              <label htmlFor="email_field" style={{ fontWeight: "bold" }}>
                Họ Tên{" "}
              </label>
              <input
                type="name"
                id="name_field"
                className="form-control"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="email_field" style={{ fontWeight: "bold" }}>
                Email
              </label>
              <input
                type="email"
                id="email_field"
                className="form-control"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                readOnly
              />
            </div>

            <div className="form-group">
              <label htmlFor="avatar_upload" style={{ fontWeight: "bold" }}>
                Ảnh Đại Diện{" "}
              </label>
              <div className="d-flex align-items-center">
                <div>
                  <figure className="avatar mr-3 item-rtl">
                    <img
                      src={avatarPreview}
                      className="rounded-circle"
                      alt="Avatar Preview"
                    />
                  </figure>
                </div>
                <div className="custom-file">
                  <input
                    type="file"
                    name="avatar"
                    className="custo  m-file-input"
                    id="customFile"
                    accept="image/*"
                    onChange={onChange}
                  />
                  <label className="custom-file-label" htmlFor="customFile">
                    Chọn Ảnh
                  </label>
                </div>
              </div>
            </div>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <button
                type="submit"
                className="profile-btn"
                disabled={loading ? true : false}
              >
                Cập Nhật
              </button>
            </div>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default UpdateProfile;
