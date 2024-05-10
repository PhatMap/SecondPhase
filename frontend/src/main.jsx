import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import store from "./store";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Provider } from "react-redux";

ReactDOM.createRoot(document.getElementById("root")).render(
  <GoogleOAuthProvider clientId="629274107705-pppj24d559dgmpqcrkubgfqnl0hr9j4p.apps.googleusercontent.com">
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>
  </GoogleOAuthProvider>
);
