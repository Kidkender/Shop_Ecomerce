import classNames from "classnames/bind";
import { deleteDoc, doc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import Notiflix from "notiflix";
import { useEffect, useState } from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useFetchCollection } from "~/Hooks";
import { Loader, Search } from "~/components";

import { Pagination } from "~/components/product";
import { db, storage } from "~/firebase/config";
import {
  FILTER_BY_SEARCH,
  selectFilteredProducts,
} from "~/redux/slice/filterSlice";
import { STORE_PRODUCTS, selectProducts } from "~/redux/slice/productSlice";
import styles from "./ViewProducts.module.scss";
import { BiExport } from "react-icons/bi";
import { AiOutlineFileWord } from "react-icons/ai";
import { CSVLink } from "react-csv";

const cx = classNames.bind(styles);

const ViewProducts = () => {
  const [search, setSearch] = useState("");
  const filteredProducts = useSelector(selectFilteredProducts);
  const { data, isLoading } = useFetchCollection("products");
  const products = useSelector(selectProducts);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage, setproductsPerPage] = useState(10);
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      STORE_PRODUCTS({
        products: data,
      })
    );
  }, [dispatch, data]);
  useEffect(() => {
    dispatch(FILTER_BY_SEARCH({ products, search }));
  }, [dispatch, products, search]);
  const confirmDelete = (id, imageUrl) => {
    Notiflix.Confirm.show(
      "Delete produc !!!",
      "You are about to delete this product",
      "Delete",
      "Cancel",
      function actionOK() {
        deleteProduct(id, imageUrl);
      },
      function actionCancel() {
        Notiflix.Notify.info("Cancel action delete product");
      },
      {
        width: "320px",
        borderRadius: "3px",
        titleColor: "orangered",
        okButtonBackground: "orangered",
        cssAnimationStyle: "zoom",
      }
    );
  };

  const deleteProduct = async (id, imageUrl) => {
    try {
      await deleteDoc(doc(db, "products", id));
      const storageRef = ref(storage, imageUrl);
      await deleteObject(storageRef);
      toast.success("Product deleted successfully.");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <>
      {isLoading && <Loader />}
      <div className={cx("table")}>
        <h2>All products</h2>
        <div className={cx("search")}>
          <p>
            <b>{filteredProducts.length}</b> products found
          </p>
          <Search value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <div className={cx("export")}>
          <p>Export Product</p>
          <CSVLink data={products}>
            <BiExport className={cx("icon-export")} />
          </CSVLink>
          <AiOutlineFileWord className={cx("icon-export")} />
        </div>
        {filteredProducts.length === 0 ? (
          <p>No product found.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>s/n</th>
                <th>Image</th>
                <th>Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentProducts.map((product, index) => {
                const { id, name, price, imageUrl, category } = product;
                return (
                  <tr key={id}>
                    <td>{index + 1}</td>
                    <td>
                      <img
                        src={imageUrl}
                        alt={name}
                        style={{ width: "100px" }}
                      />
                    </td>
                    <td>{name}</td>
                    <td>{category}</td>
                    <td>{`$${price}`}</td>
                    <td className={cx("icons")}>
                      <Link to={`/admin/add-product/${id}`}>
                        <FaEdit size={20} color="green" />
                        &nbsp;
                        <FaTrashAlt
                          size={18}
                          color="red"
                          onClick={() => confirmDelete(id, imageUrl)}
                        />
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
        <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          productsPerPage={productsPerPage}
          totalProducts={filteredProducts.length}
        />
      </div>
    </>
  );
};
export default ViewProducts;
