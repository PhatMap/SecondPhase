import React from "react";
import { Link } from "react-router-dom";

const Sidebar = React.memo(() => {
  return (
    <div className="sidebar-wrapper">
      <nav className="sidebar-form">
        <ul className="sidebar-element-container">
          <li>
            <Link to="/admin/dashboard" className="sidebar-element">
              <i className="fa fa-tachometer"></i> Thống kê
            </Link>
          </li>

          <li>
            <Link to="/admin/users" className="sidebar-element">
              <i className="fa fa-users"></i> Quản lý Người Dùng
            </Link>
          </li>

          <li>
            <Link to="/" className="sidebar-element" style={{ color: "red" }}>
              <i className="fa fa-user"></i> Thoát
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
});

export default Sidebar;
