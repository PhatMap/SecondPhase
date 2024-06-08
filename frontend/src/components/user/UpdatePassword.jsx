import React, { Fragment, useState, useEffect } from "react";
import MetaData from "../layout/MetaData";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { updatePassword, clearErrors } from "../../actions/userActions";
import { UPDATE_PASSWORD_RESET } from "../../constants/userConstants";
import { useNavigate } from "react-router-dom";

const UpdatePassword = () => {
  const history = useNavigate();
  const [oldPassword, setOldPassword] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const dispatch = useDispatch();
  const [oldPasswordError, setOldPasswordError] = useState("");
  

  const {user, error, isUpdated, loading } = useSelector((state) => state.user);

  useEffect(() => {
    if (error) {
      if (error === "Mật Khẩu Cũ Không Đúng") {
        setOldPasswordError("Mật Khẩu Cũ Không Đúng")
      } else {
        toast.error(error);
      }
      dispatch(clearErrors());
    }

    if (isUpdated) {
      toast.success("Mật Khẩu Cập Nhật Thành Công");
      history("/me");

      dispatch({
        type: UPDATE_PASSWORD_RESET,
      });
    }
  }, [dispatch, error, history, isUpdated]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (!oldPassword) {
      setOldPasswordError("Nhập mật Khẩu Cũ");
      return;
    }
  

    if (!password) {
      setPasswordError("Mật khẩu không được để trống");
    } else if (password.length < 6) {
      setPasswordError("Mật khẩu phải trên 6 kí tự");
    } else {
      setPasswordError("");
    }

    if (!confirmPassword) {
      setConfirmPasswordError("Vui Lòng Nhập Lại Mật Khẩu");
    } else if (password !== confirmPassword) {
      setConfirmPasswordError("Mật Khẩu nhập lại không khớp");
    } else {
      setConfirmPasswordError("");
    }

    const formData = new FormData();
    formData.set("oldPassword", oldPassword);
    formData.set("password", password);

    dispatch(updatePassword(formData));
  };

  return (
    <Fragment>
      <MetaData title={"Change Password"} />
      <ToastContainer />

      <div className="row wrapper">
        <div className="col-10 col-lg-5">
          <form className="shadow-lg" onSubmit={submitHandler}>
          <h1 className="register-heading">Đổi Mật Khẩu</h1>
            <div className="form-group">
              <label for="old_password_field">Mật Khẩu </label>
              <input
                type="password"
                id="old_password_field"
                className="form-control"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
              />
            {oldPasswordError && <p className="error" style={{ color: "red", fontSize: "0.8em" }}>{oldPasswordError}</p>}

            </div>
            <div className="form-group">
              <label for="new_password_field">Mật Khẩu Mới</label>
              <input
                type="password"
                id="new_password_field"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {passwordError && <p className="error" style={{ color: "red", fontSize: "0.8em" }}>{passwordError}</p>}
            </div>
            <div className="form-group">
              <label for="confirm_password_field">Nhập Lại Mật Khẩu </label>
              <input
                type="password"
                id="confirm_password_field"
                className="form-control"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              {confirmPasswordError && <p className="error" style={{ color: "red", fontSize: "0.8em" }}>{confirmPasswordError}</p>}
            </div>
            <button
              type="submit"
                className="register-btn"
              disabled={loading ? true : false}
            >
             Cập Nhật
            </button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default UpdatePassword;
