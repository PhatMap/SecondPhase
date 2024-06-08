import React, { Fragment, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
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
  const [showModal, setShowModal] = useState(false);
  const [deleteAddressId, setDeleteAddressId] = useState(null);

  useEffect(() => {
    dispatch(getUserAddress());

    if (error) {
      setErrorMessage(
        "Số lượng địa chỉ đã đầy hoặc không thể truy cập danh sách địa chỉ."
      );
    } else {
      setErrorMessage("");
    }

    if (isDeleted) {
      toast.success("Xóa Địa Chỉ Thành Công", {
        toastId: "success1",
      });
      dispatch({ type: USER_ADDRESS_DELETE_RESET });
    }
  }, [dispatch, error, isDeleted]);

  const handleAddAddress = () => {
    if (!user || !user.address || user.address.length >= 5) {
      setErrorMessage(
        "Số lượng địa chỉ đã đầy. Vui lòng cập nhật hoặc xóa địa chỉ không dùng tới."
      );
    } else {
      history("/me/user-address/add");
    }
  };
  const handleDeleteAddress = (addressId) => {
    if (user.address.length === 1) {
      setErrorMessage("Bạn không thể xóa địa chỉ này vì chỉ còn một địa chỉ.");
      return;
    }
    setDeleteAddressId(addressId);
    setShowModal(true); // Hiển thị modal
  };
  const handleDeleteConfirmed = async (addressId) => {
    await dispatch(deleteUserAddress(addressId));
    dispatch(getUserAddress());
    setShowModal(false); // Ẩn modal sau khi xác nhận xóa
  };

  return (
    <Fragment>
      <MetaData title={"User Address"} />
      <ToastContainer />
      <div className="container container-fluid">
        <h1 className="useraddress-heading">Địa Chỉ Người Dùng</h1>
        <button
          className="address-add-btn-container"
          onClick={handleAddAddress}
        >
          Thêm Địa Chỉ Mới
        </button>
        {errorMessage && (
          <p
            className="error-message"
            style={{ color: "red", marginLeft: "150px" }}
          >
            {errorMessage}
          </p>
        )}
        {user && user.address && user.address.length > 0 ? (
          <table className="custom-table">
            <thead>
              <tr>
                <th>Tỉnh/Thành Phố </th>
                <th>Quận/Huyện </th>
                <th>Xã/Phường </th>
                <th>Địa Chỉ </th>
                <th>Số Điện Thoại </th>
                <th>Tác vụ </th>
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
                    <Link
                      to={`/me/user-address/update/${address._id}`}
                      className="btn btn-primary py-1 px-2"
                    >
                      <i className="fa fa-pencil"></i>
                    </Link>

                    <button
                      className="btn btn-danger py-1 px-2 ml-2"
                      onClick={() => handleDeleteAddress(address._id)}
                    >
                      <i className="fa fa-trash"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p style={{ fontSize: "3rem", marginLeft: "550px" }}>
            Không Có Địa Chỉ
          </p>
        )}
        <Link
          to="/me"
          className="btn btn-outline-danger btn-sm"
          style={{ float: "right", marginRight: "150px", marginTop: "1rem" }}
        >
          Quay lại
        </Link>
      </div>

      {showModal && (
        <div className="delete-notify-container">
          <div className="delete-notify-form">
            <h1> Xóa địa chỉ này?</h1>
            <div className="delete-notify-btn-container">
              <button className="delete-notify-btn-container-yes" onClick={() => handleDeleteConfirmed(deleteAddressId)}>Yes</button>
              <button className="delete-notify-btn-container-no" onClick={() => setShowModal(false)}>No</button>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default UserAddress;
