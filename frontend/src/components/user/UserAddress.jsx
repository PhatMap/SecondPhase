import React, { Fragment, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MetaData from "../layout/MetaData";
import { Link,useNavigate } from "react-router-dom"; // Import Link từ react-router-dom
import { getUserAddress } from "../../actions/userActions";


const UserAddress = () => {
  const { user, error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const history = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    dispatch(getUserAddress());
    if (error) {
      setErrorMessage("Số lượng địa chỉ đã đầy hoặc không thể truy cập danh sách địa chỉ.");
    } else {
      setErrorMessage(""); // Xóa thông báo lỗi nếu không có lỗi
    }
    
  }, [dispatch, error]);

  const handleAddAddress = () => {
    if (!user || !user.address || user.address.length >= 5) {
      setErrorMessage("Số lượng địa chỉ đã đầy.Vui lòng cập nhật hoặc xóa địa chỉ không dùng tới.");
    } else {
      history("/me/user-address/add");
    }
};



  return (
    <Fragment>
      <MetaData title={"User Address"} />
      <div className="container container-fluid">
        <h1 className="useraddress-heading">Địa Chỉ Người Dùng </h1>
        <button className="address-add-btn-container" onClick={handleAddAddress}>Thêm Địa Chỉ Mới </button>
        {errorMessage && <p className="error-message" style={{ color: "red", marginLeft: "150px" }}>{errorMessage}</p>}
        {user && user.address && user.address.length > 0 ? (
          <table className="custom-table">
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
