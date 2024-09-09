import React, { Fragment, useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { logout } from "../../actions/userActions";
import Search from "./Search";
import MenuItem from "@mui/material/MenuItem";
import { Popper } from "@mui/material";
import { getUserCart } from "../../actions/cartActions";
import {
  getMoreNotifications,
  getNotifications,
  readNotifications,
} from "../../actions/notificationActions";

const Header = () => {
  const location = useLocation();
  const history = useNavigate();
  const dispatch = useDispatch();
  const [menu, setMenu] = useState(false);
  const menuRef = useRef(null);
  const [notify, setNotify] = useState(false);
  const notifyRef = useRef(null);
  const bellRef = useRef(null);
  const [isSticky, setIsSticky] = useState(false);
  const prevScrollY = useRef(0);
  const [anchorE2, setAnchorE2] = useState(null);
  const openCart = Boolean(anchorE2);
  const categories = ["Trousers", "Shirt", "Dress", "Shoe"];
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [homeClick, setHomeClick] = useState(false);
  const [cartClick, setCartClick] = useState(false);
  const [loginClick, setLoginClick] = useState(false);

  const { user, loading } = useSelector((state) => state.auth);
  const { latest, recent } = useSelector((state) => state.notifications);
  const { cartItems } = useSelector((state) => state.cart);

  const loadMoreNotifications = async () => {
    if (!hasMore) return;

    try {
      const result = await dispatch(getMoreNotifications(page));
      if (result && result > 0) {
        setPage((prev) => prev + 1);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error loading more notifications:", error);
    }
  };

  const handleClick = () => {
    setMenu(true);
  };

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setMenu(false);
    }

    if (
      notifyRef.current &&
      !notifyRef.current.contains(event.target) &&
      bellRef.current &&
      !bellRef.current.contains(event.target)
    ) {
      setNotify(false);
      dispatch(readNotifications());
    }
  };

  const handleCartOpen = (event) => {
    setAnchorE2(event.currentTarget);
  };
  const handleCartClose = () => {
    setAnchorE2(null);
  };

  const logoutHandler = () => {
    toast.error("Logged out successfully");
    dispatch(logout());
  };

  function updateNotificationCount(count) {
    const notificationCount = document.getElementById("notification-count");
    if (count > 0) {
      notificationCount.textContent = count;
      notificationCount.style.display = "block";
    } else {
      notificationCount.style.display = "none";
    }
  }

  const hanldeNotify = (e) => {
    e.stopPropagation();
    setNotify(!notify);
    updateNotificationCount(0);

    if (!notify === true) {
      dispatch(getNotifications());
    } else {
      dispatch(readNotifications());
    }
  };

  const handleLoadMore = () => {
    loadMoreNotifications();
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const container = notifyRef.current;

    const handleScroll = () => {
      const scrollPercentage =
        (container.scrollTop /
          (container.scrollHeight - container.clientHeight)) *
        100;
      if (scrollPercentage > 90) {
        loadMoreNotifications();
      }
    };

    if (container) {
      container.addEventListener("scroll", handleScroll);
      return () => container.removeEventListener("scroll", handleScroll);
    }
  }, [hasMore, loadMoreNotifications]);

  useEffect(() => {
    dispatch(getNotifications());
  }, []);

  useEffect(() => {
    if (user) {
      dispatch(getUserCart());
    }
  }, [dispatch, user]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < prevScrollY.current) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }

      prevScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (latest.length > 0 && notify === false) {
      const count = latest.length;
      updateNotificationCount(count);
    }
  }, [latest]);

  return (
    <Fragment>
      <header className="header-container">
        <nav className={`Header `}>
          <div className="Header-container">
            <div className="Header-container-right">
              <Link to="/" style={{ textDecoration: "none" }}>
                <div className="header-logo-container">
                  <h1 className="header-logo-begin">SHOP</h1>
                  <h1 className="header-logo-end">DEE</h1>
                </div>
              </Link>
            </div>
            <div className="Header-container-center">
              <Search />
            </div>
            <div className="Header-container-left">
              <div id="notification-bell">
                <i
                  ref={bellRef}
                  className={notify > 0 ? "fa fa-bell" : "fa fa-bell-o"}
                  onClick={hanldeNotify}
                ></i>
                <span
                  id="notification-count"
                  className="notification-badge"
                ></span>
                {notify && (
                  <span ref={notifyRef} className="notification-container">
                    <h2>Thông báo mới</h2>
                    {latest.length > 0 ? (
                      latest.map((item, index) => (
                        <p key={index}>{item.message}</p>
                      ))
                    ) : (
                      <p>Không có thông báo mới</p>
                    )}
                    <h2>Thông báo gần đây</h2>
                    {recent.length > 0 ? (
                      recent.map((item, index) => (
                        <p key={index}>{item.message}</p>
                      ))
                    ) : (
                      <p>Không có thông báo gần đây</p>
                    )}
                    {hasMore && <p>Cuộn xuống để xem thêm thông báo</p>}
                    {!hasMore && <p>Không còn thông báo nào khác</p>}
                    <button onClick={handleLoadMore}>Thông báo trước đó</button>
                  </span>
                )}
              </div>

              <button
                className={`Header-cart-count  ${cartClick ? "clicked" : ""}`}
                onMouseDown={() => setCartClick(true)}
                onMouseUp={() => setCartClick(false)}
                onMouseEnter={handleCartOpen}
                onMouseLeave={handleCartClose}
                onClick={() => history("/cart")}
              >
                <i className="fa fa-shopping-cart" />
                <span className="Header-count">
                  {user ? cartItems.length : 0}
                </span>
              </button>

              <Popper
                anchorEl={anchorE2}
                open={openCart && user}
                className="Header-cart-items"
              >
                {cartItems.map((item, index) => (
                  <MenuItem key={index}>
                    <div className="cart-MenuItem">
                      <img src={item.image} height="40" width="40" />
                      <div className="cart-MenuItem-container">
                        <p>Tên sản phẩm: {item.name.substring(0, 20)}...</p>
                        <p>Số lượng mua: {item.quantity}</p>
                        <div className="cart-summary-color">
                          <p>kích cỡ:</p>
                          <p>{item.size}</p>
                        </div>
                      </div>
                    </div>
                  </MenuItem>
                ))}
              </Popper>

              <button
                onClick={() => {
                  window.location.href = "/";
                }}
                className={`                
                ${
                  location.pathname === "/"
                    ? "Header-shop-link active"
                    : "Header-shop-link"
                }
                ${homeClick ? "clicked" : ""} `}
                onMouseDown={() => setHomeClick(true)}
                onMouseUp={() => setHomeClick(false)}
              >
                <i className="fa fa-home"></i>
                <p>Trang Chủ</p>
              </button>

              {user ? (
                <div>
                  <Link
                    to="#!"
                    className="avatar-container"
                    type="button"
                    id="dropDownMenuButton"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <img
                      src={user.avatar && user.avatar.url}
                      className="rounded-circle"
                      width={40}
                      height={40}
                    />
                  </Link>

                  <div
                    className="dropdown-menu avatar-dropdown"
                    aria-labelledby="dropDownMenuButton"
                  >
                    <p>{user && user.name}</p>
                    <p>{user && user.email}</p>
                    <hr />
                    {user && user.role === "shopkeeper" && (
                      <Link
                        className="dropdown-item"
                        to="/shopkeeper/dashboard"
                      >
                        Quản Lí
                      </Link>
                    )}
                    <Link className="dropdown-item" to="/orders/me">
                      Đơn Hàng
                    </Link>
                    <Link className="dropdown-item" to="/me">
                      Thông Tin Cá Nhân
                    </Link>
                    {user && user.role === "customer" && (
                      <Link className="dropdown-item" to="/shop/register">
                        Đăng ký bán hàng
                      </Link>
                    )}

                    <Link
                      className="dropdown-item text-danger"
                      to="/"
                      onClick={logoutHandler}
                    >
                      Thoát
                    </Link>
                  </div>
                </div>
              ) : (
                !loading && (
                  <button
                    className={`Header-login ${loginClick ? "clicked" : ""}`}
                    onClick={() => history("/login")}
                    onMouseDown={() => setLoginClick(true)}
                    onMouseUp={() => setLoginClick(false)}
                  >
                    <i
                      className="fa  fa-user-circle-o
"
                    ></i>
                    <p>Tài Khoản</p>
                  </button>
                )
              )}
            </div>
          </div>
        </nav>
        <nav className="header-separator"></nav>
        <nav className="sub-header-container">
          <p>Cam Kết</p>
          <div className="sub-header">
            <p>
              <img
                width={25}
                height={25}
                src="https://salt.tikicdn.com/ts/upload/96/76/a3/16324a16c76ee4f507d5777608dab831.png"
              />
              100% Chất lượng
            </p>
            <p>
              <img
                width={25}
                height={25}
                src="https://salt.tikicdn.com/ts/upload/3a/f4/7d/86ca29927e9b360dcec43dccb85d2061.png"
              />
              7 ngày Đổi trả
            </p>
            <p>
              <img
                width={25}
                height={25}
                src="https://salt.tikicdn.com/ts/upload/87/98/77/fc33e3d472fc4ce4bae8c835784b707a.png"
              />
              Giao nhanh đúng hẹn
            </p>
            <p>
              <img
                width={25}
                height={25}
                src="https://salt.tikicdn.com/ts/upload/6a/81/06/0675ef5512c275a594d5ec1d58c37861.png"
              />
              Giá siêu hợp lý
            </p>
            <p>
              <img
                width={25}
                height={25}
                src="https://salt.tikicdn.com/ts/upload/11/09/ec/456a2a8c308c2de089a34bbfef1c757b.png"
              />
              Freeship mọi đơn
            </p>
          </div>
        </nav>
      </header>
    </Fragment>
  );
};

export default Header;
