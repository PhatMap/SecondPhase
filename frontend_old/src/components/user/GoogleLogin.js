import { GoogleLogin } from "@react-oauth/google";
import { useDispatch, useSelector } from "react-redux";
import { googleLogin } from "../../actions/userActions";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { jwtDecode } from "jwt-decode";

const clientId =
  "629274107705-pppj24d559dgmpqcrkubgfqnl0hr9j4p.apps.googleusercontent.com";

function LoginGoogle() {
  const history = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const redirect = location.search ? location.search.split("=")[1] : "/";
  const { isAuthenticated, error } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isAuthenticated) {
      history(redirect);
    }
  }, [dispatch, isAuthenticated, error, history, redirect]);

  const onSuccess = (credentialResponse) => {
    const decoded = jwtDecode(credentialResponse.credential);
    console.log("Login success! currentUser:", decoded);
    dispatch(
      googleLogin(decoded.email, decoded.name, decoded.picture, decoded.sub)
    );
  };

  const onFailure = (error) => {
    console.log("Login failed! Error:", error);
  };

  return (
    <GoogleLogin
      buttonText="Login with Google"
      onSuccess={onSuccess}
      onFailure={onFailure}
      cookiePolicy={"single-host-origin"}
    />
  );
}

export default LoginGoogle;
