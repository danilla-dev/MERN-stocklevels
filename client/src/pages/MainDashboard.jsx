import { useEffect, useState, useMemo, useCallback } from "react";
import StoreInfo from "../components/StoreInfo/StoreInfo";
import Table from "../components/Table/Table";
import SimpleBarChart from "../components/SimpleBarChart/SimpleBarChart";
import TinyLineChart from "../components/TinyLineChart/TinyLineChart";
import Widget from "../components/Widget/Widget";
import { useSalesContext } from "../hooks/useSalesContext";
import { useProductsContext } from "../hooks/useProductsContext";
import { useAuthContext } from "../hooks/useAuthContext";
import { getProducts, getProductsSales, getSales } from "../api/apiFunctions";
import { getStartAndEndOfWeek } from "../constants/categories";
import {
  lowStockColumns,
  allSoldProductsColumns,
  allSalesColumns,
} from "../constants/columns";

import dayjs from "dayjs";

const MainDashboard = () => {
  const { soldProducts, sales, aggregatedSalesByProductAndDay } =
    useSalesContext();
  const { products } = useProductsContext();
  const { user } = useAuthContext();
  const { dispatch, setIsLoading } = useProductsContext();
  const { dispatch: salesDispatch } = useSalesContext();
  const { currentWeek, previousWeek } = getStartAndEndOfWeek();

  const [date, setDate] = useState({
    startDate: dayjs().subtract(7, "days").startOf("day"),
    endDate: dayjs(),
  });

  // GET all products
  console.log(sales);
  useEffect(() => {
    if (user) {
      getProducts(dispatch, setIsLoading);
      getSales(salesDispatch, {
        start: date.startDate.format("YYYY-MM-DD"),
        end: date.endDate.format("YYYY-MM-DD"),
      });
      getProductsSales(salesDispatch, {
        start: date.startDate.format("YYYY-MM-DD"),
        end: date.endDate.format("YYYY-MM-DD"),
      });
      getProductsSales(
        salesDispatch,
        {
          start: previousWeek.start,
          end: previousWeek.end,
        },
        true
      );
    }
  }, [dispatch, salesDispatch]);

  const lowProductsSort = useMemo(() => {
    return products
      .sort((a, b) => a.quantity - b.quantity)
      .filter((product) => product.quantity < 5);
  }, [products]);

  return (
    <>
      <Widget color="green">
        <StoreInfo />
      </Widget>
      <Widget
        small={aggregatedSalesByProductAndDay.length < 3}
        text="Sales of products day by day"
      >
        <div className="line-charts-container">
          {aggregatedSalesByProductAndDay.map((product, index) => {
            if (product.sales.length > 1) {
              return (
                <div className="chart-box form-box" key={index}>
                  <p className="chart-box-header">ID: {product.product_id}</p>
                  <TinyLineChart
                    data={product.sales}
                    dataKey="quantity"
                    value="date"
                    X={false}
                  />
                </div>
              );
            }
          })}
        </div>
      </Widget>
      {lowProductsSort.length > 0 ? (
        <Widget text="Products in low" low_data color="red" small>
          <Table
            data={lowProductsSort}
            columns={lowStockColumns}
            size="small"
            pagination
          />
        </Widget>
      ) : null}

      <Widget text="Last sales" low_data small>
        <Table
          data={sales && sales}
          columns={allSalesColumns}
          size="small"
          pagination
        />
      </Widget>

      <Widget text="Last sold products" small>
        <SimpleBarChart
          data={soldProducts && soldProducts.slice(0, 5)}
          oneBar
          values={["product_id", "quantity"]}
        />
      </Widget>

      {/* <Widget text='Sales comparison - Last and this week'>
				<div className='container'>
					<Tooltip title='Green - this week, blue - last week'>
						<Progress
							type='dashboard'
							percent={100}
							success={{ percent: (currSalesSum / prevSalesSum) * 100 }}
							format={() => `${parseFloat((currSalesSum / prevSalesSum) * 100).toFixed(1)}%`}
						></Progress>
						<h4>All</h4>
					</Tooltip>
					{previousSortedSales &&
						previousSortedSales.map((sale, index) => {
							const storeIndex = sortedSales.findIndex(store => store.name === sale.name)
							return (
								<Tooltip key={index} title='Green - this week, blue - Last week'>
									<Progress
										type='dashboard'
										percent={100}
										success={{
											percent: (sortedSales[storeIndex].sales / sale.sales) * 100,
										}}
										format={() => `${parseFloat((sortedSales[storeIndex].sales / sale.sales) * 100).toFixed(1)}%`}
									></Progress>
									<h4>{sale.name}</h4>
								</Tooltip>
							)
						})}
				</div>
			</Widget> */}
      <Widget text="Week sales history" small>
        <Table
          data={soldProducts}
          columns={allSoldProductsColumns}
          size="medium"
          pagination={{ pageSize: 8 }}
        />
      </Widget>

      {/* // </FlexContainer> */}
    </>
  );
};

export default MainDashboard;
