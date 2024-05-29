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
            My Profile
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
                Edit Profile
              </Link>
            </div>

            <div className="">
              <h4>Full Name</h4>
              <p>{user.name}</p>

              <h4>Email Address</h4>
              <p>{user.email}</p>

              <h4>Joined On</h4>
              <p>{String(user.createAt).substring(0, 10)}</p>
              <div className="profile-btn">
                <Link to="/me/user-address" className="btn btn-primary btn-block mt-3">
                  Manage Addresses
                </Link>
              </div>

              {user.role !== "admin" && (
                <Link to="/orders/me" className="btn btn-danger btn-block mt-5">
                  My Orders
                </Link>
              )}

              <div className="profile-btn">
                <Link to="/password/update" className="profile-btn">
                  Change Password
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
