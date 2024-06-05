import { useEffect, useState, useContext } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import styles from "./FilterProductsWindow.module.scss";
import FormRow from "../FormRow/FormRow";
import SubmitButton from "../SubmitButton/SubmitButton";
import FormSelect from "../FormSelect/FormSelect";
import NewProductForm from "../NewProductForm/NewProductForm";
import { useProductsContext } from "../../hooks/useProductsContext";
import { useStoreContext } from "../../hooks/useStoreContext";
import { useDrawerContext } from "../../hooks/useDrawerContext";
import { getFilterProducts } from "../../api/apiFunctions";
import { categoriesWithSubcategories } from "../../constants/categories";
import SaleForm from "../SaleForm/SaleForm";

const FilterProductsWindow = () => {
  const { products, isLoading, dispatch, setIsLoading } = useProductsContext();
  const { toggleOpen, setDrawerSize } = useDrawerContext();
  const { storeData } = useStoreContext();

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    product_id: "",
    name: "",
    category: "",
  });

  const togglePopup = (e, size, context) => {
    e.preventDefault();
    setDrawerSize(size);
    toggleOpen(context);
  };

  const handleFilterProducts = (e) => {
    e.preventDefault();
    getFilterProducts(dispatch, setIsLoading, formData);
  };
  const subCategories = categoriesWithSubcategories.find(
    (category) => category.category === storeData.category
  ).subcategories;

  return (
    <div className={`${styles.filter_products_window} glass`}>
      <form className="form" onSubmit={handleFilterProducts}>
        <FormRow
          type="text"
          name="product_id"
          row
          labelText="ID"
          value={formData.product_id}
          setFormData={setFormData}
        />
        <FormRow
          type="text"
          name="name"
          row
          labelText="Name"
          value={formData.name}
          setFormData={setFormData}
        />
        <FormSelect
          data={subCategories}
          name="category"
          labelText="Category"
          row
          setFormData={setFormData}
        />

        <div className={styles.buttons_container}>
          <SubmitButton />
          <button
            className="btn"
            onClick={(e) => {
              togglePopup(e, "sm", <NewProductForm />);
              navigate("/dashboard/stock/product/add");
            }}
          >
            Add new
          </button>
          <button
            className="btn"
            onClick={(e) => {
              togglePopup(e, "sm", <SaleForm />);
              navigate("/dashboard/stock/product/sell");
            }}
          >
            Sell product
          </button>
        </div>
      </form>
    </div>
  );
};

export default FilterProductsWindow;
