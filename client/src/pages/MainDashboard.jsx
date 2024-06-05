import { useEffect, useState, useMemo, useCallback } from "react";
import StoreInfo from "../components/StoreInfo/StoreInfo";
import Table from "../components/Table/Table";
import FlexContainer from "../components/FlexContainer/FlexContainer";
import SimpleBarChart from "../components/SimpleBarChart/SimpleBarChart";
import Widget from "../components/Widget/Widget";
import { useSalesContext } from "../hooks/useSalesContext";
import { Link } from "react-router-dom";
import { useProductsContext } from "../hooks/useProductsContext";
import { useAuthContext } from "../hooks/useAuthContext";
import { getProducts, getSales } from "../api/apiFunctions";
import { getStartAndEndOfWeek } from "../constants/categories";
import dayjs from "dayjs";
import { Progress, Tooltip } from "antd";
import axios from "../api/axiosConfig";

const columns = [
  {
    title: "Product",
    dataIndex: "name",
    key: "name",
    // render: (text, record) => <Link to={`/product/${record.id}`}>{record.name}</Link>,
  },
  {
    title: "ID",
    dataIndex: "product_id",
    key: "product_id",
    // render: (text, record) => <Link to={`/product/${record.id}`}>{record.name}</Link>,
  },
  {
    title: "Stock level",
    dataIndex: "quantity",
    key: "quantity",
  },
];

const columnsAllSales = [
  {
    title: "Product",
    dataIndex: "product_id",
    key: "product_id",
    // render: (text, record) => <Link to={`/product/${record.id}`}>{record.product_id}</Link>,
  },
  {
    title: "Quantity",
    dataIndex: "quantity",
    key: "quantity",
  },
  {
    title: "Date",
    dataIndex: "createdAt",
    key: "createdAt",
    render: (text, record) => {
      const date = new Date(record.createdAt);
      const formattedDate = `${date.getDate()}/${
        date.getMonth() + 1
      }/${date.getFullYear()}`;
      return <p>{formattedDate}</p>;
    },
  },
];
const MainDashboard = () => {
  const {
    sales,
    previousSortedSales,
    prevSalesSum,
    currSalesSum,
    sortedSales,
  } = useSalesContext();
  const { products } = useProductsContext();
  const { user } = useAuthContext();
  const { dispatch, setIsLoading } = useProductsContext();
  const { dispatch: salesDispatch } = useSalesContext();

  const { currentWeek, previousWeek } = getStartAndEndOfWeek();

  // GET all products
  useEffect(() => {
    if (user) {
      getProducts(dispatch, setIsLoading);
      getSales(salesDispatch, {
        start: currentWeek.start,
        end: currentWeek.end,
      });
      getSales(
        salesDispatch,
        {
          start: previousWeek.start,
          end: previousWeek.end,
        },
        true
      );
    }
  }, [dispatch, salesDispatch]);

  const productsSort = useMemo(() => {
    return products
      .sort((a, b) => a.quantity - b.quantity)
      .filter((product) => product.quantity < 5);
  }, [products]);

  return (
    // <FlexContainer column={false}>
    <>
      <Widget color="green">
        <StoreInfo />
      </Widget>

      <Widget text="Products in low" low_data color="red">
        <Table data={productsSort} columns={columns} size="small" pagination />
      </Widget>

      <Widget text="Sales comparison - Last and this week">
        <div className="container">
          <Tooltip title="Green - this week, blue - last week">
            <Progress
              type="dashboard"
              percent={100}
              success={{ percent: (currSalesSum / prevSalesSum) * 100 }}
              format={() =>
                `${parseFloat((currSalesSum / prevSalesSum) * 100).toFixed(1)}%`
              }
            ></Progress>
            <h4>All</h4>
          </Tooltip>
          {previousSortedSales &&
            previousSortedSales.map((sale, index) => {
              const storeIndex = sortedSales.findIndex(
                (store) => store.name === sale.name
              );
              return (
                <Tooltip
                  key={index}
                  title="Green - this week, blue - Last week"
                >
                  <Progress
                    type="dashboard"
                    percent={100}
                    success={{
                      percent:
                        (sortedSales[storeIndex].sales / sale.sales) * 100,
                    }}
                    format={() =>
                      `${parseFloat(
                        (sortedSales[storeIndex].sales / sale.sales) * 100
                      ).toFixed(1)}%`
                    }
                  ></Progress>
                  <h4>{sale.name}</h4>
                </Tooltip>
              );
            })}
        </div>
      </Widget>

      <Widget text="Last sales" mini>
        <SimpleBarChart
          data={sales && sales.slice(0, 5)}
          oneBar
          values={["product_id", "quantity"]}
        />
      </Widget>

      <Widget text="Week sales history" mini>
        <Table
          data={sales}
          columns={columnsAllSales}
          size="medium"
          pagination={{ pageSize: 8 }}
        />
      </Widget>
      {/* // </FlexContainer> */}
    </>
  );
};

export default MainDashboard;
