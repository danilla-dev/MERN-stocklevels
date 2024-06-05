import FilterProductsWindow from "../components/FilterProductsWindow/FilterProductsWindow";
import Widget from "../components/Widget/Widget";
import ProductsList from "../components/ProductsList/ProductsList";
const StockLayout = () => {
  return (
    <>
      <FilterProductsWindow />
      <Widget text="Stock">
        <ProductsList />
      </Widget>
    </>
  );
};

export default StockLayout;
