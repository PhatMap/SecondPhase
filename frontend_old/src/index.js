import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App";
import store from "./store";
import {GoogleOAuthProvider } from "@react-oauth/google";


const root = document.getElementById("root");
const appRoot = createRoot(root);

appRoot.render(
  <GoogleOAuthProvider clientId="629274107705-pppj24d559dgmpqcrkubgfqnl0hr9j4p.apps.googleusercontent.com">
    <Provider store={store}>
      <App />
    </Provider>
  </GoogleOAuthProvider>
);
