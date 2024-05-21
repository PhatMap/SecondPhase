import React, { Fragment, useState, useEffect } from "react";

import MetaData from "../layout/MetaData";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { forgotPassword, clearErrors } from "../../actions/userActions";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const dispatch = useDispatch();

  const { error, loading, message } = useSelector(
    (state) => state.forgotPassword
  );

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (message) {
      toast.info(message);
    }
  }, [dispatch, error, message]);

  const submitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.set("email", email);
    dispatch(forgotPassword(formData));
  };

  return (
    <Fragment>
      <MetaData title={"Forgot Password"} />

      <div className="forget-wrapper">
        <form className="forget-form-container" onSubmit={submitHandler}>
          <h1 className="forget-heading">Forgot Password</h1>
          <div className="forget-form-group">
            <label htmlFor="email_field">Enter Email</label>
            <input
              type="email"
              id="email_field"
              placeholder="Email"
              className="forget-form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <button className="forget-btn" disabled={loading ? true : false}>
            Send Email
          </button>
        </form>
      </div>
    </Fragment>
  );
};

export default ForgotPassword;
