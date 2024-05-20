import React from "react";
import { Link } from "react-router-dom";
import GoogleButton from "../user/GoogleLogin"


const LoginForm = ({
  submitHandler,
  email,
  setEmail,
  password,
  setPassword,
}) => {
  return (
    <div className="login-container">
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

        <button id="login_button" type="submit" className="login-button">
          LOGIN
        </button>
        <GoogleButton />
        <div className="login-footer">
          <p className="login-footer-text">Not a member?</p>
          <Link to="/register">Register</Link>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
