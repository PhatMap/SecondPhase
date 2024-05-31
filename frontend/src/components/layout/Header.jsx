import React, { Fragment, useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaShoppingCart, FaBars } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { logout } from "../../actions/userActions";
import Search from "./Search";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Popper } from "@mui/material";
import { getUserCart } from "../../actions/cartActions";

const Header = () => {
  const location = useLocation();

  const [menu, setMenu] = useState(false);
  const menuRef = useRef(null);
  const handleClick = () => {
    setMenu(true);
  };

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setMenu(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const [anchorE2, setAnchorE2] = React.useState(null);

  const openCart = Boolean(anchorE2);

  const handleCartOpen = (event) => {
    setAnchorE2(event.currentTarget);
  };
  const handleCartClose = () => {
    setAnchorE2(null);
  };

  const dispatch = useDispatch();

  const { user, loading, isGoogleLoggedIn } = useSelector(
    (state) => state.auth
  );
  const { cartItems } = useSelector((state) => state.cart);
  const categories = ["Trousers", "Shirt", "Dress", "Shoe"];

  const logoutHandler = () => {
    toast.error("Logged out successfully");
    dispatch(logout());
  };
  useEffect(() => {
    if (user) {
      dispatch(getUserCart());
    }
  }, [dispatch, user]);

  const [isSticky, setIsSticky] = useState(false);
  const prevScrollY = useRef(0);

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

  return (
    <Fragment>
      <nav className={isSticky ? "Header" : ""}>
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
            <Link
              to="/shop"
              className={
                location.pathname === "/shop"
                  ? "Header-shop-link active"
                  : "Header-shop-link"
              }
            >
              Shop
            </Link>

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
              open={openCart}
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
                  Đăng Nhập
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
