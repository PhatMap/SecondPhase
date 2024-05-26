import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import store from "./store";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Provider } from "react-redux";
import "./index.css";
import "./App.css";
import { ToastContainer } from "react-toastify";
import { Helmet, HelmetProvider } from "react-helmet-async";

ReactDOM.createRoot(document.getElementById("root")).render(
  <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
    <React.StrictMode>
      <Provider store={store}>
        <ToastContainer
          position="top-right"
          autoClose={2000}
          hideProgressBar={false}
          closeOnClick={true}
          pauseOnHover={true}
          draggable={true}
          progress={undefined}
          theme="light"
        />
        <App />
      </Provider>
    </React.StrictMode>
  </GoogleOAuthProvider>
);
