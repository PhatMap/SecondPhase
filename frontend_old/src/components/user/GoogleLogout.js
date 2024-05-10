import { GoogleLogout } from "@react-oauth/google";
import { useDispatch } from "react-redux";
import { googleLogout } from "../../actions/userActions";
const clientId =
  "629274107705-pppj24d559dgmpqcrkubgfqnl0hr9j4p.apps.googleusercontent.com";

function LogoutGoogle() {
  const dispatch = useDispatch();

  const onSuccess = () => {
    console.log("Logout success");
    dispatch(googleLogout());
  };

  return (
    <div>
      <GoogleLogout
        clientId={clientId}
        buttonText="Logout"
        onLogoutSuccess={onSuccess}
        render={(renderProps) => (
          <button
            onClick={renderProps.onClick}
            disabled={renderProps.disabled}
            style={{
              background: "#DB4437",
              color: "white",
              padding: "10px 20px",
              borderRadius: "4px",
              border: "none",
              cursor: "pointer",
              fontSize: "16px",
              fontWeight: "bold",
            }}
          >
            Logout
          </button>
        )}
      />
    </div>
  );
}

export default LogoutGoogle;
