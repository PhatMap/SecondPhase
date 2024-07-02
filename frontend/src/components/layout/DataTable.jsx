import React from 'react'

const DataTable = ({columns, rows}) => {
  return (
    <table className="custom-table">
      <th>Tỉnh/ Thành phố</th>
      <th>Quận</th>
      <th>Huyện</th>
      <th>Chi tiết</th>
      <th>Số điện thoại</th>
      {/* {user.address.map((address) => (
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
      ))} */}
    </table>
  );
}

export default DataTable