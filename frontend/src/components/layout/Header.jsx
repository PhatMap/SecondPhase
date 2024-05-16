import React, { Fragment, useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaShoppingCart, FaBars } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { logout } from "../../actions/userActions";
import Search from "./Search";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Popper } from "@mui/material";
import { getUserCart } from "../../actions/cartActions";

const Header = () => {
  const location = useLocation();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
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
  const categories = ["Trousers", "Shirt", "Dress", "Shoe", "Belt"];

  const logoutHandler = () => {
    toast.error("Logged out successfully", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
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

  useEffect(() => {
    const header = document.querySelector("h1");

    if (header) {
      header.addEventListener("mouseover", (event) => {
        let iterations = 0;
        const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

        const interval = setInterval(() => {
          event.target.innerText = event.target.innerText
            .split("")
            .map((letter, index) => {
              if (index < iterations) {
                return event.target.dataset.value[index];
              }
              return letters[Math.floor(Math.random() * 26)];
            })
            .join("");

          if (iterations >= event.target.dataset.value.length) {
            clearInterval(interval);
          }

          iterations += 1 / 3;
        }, 30);

        return () => {
          header.removeEventListener("mouseover", () => {});
          clearInterval(interval);
        };
      });
    }
  }, []);

  return (
    <Fragment>
      <ToastContainer />
      <nav className={isSticky ? "Header" : ""}>
        <div className="Header-container">
          <div className="Header-container-right">
            <Link to="/" style={{ textDecoration: "none" }}>
              <h1 className="font-bold text-5xl" style={{fontFamily:"Lobster, cursive"}} data-value="VITASHOP">
                VITASHOP
              </h1>
            </Link>
          </div>
          <div className="Header-container-center">
            <Search />
          </div>
          <div className="Header-container-left">
            <div className="Header-category">
              <i
                className="fa fa-bars burger-menu"
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onMouseEnter={handleClick}
              ></i>
              <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
              >
                {categories.map((cate, index) => (
                  <MenuItem key={index} className="Header-menu-item">
                    <Link
                      style={{ textDecoration: "none", color: "black" }}
                      to={`/category/${cate}`}
                      onClick={() => {
                        setAnchorEl(false);
                      }}
                    >
                      {cate}
                    </Link>
                  </MenuItem>
                ))}
              </Menu>
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
                        <p>Màu:</p>
                        <p>{item.color.colorName}</p>
                        <div
                          style={{
                            backgroundColor:
                              item.color.colorHex ?? "transparent",
                            width: "10px",
                            height: "10px",
                            borderRadius: "50%",
                          }}
                        ></div>
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
                      Dashboard
                    </Link>
                  )}
                  <Link className="dropdown-item" to="/orders/me">
                    Orders
                  </Link>
                  <Link className="dropdown-item" to="/me">
                    Profile
                  </Link>

                  <Link
                    className="dropdown-item text-danger"
                    to="/"
                    onClick={logoutHandler}
                  >
                    Logout
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
