import React, { useMemo } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import AdminLogin from "./Login";
import AdminDashboard from "./Dashboard";
import ManageUsers from "./ManageUsers";
import Sidebar from "./Sidebar";
import AddUser from "./AddUser";
import UpdateUser from "./UpdateUser";
import ManageApplications from "./ManageApplications";
import ManageCategories from "./ManageCategories";
import NewCategory from "./NewCategory";
import UpdateCategory from "./UpdateCategory";

const Centre = () => {
  const location = useLocation();

  const showSidebar = useMemo(() => {
    const sidebarPaths = [
      "/admin/users",
      "/admin/dashboard",
      "/admin/applications",
      "/admin/categories",
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
          <Route path="login" element={<AdminLogin />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="users" element={<ManageUsers />} />
          <Route path="addUser" element={<AddUser />} />
          <Route path="user/:id" element={<UpdateUser />} />
          <Route path="applications" element={<ManageApplications />} />
          <Route path="categories" element={<ManageCategories />} />
          <Route path="category/new" element={<NewCategory />} />
          <Route path="category/update/:id" element={<UpdateCategory />} />
        </Routes>
      </div>
    </div>
  );
};

export default Centre;
