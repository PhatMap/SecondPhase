import React, { Fragment, useState, useEffect } from "react";

import MetaData from "../layout/MetaData";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { resetPassword, clearErrors } from "../../actions/userActions";
import { useNavigate, useParams } from "react-router-dom";

const NewPassword = () => {
  const history = useNavigate();
  const { token } = useParams();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();

  const { error, success } = useSelector((state) => state.forgotPassword);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      toast.success("Password updated successfully");
      history("/login");
    }
  }, [dispatch, error, success, history]);

  const submitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.set("password", password);
    dispatch(resetPassword(token, formData));
  };

  return (
    <Fragment>
      <MetaData title={"New Password Reset"} />

      <div className="row wrapper">
        <div className="col-10 col-lg-5">
          <form className="shadow-lg" onSubmit={submitHandler}>
            <h1 className="mb-3">New Password</h1>

            <div className="form-group">
              <label htmlFor="password_field">Password</label>
              <input
                type="password"
                id="password_field"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="confirm_password_field">Confirm Password</label>
              <input
                type="password"
                id="confirm_password_field"
                className="form-control"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            <button
              id="new_password_button"
              type="submit"
              className="btn btn-block py-3"
            >
              Set Password
            </button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default NewPassword;
