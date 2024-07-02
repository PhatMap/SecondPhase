import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import AdminLogin from "./Login";
import AdminDashboard from "./Dashboard";
import ManageUsers from "./ManageUsers";
import Sidebar from "./Sidebar";

const Centre = () => {
  const location = useLocation();

  const sidebarPaths = ["/admin/users", "/admin/dashboard"];

  const showSidebar = sidebarPaths.some((path) =>
    location.pathname.startsWith(path)
  );
  return (
    <div className={`${showSidebar ? "Centre-container" : ""}`}>
      {showSidebar && (
        <div style={{ width: "40px" }}>
          <Sidebar />
        </div>
      )}
      <div>
        <Routes>
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/users" element={<ManageUsers />} />
        </Routes>
      </div>
    </div>
  );
};

export default Centre;
