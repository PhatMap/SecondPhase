import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getApplications } from "../../actions/applicationActions";

const ManageApplications = () => {
  const dispatch = useDispatch();

  const { applications, loading, error } = useSelector(
    (state) => state.applications
  );

  useEffect(() => {
    dispatch(getApplications());
    console.log(applications);
  }, []);

  const setApplications = () => {
    const data = {
      columns: [
        {
          label: "Tên Người Đăng Ký",
          field: "name",
        },
        {
          label: "Ảnh Đại Diện",
          field: "image",
        },
        {
          label: "Email",
          field: "email",
        },
        {
          label: "Vai trò",
          field: "role",
        },
        {
          label: "Trạng thái",
          field: "status",
        },
        {
          label: "Tác vụ",
          field: "action",
        },
      ],
      rows: [],
    };

    if (users.length > 0) {
      users.forEach((user) => {
        data.rows.push({
          name: user.name,
          image: (
            <img
              src={user.avatar.url}
              alt={user.name}
              style={{ width: "50px", height: "50px" }}
            />
          ),
          email: user.email,
          role:
            user.role === "admin"
              ? "Quản trị viên"
              : user.role === "shopkeeper"
              ? "Chủ cửa hàng"
              : "Khách hàng",
          status:
            user.status === "active" ? "Đang hoạt động" : "Ngưng hoạt động",
          action: (
            <Fragment>
              <div className="flex-horizental">
                <Link
                  to={`/admin/user/${user._id}`}
                  className="btn btn-primary py-1 px-2"
                >
                  <i className="fa fa-pencil"></i>
                </Link>
                <button
                  className="btn btn-danger py-1 px-2 ml-2"
                  onClick={() => {
                    setShow(true);
                    setDeletedUser({ id: user._id, role: user.role });
                  }}
                >
                  <i className="fa fa-trash"></i>
                </button>
                <button
                  className="btn btn-warning py-1 ml-2"
                  onClick={() => handleBanUser(user)}
                >
                  <i
                    className={`fa ${
                      user.status === "active" ? "fa fa-unlock" : "fa fa-lock"
                    }`}
                  ></i>
                </button>
              </div>
            </Fragment>
          ),
        });
      });
    } else {
      data.rows.push({
        name: "Trông",
        image: <img style={{ width: "50px", height: "50px" }} />,
        email: "Trông",
        role: "Trông",
        status: "Trông",
        action: "Trông",
      });
    }

    return data;
  };

  return (
    <Fragment>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h1 className="display-4 text-center">
              Quản Lý Đơn Đăng Ký Bán Hàng
            </h1>
            <p className="lead text-center">Manage Applications</p>
            <hr />
            {/* <DataTable data={setApplications()} /> */}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ManageApplications;
