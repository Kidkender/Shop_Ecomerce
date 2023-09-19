import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import spinnerImg from "~/assets/images/Spinner-1s-200px.gif";
import styles from "./Product.module.scss";

import { FaCogs } from "react-icons/fa";
import useFetchCollection from "~/Hooks/useFetchCollection";
import {
  GET_PRICE_RANGE,
  STORE_PRODUCTS,
  selectProducts,
} from "~/redux/slice/productSlice";

import { ProductFilter, ProductList } from "~/components/product";

const cx = classNames.bind(styles);

const Product = () => {
  const { data, isLoading } = useFetchCollection("products");
  const [showFilter, setShowFilter] = useState(false);
  const products = useSelector(selectProducts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      STORE_PRODUCTS({
        products: data,
      })
    );

    dispatch(
      GET_PRICE_RANGE({
        products: data,
      })
    );
  }, [dispatch, data]);

  const toggleFilter = () => {
    setShowFilter(!showFilter);
  };

  return (
    <section>
      <div className={`container ${cx("product")}`}>
        <aside
          className={
            showFilter ? `${cx("filter")} ${cx("show")}` : `${cx("filter")}`
          }
        >
          {isLoading ? null : <ProductFilter />}
        </aside>
        <div className={cx("content")}>
          {isLoading ? (
            <img
              src={spinnerImg}
              alt="Loading.."
              style={{ width: "50px" }}
              className="--center-all"
            />
          ) : (
            <ProductList products={products} />
          )}
          <div className={cx("icon")} onClick={toggleFilter}>
            <FaCogs size={20} color="orangered" />
            <p>
              <b>{showFilter ? "Hide Filter" : "Show Filter"}</b>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Product;
