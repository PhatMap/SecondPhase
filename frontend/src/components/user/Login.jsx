import React, { Fragment, useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import Loader from "../layout/Loader";
import MetaData from "../layout/MetaData";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { login, clearErrors } from "../../actions/userActions";

import LoginButton from "./GoogleLogin";

// import { gapi } from "gapi-script";

// const clientId =
//   "629274107705-pppj24d559dgmpqcrkubgfqnl0hr9j4p.apps.googleusercontent.com";

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

  // useEffect(() => {
  //   function start() {
  //     gapi.client.init({
  //       clientId: clientId,
  //       scope: "",
  //     });
  //   }

  //   gapi.load("client:auth2", start);
  // });

  return (
    <Fragment>
      <ToastContainer />
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={"Login"} />
          <div className="-z-50 absolute top-0 left-0 w-full h-full flex mt-20 justify-evenly bg-white	"></div>
          <div
            className="flex justify-center h-auto p-8"
            style={{ fontFamily: "Lobster, cursive" }}
          >
            <form
              className="flex flex-col items-center border-solid divide-black border-4 w-96 bg-slate-50	"
              onSubmit={submitHandler}
            >
              <h1 className="text-6xl pb-4">Login</h1>
              <div className="w-80 mb-4">
                <label className="font-bold">Email</label>
                <input
                  type="email"
                  id="email_field"
                  className="form-control"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="w-80">
                <label className="font-bold">Password</label>
                <input
                  type="password"
                  id="password_field"
                  className="form-control"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <Link to="/password/forgot" className="self-end mr-4 mb-4">
                Forgot Password?
              </Link>

              <button
                id="login_button"
                type="submit"
                className="border-solid border-2 w-80 h-12 mb-4 bg-slate-950	text-white hover:bg-slate-100 rounded"
              >
                LOGIN
              </button>
              <LoginButton />
              <div className="mt-4 mb-4 flex gap-1">
                <p className="text-slate-400	">Not a member?</p>
                <Link to="/register">Register</Link>
              </div>
            </form>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Login;
