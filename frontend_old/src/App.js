import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";

import Home from "./components/Home";
// import Home from "./components/test";
import Shop from "./components/Shop";

import ProductDetails from "./components/product/ProductDetails";

// Cart Imports
import Cart from "./components/cart/Cart";
import Shipping from "./components/cart/Shipping";
import ConfirmOrder from "./components/cart/ConfirmOrder";
import Payment from "./components/cart/Payment";
import OrderSuccess from "./components/cart/OrderSuccess";

// Order Imports
import ListOrders from "./components/order/ListOrders";
import OrderDetails from "./components/order/OrderDetails";

// Auth or User imports
import Login from "./components/user/Login";
import Register from "./components/user/Register";
import Profile from "./components/user/Profile";
import UpdateProfile from "./components/user/UpdateProfile";
import UpdatePassword from "./components/user/UpdatePassword";
import ForgotPassword from "./components/user/ForgotPassword";
import NewPassword from "./components/user/NewPassword";

// Admin Imports
import Dashboard from "./components/admin/Dashboard";
import ProductsList from "./components/admin/ProductsList";
import NewProduct from "./components/admin/NewProduct";
import UpdateProduct from "./components/admin/UpdateProduct";
import OrdersList from "./components/admin/OrdersList";
import ProcessOrder from "./components/admin/ProcessOrder";
import UsersList from "./components/admin/UsersList";
import UpdateUser from "./components/admin/UpdateUser";
import ProductReviews from "./components/admin/ProductReviews";
import Category from "./components/product/Category";
import Color from './components/product/Color'; 
import ProtectedRoute from "./components/route/ProtectedRoute";
import { loadUser } from "./actions/userActions";
import { useSelector } from "react-redux";
import store from "./store";
import axios from "axios";

// Payment
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

function App() {
  const [stripeApiKey, setStripeApiKey] = useState("");

  useEffect(() => {
    store.dispatch(loadUser());

    async function getStripeApiKey() {
      try {
        const { data } = await axios.get("/api/v1/stripeapi");
        setStripeApiKey(data.stripeApiKey);
      } catch (error) {
        if (error.response.status === 401) {
          console.log("User not authenticated");
        } else {
          console.error("Error fetching Stripe API key:", error.message);
        }
      }
    }
    getStripeApiKey();
  }, []);

  const { user, isAuthenticated, loading } = useSelector((state) => state.auth);

  return (
    <Router>
      <div className="App">
        <Header />
        <div className="container container-fluid">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/shop/color/:color" element={<Color />} />
            <Route path="/search/:keyword" element={<Shop />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/category/:category" element={<Category />} />
            <Route path="/cart" element={<Cart />} />
            <Route
              path="/shipping"
              element={<ProtectedRoute component={Shipping} />}
            />
            <Route
              path="/confirm"
              element={<ProtectedRoute component={ConfirmOrder} />}
            />
            <Route
              path="/success"
              element={<ProtectedRoute component={OrderSuccess} />}
            />
            <Route
              path="/payment"
              element={
                stripeApiKey && (
                  <Elements stripe={loadStripe(stripeApiKey)}>
                    <ProtectedRoute component={Payment} />
                  </Elements>
                )
              }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/password/forgot" element={<ForgotPassword />} />
            <Route path="/password/reset/:token" element={<NewPassword />} />
            <Route
              path="/me"
              element={<ProtectedRoute component={Profile} />}
            />
            <Route
              path="/me/update"
              element={<ProtectedRoute component={UpdateProfile} />}
            />
            <Route
              path="/password/update"
              element={<ProtectedRoute component={UpdatePassword} />}
            />
            <Route
              path="/orders/me"
              element={<ProtectedRoute component={ListOrders} />}
            />
            <Route
              path="/order/:id"
              element={<ProtectedRoute component={OrderDetails} />}
            />
          </Routes>
        </div>

        <Routes>
          <Route
            path="/dashboard"
            element={<ProtectedRoute isAdmin={true} component={Dashboard} />}
          />
          <Route
            path="/admin/products"
            element={<ProtectedRoute isAdmin={true} component={ProductsList} />}
          />
          <Route
            path="/admin/product"
            element={<ProtectedRoute isAdmin={true} component={NewProduct} />}
          />
          <Route
            path="/admin/product/:id"
            element={
              <ProtectedRoute isAdmin={true} component={UpdateProduct} />
            }
          />
          <Route
            path="/admin/orders"
            element={<ProtectedRoute isAdmin={true} component={OrdersList} />}
          />
          <Route
            path="/admin/order/:id"
            element={<ProtectedRoute isAdmin={true} component={ProcessOrder} />}
          />
          <Route
            path="/admin/users"
            element={<ProtectedRoute isAdmin={true} component={UsersList} />}
          />
          <Route
            path="/admin/user/:id"
            element={<ProtectedRoute isAdmin={true} component={UpdateUser} />}
          />
          <Route
            path="/admin/reviews"
            element={
              <ProtectedRoute isAdmin={true} component={ProductReviews} />
            }
          />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
