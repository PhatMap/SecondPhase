import React, { useMemo } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";
import Dashboard from "./Dashboard";
import ProductsList from "./ProductsList";
import NewProduct from "./NewProduct";
import UpdateProduct from "./UpdateProduct";
import OrdersList from "./OrdersList";
import ProcessOrder from "./ProcessOrder";
import ProductReviews from "./ProductReviews";
import ProtectedRoute from "../route/ProtectedRoute";

const Centre = () => {
  const location = useLocation();

  const showSidebar = useMemo(() => {
    const sidebarPaths = [
      "/shopkeeper/dashboard",
      "/shopkeeper/products",
      "/shopkeeper/orders",
      "/shopkeeper/reviews",
      "/shopkeeper/product",
      "/shopkeeper/order/",
      "/shopkeeper/user/",
    ];
    return sidebarPaths.some((path) => location.pathname.startsWith(path));
  }, [location.pathname]);

  return (
    <div className={`Centre-container`}>
      {showSidebar && (
        <div style={{ width: "40px" }}>
          <Sidebar />
        </div>
      )}
      <div className="Centre">
        <Routes>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="products" element={<ProductsList />} />
          <Route path="product" element={<NewProduct />} />
          <Route path="product/:id" element={<UpdateProduct />} />
          <Route path="orders" element={<OrdersList />} />
          <Route path="order/:id" element={<ProcessOrder />} />
          <Route path="reviews" element={<ProductReviews />} />
        </Routes>
      </div>
    </div>
  );
};

export default Centre;
