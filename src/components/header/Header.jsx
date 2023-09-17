import classNames from "classnames/bind";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import { FaShoppingCart, FaTimes, FaUserCircle } from "react-icons/fa";
import { HiOutlineMenu } from "react-icons/hi";
import { useDispatch } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { auth } from "~/firebase/config";
import styles from "./Header.module.scss";

const cx = classNames.bind(styles);
const logo = (
  <div className={cx("logo")}>
    <Link to="/">
      <h2>
        e<span>Shop</span>
      </h2>
    </Link>
  </div>
);

const cart = (
  <span className={cx("cart")}>
    <Link to="/cart">
      Cart
      <FaShoppingCart size={20} />
      <p>0</p>
    </Link>
  </span>
);

const activeLink = ({ isActive }) => (isActive ? cx("active") : "");
const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showMenu, setShowMenu] = useState(false);
  const [name, setName] = useState("");

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        console.log(user.displayName);
        setName(user.displayName);
      } else {
        setName("");
      }
    });
  });

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const hideMenu = () => {
    setShowMenu(false);
  };

  const logoutUser = () => {
    signOut(auth)
      .then(() => {
        toast.success("Logout successfully...");

        navigate("/");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    <header>
      <div className={cx("header")}>
        {logo}

        <nav className={showMenu ? cx("show-nav") : cx("hide-nav")}>
          <div
            className={
              showMenu ? cx("nav-wrapper, show-nav-wrapper") : cx("nav-wrapper")
            }
            onClick={hideMenu}
          ></div>
          <ul onClick={hideMenu}>
            <li className={cx("logo-mobile")}>
              {logo}
              <FaTimes size={22} color="#fff" onClick={hideMenu} />
            </li>
            <li>
              <NavLink to="/" className={activeLink}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/contact" className={activeLink}>
                Contact Us
              </NavLink>
            </li>
          </ul>
          <div className={cx("header-right")} onClick={hideMenu}>
            <span className={cx("links")}>
              <NavLink className={activeLink} to="/login">
                Login
              </NavLink>
              <NavLink className={activeLink} to="/register">
                Register
              </NavLink>
              <a href="#">
                <FaUserCircle size={16} />
                &nbsp; Hi &nbsp; {name}
              </a>
              <NavLink className={activeLink} to="/order-history">
                My Orders
              </NavLink>
              <NavLink to="/" onClick={logoutUser}>
                Logout
              </NavLink>
            </span>
            {cart}
          </div>
        </nav>
        <div className={cx("menu-icon")}>
          {cart}

          <HiOutlineMenu size={28} onClick={toggleMenu} />
        </div>
      </div>
    </header>
  );
};

export default Header;
