import React, { Fragment, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MetaData from "../layout/MetaData";
import { Link, useNavigate } from "react-router-dom";
import { getUserAddress, deleteUserAddress } from "../../actions/userActions";
import { USER_ADDRESS_DELETE_RESET } from "../../constants/userConstants";

const UserAddress = () => {
  const { user, error, isDeleted } = useSelector((state) => state.auth);
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



  useEffect(() => {
    if (isDeleted) {
      dispatch(getUserAddress()).then(() => {
        // Thêm các xử lý khác ở đây nếu cần
      });
      toast.success("Xóa Địa Chỉ Thành Công");
      dispatch({ type: USER_ADDRESS_DELETE_RESET });
    }
  }, [dispatch, isDeleted]);
  






  // if (isDeleted) {
  //   toast.success("Xóa Địa Chỉ Thành Công");
  //   dispatch({ type: USER_ADDRESS_DELETE_RESET });
  //   dispatch(getUserAddress());
  // }

  const handleAddAddress = () => {
    if (!user || !user.address || user.address.length >= 5) {
      setErrorMessage("Số lượng địa chỉ đã đầy. Vui lòng cập nhật hoặc xóa địa chỉ không dùng tới.");
    } else {
      history("/me/user-address/add");
    }
  };

  const handleDeleteAddress = (addressId) => {
    const confirmDelete = window.confirm("Bạn có chắc muốn xóa địa chỉ này?");
    if (confirmDelete) {
      dispatch(deleteUserAddress(addressId)).then(() => {
        dispatch(getUserAddress());
      });
    }
  };

  useEffect(() => {
    console.log("User state after deletion:", user);
  }, [user]);

  return (
    <Fragment>
      <MetaData title={"User Address"} />
      <div className="container container-fluid">
        <h1 className="useraddress-heading">Địa Chỉ Người Dùng</h1>
        <button className="address-add-btn-container" onClick={handleAddAddress}>Thêm Địa Chỉ Mới</button>
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
                <th>Action</th>
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
                    <Link to={`/me/user-address/update/${address._id}`}>Edit   </Link>
                    <button onClick={() => handleDeleteAddress(address._id)}>Delete</button>
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
