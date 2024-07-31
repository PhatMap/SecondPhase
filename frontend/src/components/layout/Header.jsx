import React, { Fragment, useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaShoppingCart, FaBars } from "react-icons/fa";
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

const Header = ({ color }) => {
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

  const { user, loading, isGoogleLoggedIn } = useSelector(
    (state) => state.auth
  );
  const { latest, recent } = useSelector((state) => state.notifications);
  const { cartItems } = useSelector((state) => state.cart);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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

  return (
    <Fragment>
      <nav className={`Header ${color ? color : ""}`}>
        <div className="Header-container">
          <div className="Header-container-right">
            <Link to="/" style={{ textDecoration: "none" }}>
              <h1
                className="header-logo"
                style={{ fontFamily: "Lobster, cursive" }}
              >
                VITASHOP
              </h1>
            </Link>
          </div>
          <div className="Header-container-center">
            <Search />
          </div>
          <div className="Header-container-left">
            <div className="Header-category" ref={menuRef}>
              <i className="fa fa-bars burger-menu" onClick={handleClick}></i>
              {menu ? (
                <div className="header-menu">
                  {categories.map((cate, index) => (
                    <div key={index} className="header-menu-items">
                      <Link
                        to={`/category/${cate}`}
                        className="header-menu-item"
                      >
                        {cate}
                      </Link>
                    </div>
                  ))}
                </div>
              ) : (
                <></>
              )}
            </div>
            <button
              onClick={() => {
                window.location.href = "/shop";
              }}
              className={
                location.pathname === "/shop"
                  ? "Header-shop-link active"
                  : "Header-shop-link"
              }
            >
              Shop
            </button>

            <div className="Header-cart-count">
              <Link to="/cart" className="Header-cart">
                <FaShoppingCart
                  className="Header-cart-icon"
                  onMouseEnter={handleCartOpen}
                  onMouseLeave={handleCartClose}
                />
              </Link>
              <span className="Header-count">
                {user ? cartItems.length : 0}
              </span>
            </div>

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

            {user ? (
              <div className="ml-4 dropdown d-inline">
                <Link
                  to="#!"
                  className="btn dropdown-toggle text-white mr-4"
                  type="button"
                  id="dropDownMenuButton"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <figure
                    className="avatar avatar-nav"
                    style={{ background: "white" }}
                  >
                    <img
                      src={user.avatar && user.avatar.url}
                      alt={user && user.name}
                      className="rounded-circle"
                    />
                  </figure>
                  <span>{user && user.name}</span>
                </Link>

                <div
                  className="dropdown-menu"
                  aria-labelledby="dropDownMenuButton"
                >
                  {user && user.role === "admin" && (
                    <Link className="dropdown-item" to="/dashboard">
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
                <Link to="/login" className="Header-login">
                  Login
                </Link>
              )
            )}
          </div>
        </div>
      </nav>
    </Fragment>
  );
};

export default Header;
