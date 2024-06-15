import React, { useEffect, Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MetaData from "../layout/MetaData";
import { Link, useNavigate } from "react-router-dom";
import { getUserAddress } from "../../actions/userActions";
import { saveShippingInfo } from "../../actions/cartActions";
import CheckoutSteps from "./CheckoutSteps";

const AddressShip = () => {
  const { user, error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const history = useNavigate();
  const [selectedAddress, setSelectedAddress] = useState(null);

  useEffect(() => {
    dispatch(getUserAddress());
    if (error) {
      toast.error(error);
    }
  }, [dispatch, error]);

  const handleSelectAddress = (address) => {
    setSelectedAddress(address);
    console.log("Selected Address:", address);
    dispatch(saveShippingInfo(address));
    toast.success("Shipping information saved");
    history("/confirm");
  };

  return (
    <Fragment>
      <MetaData title={"User Address"} />
      <CheckoutSteps shipping />
      <div className="container container-fluid">
        {user && user.address && user.address.length > 0 ? (
          <table className="custom-table">
            <th>Tỉnh/ Thành phố</th>
            <th>Quận</th>
            <th>Huyện</th>
            <th>Chi tiết</th>
            <th>Số điện thoại</th>
            {user.address.map((address) => (
              <tr key={address._id}>
                <td>{address.province}</td>
                <td>{address.district}</td>
                <td>{address.town}</td>
                <td>{address.location}</td>
                <td>{address.phone}</td>
                <td>
                  <button
                    className="btn btn-primary"
                    style={{
                      display: "flex",
                      width: "100%",
                      justifyContent: "center",
                    }}
                    onClick={() => handleSelectAddress(address)}
                  >
                    Select
                  </button>
                </td>
              </tr>
            ))}
          </table>
        ) : (
          <p>No addresses found</p>
        )}
      </div>
      <div className="text-center mt-5">
        <Link to="/shipping" className="btn btn-outline-danger btn-sm">
          Quay lại
        </Link>
      </div>
    </Fragment>
  );
};

export default AddressShip;
