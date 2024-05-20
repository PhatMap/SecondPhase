import React, { Fragment, useState, useEffect } from "react";

import MetaData from "../layout/MetaData";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { register, clearErrors } from "../../actions/userActions";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const history = useNavigate();

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = user;

  const [avatar, setAvatar] = useState("");
  const [avatarPreview, setAvatarPreview] = useState(
    "/images/default_avatar.jpg"
  );

  const dispatch = useDispatch();

  const { isAuthenticated, error, loading } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isAuthenticated) {
      history("/");
    }

    if (error) {
      toast.error(error, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      dispatch(clearErrors());
    }
  }, [dispatch, isAuthenticated, error, history]);

  const submitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.set("name", name);
    formData.set("email", email);
    formData.set("password", password);
    formData.set("avatar", avatar);

    dispatch(register(formData));
  };

  const onChange = (e) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setAvatar(reader.result);
        }
      };

      reader.readAsDataURL(e.target.files[0]);
    } else {
      setUser({ ...user, [e.target.name]: e.target.value });
    }
  };

  return (
    <Fragment>
      <ToastContainer />
      <MetaData title={"Register User"} />

      <div className="register-wrapper">
        <form
          className="register-form-container"
          onSubmit={submitHandler}
          encType="multipart/form-data"
        >
          <h1 className="register-heading">Register</h1>
          <div className="register-form-group">
            <label htmlFor="name_field">Name</label>
            <input
              type="text"
              id="name_field"
              className="register-form-control"
              placeholder="Name"
              name="name"
              value={name}
              onChange={onChange}
            />
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
          </div>
          <div className="register-form-group">
            <label htmlFor="password_field">Password</label>
            <input
              type="password"
              id="password_field"
              className="register-form-control"
              name="password"
              placeholder="Password"
              value={password}
              onChange={onChange}
            />
          </div>
          <div className="register-form-group">
            <label htmlFor="avatar_upload">Avatar</label>
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
                  Choose Avatar
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
            REGISTER
          </button>
        </form>
      </div>
    </Fragment>
  );
};

export default Register;
