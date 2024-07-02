import React, { useEffect, useState } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Home from "./components/Home";
import Shop from "./components/Shop";
import ProductDetails from "./components/product/ProductDetails";
import Cart from "./components/cart/Cart";
import Shipping from "./components/cart/Shipping";
import AddressShip from "./components/cart/AddressShip";
import ConfirmOrder from "./components/cart/ConfirmOrder";
import Payment from "./components/cart/Payment";
import OrderSuccess from "./components/cart/OrderSuccess";
import ListOrders from "./components/order/ListOrders";
import OrderDetails from "./components/order/OrderDetails";
import Login from "./components/user/Login";
import Register from "./components/user/Register";
import Profile from "./components/user/Profile";
import UpdateProfile from "./components/user/UpdateProfile";
import UpdatePassword from "./components/user/UpdatePassword";
import ForgotPassword from "./components/user/ForgotPassword";
import NewPassword from "./components/user/NewPassword";
import UserAddress from "./components/user/UserAddress";
import AddAddress from "./components/user/AddAddress";
import UpdateAddress from "./components/user/UpdateAddress";
import Dashboard from "./components/shop/Dashboard";
import ProductsList from "./components/shop/ProductsList";
import NewProduct from "./components/shop/NewProduct";
import UpdateProduct from "./components/shop/UpdateProduct";
import OrdersList from "./components/shop/OrdersList";
import ProcessOrder from "./components/shop/ProcessOrder";
import UsersList from "./components/shop/UsersList";
import UpdateUser from "./components/shop/UpdateUser";
import ProductReviews from "./components/shop/ProductReviews";
import ProtectedRoute from "./components/route/ProtectedRoute";
import NewUser from "./components/shop/NewUser";
import { loadUser } from "./actions/userActions";
import { useSelector } from "react-redux";
import store from "./store";
import axios from "axios";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import WaitingRoom from "./components/cart/WaitingRoom";
import Sidebar from "./components/shop/Sidebar";
import ScrollToTop from "./utils/ScrollToTop";
import AdminLogin from "./components/admin/Login";
import AdminDashboard from "./components/admin/Dashboard";

function App() {
  const history = useNavigate();
  const location = useLocation();
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


  const sidebarPaths = [
    "/dashboard",
    "/shop/products",
    "/shop/orders",
    "/shop/users",
    "/shop/reviews",
    "/shop/product",
    "/shop/order/",
    "/shop/user/",
  ];

  const showSidebar = sidebarPaths.some((path) =>
    location.pathname.startsWith(path)
  );

  return (
    <div className={`${showSidebar ? "App-container" : ""}`}>
      {showSidebar && (
        <div style={{ width: "40px" }}>
          <Sidebar />
        </div>
      )}
      <div className="App-form">
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/search/:keyword" element={<Shop />} />
          <Route path="/category/:category" element={<Shop />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />

          <Route
            path="/shipping"
            element={<ProtectedRoute component={Shipping} />}
          />
          <Route
            path="/shipping/address"
            element={<ProtectedRoute component={AddressShip} />}
          />
          <Route
            path="/confirm"
            element={<ProtectedRoute component={ConfirmOrder} />}
          />
          <Route
            path="/Waiting"
            element={<ProtectedRoute component={WaitingRoom} />}
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
          <Route path="/me" element={<ProtectedRoute component={Profile} />} />
          <Route
            path="/me/update"
            element={<ProtectedRoute component={UpdateProfile} />}
          />
          <Route
            path="/me/user-address"
            element={<ProtectedRoute component={UserAddress} />}
          />
          <Route exact path="/me/user-address/add" element={<AddAddress />} />
          <Route
            exact
            path="/me/user-address/update/:id"
            element={<UpdateAddress />}
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

        <Routes>
          <Route
            path="/dashboard"
            element={<ProtectedRoute isAdmin={true} component={Dashboard} />}
          />
          <Route
            path="/shop/products"
            element={<ProtectedRoute isAdmin={true} component={ProductsList} />}
          />
          <Route
            path="/shop/product"
            element={<ProtectedRoute isAdmin={true} component={NewProduct} />}
          />
          <Route
            path="/shop/product/:id"
            element={
              <ProtectedRoute isAdmin={true} component={UpdateProduct} />
            }
          />
          <Route
            path="/shop/orders"
            element={<ProtectedRoute isAdmin={true} component={OrdersList} />}
          />
          <Route
            path="/shop/order/:id"
            element={<ProtectedRoute isAdmin={true} component={ProcessOrder} />}
          />
          <Route
            path="/shop/users"
            element={<ProtectedRoute isAdmin={true} component={UsersList} />}
          />

          <Route
            path="/shop/user/:id"
            element={<ProtectedRoute isAdmin={true} component={UpdateUser} />}
          />
          <Route
            path="/shop/users/new"
            element={<ProtectedRoute isAdmin={true} component={NewUser} />}
          />
          <Route
            path="/shop/reviews"
            element={
              <ProtectedRoute isAdmin={true} component={ProductReviews} />
            }
          />
        </Routes>

        <Routes>
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
