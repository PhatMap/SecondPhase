import React, { Fragment, useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import Loader from "../layout/Loader";
import MetaData from "../layout/MetaData";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { login, clearErrors } from "../../actions/userActions";

import GoogleButton from "./GoogleLogin";
import Header from "../layout/Header";
import Footer from "../layout/Footer";

const Login = () => {
  const history = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const { isAuthenticated, error, loading } = useSelector(
    (state) => state.auth
  );

  const redirect = location.search ? location.search.split("=")[1] : "/";
  useEffect(() => {
    if (isAuthenticated) {
      history(redirect);
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
  }, [dispatch, isAuthenticated, error, history, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  return (
    <Fragment>
      <ToastContainer />
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <Header color={"black"} />
          <MetaData title={"Login"} />

          <div className="login-container">
            <div
              style={{ height: "650px", display: "flex", alignItems: "center" }}
            >
              <form className="login-form" onSubmit={submitHandler}>
                <h1 className="login-heading">Đăng Nhập </h1>
                <div className="login-input-container">
                  <label className="login-label">Email</label>
                  <input
                    type="email"
                    id="email_field"
                    className="login-input"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="login-input-container">
                  <label className="login-label">Mật Khẩu </label>
                  <input
                    type="password"
                    id="password_field"
                    className="login-input"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <Link to="/password/forgot" className="login-link">
                  Quên Mật Khẩu
                </Link>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    width: "100%",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <button
                    id="login_button"
                    type="submit"
                    className="login-button"
                  >
                    Đăng Nhập
                  </button>
                  <GoogleButton />
                </div>
                <div className="login-footer">
                  <p className="login-footer-text">Chưa Có Tài Khoản?</p>
                  <Link to="/register">Đăng Kí </Link>
                </div>
              </form>
            </div>
            <div style={{ width: "110%" }}>
              <Footer color="black" />
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Login;
