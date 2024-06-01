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
            Thông Tin Cá Nhân
          </h2>
          <div
            style={{ fontFamily: "sans-serif" }}
            className="row justify-content-around mt-5 user-info"
          >
            <div className="col-12 col-md-3">
              <figure className="avatar avatar-profile">
                <img
                  className="rounded-circle img-fluid"
                  src={user.avatar.url}
                  alt={user.name}
                />
              </figure>
              <Link to="/me/update" className="profile-btn">
                Chỉnh Sửa
              </Link>
            </div>

            <div className="">
              <h4>Họ Tên </h4>
              <p>{user.name}</p>

              <h4>Địa Chỉ Email </h4>
              <p>{user.email}</p>

              <h4>Ngày Tạo </h4>
              <p>{String(user.createAt).substring(0, 10)}</p>
              <div className="profile-btn">
                <Link to="/me/user-address" className="btn btn-primary btn-block mt-3"style={{ marginTop: '1rem', marginBottom: '1rem' }}>
                  Địa Chỉ 
                </Link>
              </div>

              {user.role !== "admin" && (
                <Link to="/orders/me" className="btn btn-danger btn-block mt-5">
                  Đơn Hàng
                </Link>
              )}

              <div className="profile-btn">
                <Link to="/password/update" className="profile-btn">
                  Mật Khẩu 
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
