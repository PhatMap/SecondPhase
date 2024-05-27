import React, { Fragment, useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import Loader from "../layout/Loader";
import MetaData from "../layout/MetaData";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { login, clearErrors } from "../../actions/userActions";

import LoginButton from "./GoogleLogin";

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
  
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await dispatch(login(email, password));
    } catch (error) {
      // Hiển thị thông báo lỗi
      toast.error(error.response.data.message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };
  

  

  return (
    <Fragment>
      <ToastContainer />
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={"Login"} />

          <div className="row wrapper" style={{ marginBottom: "100px" }}>
            <div className="col-10 col-lg-5">
              <form className="login-form" onSubmit={submitHandler}>
                <h1 className="login-heading">Login</h1>
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
                  <label className="login-label">Password</label>
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
                  Forgot Password?
                </Link>

                <button
                  id="login_button"
                  type="submit"
                  className="login-button"
                >
                  LOGIN
                </button>
                <LoginButton />
                <div className="login-footer">
                  <p className="login-footer-text">Not a member?</p>
                  <Link to="/register">Register</Link>
                </div>
              </form>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Login;
