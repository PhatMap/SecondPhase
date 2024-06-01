import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import Loader from "../layout/Loader";
import MetaData from "../layout/MetaData";

const Profile = () => {
  const { user, loading } = useSelector((state) => state.auth);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={"Your Profile"} />

          <h2
            style={{
              fontFamily: "sans-serif",
              display: "flex",
              justifyContent: "center",
              fontSize: "50px",
              fontWeight: "bold",
            }}
          >
            Thông tin tài khoản
          </h2>
          <div className="profile-container">
            <div className="profile-avatar">
              <figure className="avatar avatar-profile">
                <img
                  className=""
                  src={user.avatar.url}
                  alt={user.name}
                />
              </figure>
              <Link to="/me/update" className="profile-btn">
                Chỉnh sửa thông tin
              </Link>
            </div>

            <div className="profile-details">
              <h4>Tên tài khoản</h4>
              <p>{user.name}</p>

              <h4>Email</h4>
              <p>{user.email}</p>

              <h4>Ngày đăng ký</h4>
              <p>{String(user.createAt).substring(0, 10)}</p>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <Link to="/me/user-address" className="profile-btn">
                  Quản lý địa chỉ
                </Link>

                <Link to="/orders/me" className="profile-btn">
                  Đơn hàng đã đặt
                </Link>

                <Link to="/password/update" className="profile-btn">
                  Đổi mật khẩu
                </Link>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Profile;
