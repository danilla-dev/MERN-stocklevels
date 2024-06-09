import { createContext, useReducer, useState, memo, useMemo } from 'react'
import {
	sortSalesByStores,
	sortSalesByProducts,
	sumSales,
	createAggregatedSales,
	createAggregatedSalesByInterval,
	aggregateSalesByProductsAndDays,
} from '../utils/sales'

export const SalesContext = createContext()

export const SalesReducer = (state, action) => {
	const { type, payload } = action
	switch (type) {
		case 'SET_SALES':
			return {
				...state,
				sales: [...payload.sales],
			}
		case 'SET_PREVIOUS_SALES':
			return {
				...state,
				sale: [...payload.sale],
			}
		//////////////////////////////////
		case 'SET_SOLD_PRODUCTS':
			return {
				...state,
				soldProducts: [...payload.soldProducts],
			}
		case 'PREVIOUS_SOLD_PRODUCTS':
			return {
				...state,
				previousSoldProducts: [...payload.soldProducts],
			}

		//////////////////////////////////
		case 'SET_PREVIEW_SALE':
			return {
				...state,
				soldProduct: [...payload.sale],
			}

		default:
			return state
	}
}
export const SalesContextProvider = memo(({ children }) => {
	const [state, dispatch] = useReducer(SalesReducer, {
		soldProducts: [],
		soldProduct: [],
		previousSoldProducts: [],
		sales: [],
		sale: [],
	})
	const [isLoading, setIsLoading] = useState(true)

	const previousSortedSales = useMemo(() => sortSalesByStores(state.previousSoldProducts), [state.previousSoldProducts])
	// [{key: 'OLX', sales: 380}]
	const sortedSales = useMemo(() => sortSalesByStores(state.soldProducts), [state.soldProducts])
	// [{key: 'OLX', sales: 380}]

	const previousSortedProducts = useMemo(
		() => sortSalesByProducts(state.previousSoldProducts),
		[state.previousSoldProducts]
	)
	// [{ key: '1', sales: 277, product_id: '1' }]

	const sortedProducts = useMemo(() => sortSalesByProducts(state.soldProducts), [state.soldProducts])
	// [{ key: '1', sales: 277, product_id: '1' }]

	const prevSalesSum = sumSales(previousSortedSales)
	// 420

	const currSalesSum = sumSales(sortedSales)
	// 420

	const aggregatedSales = useMemo(() => createAggregatedSales(state.sales), [state.sales])
	//{date: '2024-06-08', sales: 265}

	const aggregatedSalesByHour = useMemo(() => createAggregatedSalesByInterval(state.sales, 4), [state.sales])
	console.log(aggregatedSalesByHour)
	// [
	// 	{ interval: '0:00-0:59', totalSales: 198 },
	// 	{ interval: '1:00-1:59', totalSales: 67 },
	// 	{ interval: '14:00-14:59', totalSales: 511 },
	// 	{ interval: '3:00-3:59', totalSales: 1 }
	// ]

	const aggregatedSalesByProductAndDay = useMemo(
		() => aggregateSalesByProductsAndDays(state.soldProducts),
		[state.soldProducts]
	)
	// [
	// 	({
	// 		product_id: '1',
	// 		sales: [
	// 			{
	// 				date: '2024-06-09',
	// 				quantity: 156,
	// 			},
	// 			{
	// 				date: '2024-06-10',
	// 				quantity: 56,
	// 			},
	// 		],
	// 	},
	// 	{
	// 		product_id: '2',
	// 		sales: [
	// 			{
	// 				date: '2024-06-09',
	// 				quantity: 6,
	// 			},
	// 			{
	// 				date: '2024-06-10',
	// 				quantity: 16,
	// 			},
	// 		],
	// 	})
	// ]
	return (
		<SalesContext.Provider
			value={{
				...state,
				dispatch,
				isLoading,
				setIsLoading,
				sortedSales,
				sortedProducts,
				previousSortedSales,
				prevSalesSum,
				currSalesSum,
				aggregatedSales,
				aggregatedSalesByHour,
				aggregatedSalesByProductAndDay,
			}}
		>
			{children}
		</SalesContext.Provider>
	)
})
