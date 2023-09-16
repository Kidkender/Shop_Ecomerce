import { Link, NavLink } from "react-router-dom";
import styles from "./Header.module.scss";
import classNames from "classnames/bind";
import { FaShoppingCart, FaTimes } from "react-icons/fa";
import { HiOutlineMenu } from "react-icons/hi";
import { useState } from "react";

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
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const hideMenu = () => {
    setShowMenu(false);
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
              <NavLink className={activeLink} to="/order-history">
                My Orders
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
