import { useEffect, useState, useContext, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import NewProductForm from "../NewProductForm/NewProductForm";
import SaleForm from "../SaleForm/SaleForm";
import styles from "./ProductsList.module.scss";
import Table from "../Table/Table";
import Product from "../Product/Product";
import { useProductsContext } from "../../hooks/useProductsContext";
import { Spin } from "antd";
import { RiAddBoxFill, RiMoneyDollarBoxFill } from "react-icons/ri";
import { DrawerContext } from "../../contexts/DrawerContext";
import { GoAlertFill } from "react-icons/go";

const ProductsList = () => {
  const { products, isLoading } = useProductsContext();
  const { isOpen, toggleOpen, setDrawerSize } = useContext(DrawerContext);
  const [EANCode, setEANCode] = useState("");

  const navigate = useNavigate();

  const bufferRef = useRef("");

  const togglePopup = (e, size, context) => {
    e.preventDefault();
    setDrawerSize(size);
    toggleOpen(context);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      bufferRef = "";
    }, 20);

    return () => clearTimeout(timer);
  }, [bufferRef]);

  const scannedProduct = (EAN) => {
    products.filter((product) => product.EAN === Number(EAN));
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      setEANCode(bufferRef.current);
      const scannedProduct = products.filter(
        (product) => product.EAN === Number(bufferRef.current)
      )[0];
      navigate(`/auth/stock/product/details/${scannedProduct.product_id}`);
      togglePopup(e, "lg", <Product />);
      bufferRef.current = "";
    } else {
      bufferRef.current += e.key;
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const columns = [
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (text, record) => (
        <img
          className="img img-table"
          src={record.image}
          alt="image of product"
        />
      ),
      width: 50,
    },
    {
      title: "Product",
      dataIndex: "name",
      key: "name",
      render: (text, record) => (
        <span
          onClick={(e) => togglePopup(e, "lg", <Product />)}
          className="name-product-cell"
        >
          <Link to={`/auth/stock/product/details/${record.product_id}`}>
            {record.quantity < 5 && <GoAlertFill />}
            {record.name}{" "}
          </Link>
        </span>
      ),
    },
    {
      title: "Product ID",
      dataIndex: "product_id",
      key: "product_id",
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Stock level",
      dataIndex: "quantity",
      key: "quantity",
      render: (text, record) => (
        <span className="span-color">{record.quantity}</span>
      ),
      sorter: (a, b) => a.quantity - b.quantity,
      width: 100,
    },
  ];

  return (
    <div className={`${styles.products_list_container}`} tabIndex={0}>
      {isLoading ? (
        <div className="spin">
          <Spin className="spin" size="large"></Spin>
        </div>
      ) : (
        <>
          <div className="buttons-container">
            <button
              className="btn icon-btn "
              onClick={(e) => {
                togglePopup(e, "sm", <NewProductForm />);
                navigate("product/add");
              }}
            >
              <RiAddBoxFill />
            </button>
            <button
              className="btn icon-btn "
              onClick={(e) => {
                togglePopup(e, "sm", <SaleForm />);
                navigate("product/sell");
              }}
            >
              <RiMoneyDollarBoxFill />
            </button>
          </div>
          {products.length > 0 ? (
            <Table
              columns={columns}
              data={products}
              size={"small"}
              pagination
              buttons
            />
          ) : (
            <p>No products in store yet.</p>
          )}
        </>
      )}
    </div>
  );
};

export default ProductsList;
