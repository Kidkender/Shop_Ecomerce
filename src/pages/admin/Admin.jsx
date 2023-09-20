import { Route, Routes } from "react-router-dom";
import styles from "./Admin.module.scss";
import classNames from "classnames/bind";
import {
  AddProduct,
  Home,
  NavBar,
  Order,
  OrderDetails,
  ViewProducts,
} from "~/components/admin";

const cx = classNames.bind(styles);

const Admin = () => {
  return (
    <>
      <h1>Hello</h1>
      <div className={cx("admin")}>
        <div className={cx("Navbar")}>
          <NavBar />
        </div>
        <div className={cx("content")}>
          <Routes>
            <Route path="home" element={<Home />} />
            <Route path="all-products" element={<ViewProducts />} />
            <Route path="add-products/:id" element={<AddProduct />} />
            <Route path="orders" element={<Order />} />
            <Route path="order-details/:id" element={<OrderDetails />} />
          </Routes>
        </div>
      </div>
    </>
  );
};

export default Admin;
