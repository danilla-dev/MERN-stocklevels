import { createContext, useReducer, useState, memo, useMemo } from 'react'

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

	const sortSalesByStores = useMemo(() => {
		return sales => {
			if (sales) {
				const salesByStores = sales.reduce((acc, sale) => {
					acc[sale.store] = (acc[sale.store] || 0) + sale.quantity
					return acc
				}, {})
				const sortedSales = Object.entries(salesByStores)
					.sort(([, store1], [, store2]) => store2 - store1)
					.map(([name, sales]) => ({ name, sales }))
				return sortedSales
			}
			return null
		}
	}, [])

	const sortSalesByProducts = useMemo(() => {
		return sales => {
			if (sales) {
				const salesByProduct = sales.reduce((acc, sale) => {
					acc[sale.product_id] = (acc[sale.product_id] || 0) + sale.quantity
					return acc
				}, {})
				const sortedProducts = Object.entries(salesByProduct)
					.sort(([, sales1], [, sales2]) => sales2 - sales1)
					.map(([product_id, sales]) => ({ product_id, sales }))
				return sortedProducts
			}
			return null
		}
	}, [])

	const sumSales = sales => {
		let sum = 0
		if (sales) {
			sales.forEach(sale => {
				sum += sale.sales
			})
		}
		return sum
	}

	const previousSortedSales = sortSalesByStores(state.previousSoldProducts)
	const sortedSales = sortSalesByStores(state.soldProducts)

	const previousSortedProducts = sortSalesByProducts(state.previousSoldProducts)
	const sortedProducts = sortSalesByProducts(state.soldProducts)

	const prevSalesSum = sumSales(previousSortedSales)
	const currSalesSum = sumSales(sortedSales)

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
			}}
		>
			{children}
		</SalesContext.Provider>
	)
})
