import { Routes } from "react-router-dom";
import styles from "./Admin.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

const Admin = () => {
  return;
  <div className={cx("admin")}>
    <div className={cx("Navbar")}>
      <Navbar />
    </div>

    <div className={cx("content")}>
      <Routes>
        <Route path="home" />
      </Routes>
    </div>
  </div>;
};

export default Admin;
