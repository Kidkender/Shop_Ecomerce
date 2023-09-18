import React from "react";
import styles from "./ProductItem.module.scss";
import classnames from "classnames/bind";
import Card from "./../../../components/card/Card";
import { Link } from "react-router-dom";

const cx = classnames.bind(styles);

const ProductItem = () => {
  return (
    <Card cardClass={grid ? `${cx("grid")}` : `${cx("list")}`}>
      <Link to={`/product-details/${id}`}>
        <div className={cx("img")}>
          <img src={imageURL} alt={name} />
        </div>
      </Link>
      <div className={cx("content")}>
        <div className={cx("details")}>
          <p>{`$${price}`}</p>
          <h4>{shortenText(name, 18)}</h4>
        </div>
        {!grid && <p className={cx("desc")}>{shortenText(desc, 200)}</p>}

        <button
          className="--btn --btn-danger"
          onClick={() => addToCart(product)}
        >
          Add To Cart
        </button>
      </div>
    </Card>
  );
};

export default ProductItem;
