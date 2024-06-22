import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import Loader from "../layout/Loader";
import MetaData from "../layout/MetaData";
import Header from "../layout/Header";

const Profile = () => {
  const { user, loading } = useSelector((state) => state.auth);

  return (
    <Fragment>
      <Header color={"black"} />
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={"Your Profile"} />
          <div className="profile-container">
            <h2
              style={{
                fontFamily: "sans-serif",
                display: "flex",
                justifyContent: "center",
                fontSize: "50px",
                fontWeight: "bold",
              }}
            >
              Thông Tin Cá Nhân
            </h2>
            <div className="profile-form">
              <div className="profile-avatar">
                <figure className="avatar avatar-profile">
                  <img
                    className="rounded-circle img-fluid"
                    src={user.avatar.url}
                    alt={user.name}
                  />
                </figure>
                <Link to="/me/update" className="profile-btn">
                  Chỉnh Sửa thông tin cơ bản
                </Link>
                <div className="profile-btn">
                  <Link to="/me/user-address" className="profile-btn">
                    Chỉnh Sửa Địa Chỉ
                  </Link>
                </div>

                {user.role !== "admin" && (
                  <Link
                    to="/orders/me"
                    className="btn btn-danger btn-block mt-5"
                  >
                    Đơn Hàng
                  </Link>
                )}

                <div className="profile-btn">
                  <Link to="/password/update" className="profile-btn">
                    Đổi Mật Khẩu
                  </Link>
                </div>
              </div>

              <div className="profile-avatar">
                <div className="profile-content">
                  <div>
                    <h1>Họ Tên </h1>
                    <p>{user.name}</p>
                  </div>

                  <div>
                    <h1>Email </h1>
                    <p>{user.email}</p>
                  </div>

                  <div>
                    <h1>Ngày Tạo  Tài Khoản </h1>
                    <p>{String(user.createAt).substring(0, 10)}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Profile;
