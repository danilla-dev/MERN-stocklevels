import React, { useContext, useEffect, useState } from "react";
import styles from "./SaleForm.module.scss";
import FormRow from "../FormRow/FormRow";
import FormSelect from "../FormSelect/FormSelect";
import { useStoreContext } from "../../hooks/useStoreContext";
import { useProductsContext } from "../../hooks/useProductsContext";
import { useSalesContext } from "../../hooks/useSalesContext";
import { getSalesOfProduct, postSale } from "../../api/apiFunctions";
import { AlertContext } from "../../contexts/AlertContext";

const SaleForm = ({ id, ean }) => {
  const [formData, setFormData] = useState({
    product_id: id || "",
    EAN: ean || "",
    quantity: "",
    store: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const { storeData } = useStoreContext();
  const { products, dispatch } = useProductsContext();
  const { dispatch: salesDispatch } = useSalesContext();
  const { setAlertData } = useContext(AlertContext);

  const setEAN = () => {
    const product = products.filter((product) => {
      return product.product_id === formData.product_id;
    });
    const productEAN = product[0] && product[0].EAN;
    setFormData((prevState) => ({
      ...prevState,
      EAN: productEAN ? productEAN : "",
    }));
  };

  const handleSaleProduct = async (e) => {
    e.preventDefault();
    await postSale(
      dispatch,
      salesDispatch,
      formData,
      setAlertData,
      setErrorMessage
    );
    await getSalesOfProduct(salesDispatch, id);
  };

  useEffect(() => {
    setEAN();
  }, [formData.product_id, products]);

  const { product_id, store, quantity, EAN } = formData;
  return (
    <form
      onSubmit={handleSaleProduct}
      className={`${styles.sale_form} form form-drawer`}
    >
      <h2 className="header">{`Sell ${id ? id : "product"}`} </h2>
      <FormRow
        name="product_id"
        type="text"
        required
        labelText="Product id*"
        setFormData={setFormData}
        list={!id && "products_id-suggestions"}
        value={id && id}
        row
        disable={id}
      />
      <FormRow
        name="EAN"
        type="number"
        labelText="EAN"
        setFormData={setFormData}
        value={!ean ? formData.EAN : ean}
        row
        disable={ean}
      />
      <FormRow
        name="quantity"
        type="number"
        required
        labelText="Quantity*"
        setFormData={setFormData}
        value={quantity}
        row
      />
      <FormSelect
        name="store"
        type="text"
        data={storeData && storeData.stores}
        required
        labelText="Store"
        setFormData={setFormData}
        value={store}
        row
      />
      <datalist id="products_id-suggestions">
        {products.map((product) => {
          return (
            <option value={product.product_id}>{product.product_id}</option>
          );
        })}
      </datalist>
      {errorMessage && (
        <div className="form-error sm">
          <span>{errorMessage}</span>
        </div>
      )}
      <button type="submit" className="btn submit-btn">
        Sell
      </button>
    </form>
  );
};

export default SaleForm;
