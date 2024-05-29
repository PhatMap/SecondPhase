import React, { useEffect, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MetaData from "../layout/MetaData";
import { Link } from "react-router-dom"; // Import Link từ react-router-dom
import { getUserAddress } from "../../actions/userActions";

const UserAddress = () => {
  const { user, error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserAddress());
    if (error) {
      toast.error(error);
    }
  }, [dispatch, error]);

  return (
    <Fragment>
      <MetaData title={"User Address"} />
      <div className="container container-fluid">
        <h1>User Address</h1>
        <Link to="/me/user-address/add">Add Address</Link>
        {user && user.address && user.address.length > 0 ? (
          <table className="table table-striped table-bordered table-responsive-sm">
            <thead>
              <tr>
                <th>Province</th>
                <th>District</th>
                <th>Town</th>
                <th>Location</th>
                <th>Phone</th>
                <th>Action</th> {/* Thêm cột Action */}
              </tr>
            </thead>
            <tbody>
              {user.address.map((address) => (
                <tr key={address._id}>
                  <td>{address.province}</td>
                  <td>{address.district}</td>
                  <td>{address.town}</td>
                  <td>{address.location}</td>
                  <td>{address.phone}</td> 
                  <td>
                    <Link to={`/me/user-address/update/${address._id}`}>Edit</Link> {/* Liên kết nút Edit với id của địa chỉ */}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No addresses found</p>
        )}
      </div>
    </Fragment>
  );
};

export default UserAddress;
