import { useEffect, useState, useMemo, useCallback } from 'react'
import StoreInfo from '../components/StoreInfo/StoreInfo'
import Table from '../components/Table/Table'
import SimpleBarChart from '../components/SimpleBarChart/SimpleBarChart'
import Widget from '../components/Widget/Widget'
import { useSalesContext } from '../hooks/useSalesContext'
import { useProductsContext } from '../hooks/useProductsContext'
import { useAuthContext } from '../hooks/useAuthContext'
import { getProducts, getProductsSales, getSales } from '../api/apiFunctions'
import { getStartAndEndOfWeek } from '../constants/categories'
import { lowStockColumns, allSoldProductsColumns, allSalesColumns } from '../constants/columns'
import { Progress, Tooltip } from 'antd'

const MainDashboard = () => {
	const { soldProducts, previousSortedSales, prevSalesSum, currSalesSum, sortedSales, sales } = useSalesContext()
	const { products } = useProductsContext()
	const { user } = useAuthContext()
	const { dispatch, setIsLoading } = useProductsContext()
	const { dispatch: salesDispatch } = useSalesContext()

	const { currentWeek, previousWeek } = getStartAndEndOfWeek()
	// GET all products
	useEffect(() => {
		if (user) {
			getProducts(dispatch, setIsLoading)
			getSales(salesDispatch, {
				start: currentWeek.start,
				end: currentWeek.end,
			})
			getProductsSales(salesDispatch, {
				start: currentWeek.start,
				end: currentWeek.end,
			})
			getProductsSales(
				salesDispatch,
				{
					start: previousWeek.start,
					end: previousWeek.end,
				},
				true
			)
		}
	}, [dispatch, salesDispatch])

	const productsSort = useMemo(() => {
		return products.sort((a, b) => a.quantity - b.quantity).filter(product => product.quantity < 5)
	}, [products])

	return (
		<>
			<Widget color='green'>
				<StoreInfo />
			</Widget>

			<Widget text='Products in low' low_data color='red' mini>
				<Table data={productsSort} columns={lowStockColumns} size='small' pagination />
			</Widget>

			<Widget text='Last sales' low_data mini>
				<Table data={sales && sales} columns={allSalesColumns} size='small' pagination />
			</Widget>

			<Widget text='Sales comparison - Last and this week'>
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
			</Widget>

			<Widget text='Last sold products' mini>
				<SimpleBarChart data={soldProducts && soldProducts.slice(0, 5)} oneBar values={['product_id', 'quantity']} />
			</Widget>

			<Widget text='Week sales history' mini>
				<Table data={soldProducts} columns={allSoldProductsColumns} size='medium' pagination={{ pageSize: 8 }} />
			</Widget>
			{/* // </FlexContainer> */}
		</>
	)
}

export default MainDashboard
