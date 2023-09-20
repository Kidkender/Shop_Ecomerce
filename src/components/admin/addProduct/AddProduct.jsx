import React from "react";
import classNames from "classnames/bind";
import styles from "./AddProduct.module.scss";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectProducts } from "~/redux/slice/productSlice";

const cx = classNames.bind(styles);

const categories = [
  { id: 1, name: "Men's Clothing" },
  { id: 2, name: "Women's Clothing" },
  { id: 3, name: "Footwear" },
  { id: 4, name: "Accessories" },
  { id: 5, name: "Jewelry" },
  { id: 6, name: "Bags and Purses" },
  { id: 7, name: "Outerwear" },
];

const initialState = {
  name: "",
  imageURL: "",
  price: 0,
  category: "",
  brand: "",
  desc: "",
};

const AddProduct = () => {
  const { id } = useParams();
  const products = useSelector(selectProducts);
  const productEdit = products.find((item) => item.id === id);

  const [product, setProduct] = useState(() => {
    const newState = detecForm(id, { ...initialState }, productEdit);
    return newState;
  });
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isLoading, setisLoading] = useState(false);
  const navigate = useNavigate();

  function detecForm(id, f1, f2) {
    if (id === "ADD") {
      return f1;
    }
    return f2;
  }

  return <div></div>;
};

export default AddProduct;
