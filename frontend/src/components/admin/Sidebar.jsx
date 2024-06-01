import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="sidebar-wrapper">
      <nav id="sidebar">
        <ul className="list-unstyled components">
          <li>
            <Link to="/dashboard">
              <i className="fa fa-tachometer"></i> Trang Quản Lý
            </Link>
          </li>

          <li>
            <Link to="/admin/products">
              <i className="fa fa-product-hunt"></i> Trang Sản Phẩm
            </Link>
          </li>

          <li>
            <Link to="/admin/orders">
              <i className="fa fa-shopping-basket"></i> Trang Hóa Đơn
            </Link>
          </li>

          <li>
            <Link to="/admin/users">
              <i className="fa fa-users"></i> Trang Khách Hàng
            </Link>
          </li>

          <li>
            <Link to="/admin/reviews">
              <i className="fa fa-star"></i> Trang Đánh Giá
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
