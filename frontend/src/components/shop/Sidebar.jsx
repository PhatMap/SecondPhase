import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="sidebar-wrapper">
      <nav className="sidebar-form">
        <ul className="sidebar-element-container">
          <li>
            <Link to="/dashboard" className="sidebar-element">
              <i className="fa fa-tachometer"></i> Thống kê
            </Link>
          </li>

          <li>
            <Link to="/shop/products" className="sidebar-element">
              <i className="fa fa-product-hunt"></i> Quản lý Sản Phẩm
            </Link>
          </li>

          <li>
            <Link to="/shop/orders" className="sidebar-element">
              <i className="fa fa-shopping-basket"></i> Quản lý Đơn Hàng
            </Link>
          </li>

          <li>
            <Link to="/shop/users" className="sidebar-element">
              <i className="fa fa-users"></i> Quản lý Người Dùng
            </Link>
          </li>

          <li>
            <Link to="/shop/reviews" className="sidebar-element">
              <i className="fa fa-star"></i> Quản lý Đánh Giá
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
};

export default Sidebar;
